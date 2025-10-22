package com.sdurell.budget.controller;

import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdurell.budget.dto.AuthResponseDto;
import com.sdurell.budget.dto.LoginDto;
import com.sdurell.budget.dto.RegisterDto;
import com.sdurell.budget.model.Role;
import com.sdurell.budget.model.UserEntity;
import com.sdurell.budget.repository.RoleRepository;
import com.sdurell.budget.repository.UserRepository;
import com.sdurell.budget.security.CustomUserDetailsService;
import com.sdurell.budget.security.JwtGenerator;
import com.sdurell.budget.security.RefreshTokenService;
import com.sdurell.budget.security.SecurityConstants;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private JwtGenerator jwtGenerator;
    private RefreshTokenService refreshTokenService;
    
    public AuthController(
        AuthenticationManager authenticationManager,
        UserRepository userRepository,
        RoleRepository roleRepository, 
        PasswordEncoder passwordEncoder,
        JwtGenerator jwtGenerator,
        RefreshTokenService refreshTokenService) {

        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
        this.refreshTokenService = refreshTokenService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        if(userRepository.existsByUsername(registerDto.getUsername())){
            return new ResponseEntity<>("Username is taken.", HttpStatus.BAD_REQUEST);
        }

        UserEntity user = new UserEntity();
        user.setUsername(registerDto.getUsername());
        user.setPassword(passwordEncoder.encode((registerDto.getPassword())));

        Role roles = roleRepository.findByName("USER").get();
        user.setRoles(Collections.singletonList(roles));

        userRepository.save(user);

        return new ResponseEntity<>("User registered success.", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto){
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginDto.getUsername(),
                loginDto.getPassword()
                )
            );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String accessToken = jwtGenerator.generateToken(authentication);

        UserEntity user = userRepository.findByUsername(loginDto.getUsername()).get();
        String refreshTokenRaw = refreshTokenService.createRefreshToken(user);

        // build http only cookie
        ResponseCookie refreshCookie = ResponseCookie.from(SecurityConstants.REFRESH_COOKIE_NAME, refreshTokenRaw)
                .httpOnly(true)
                .secure(false) // true = https
                .path("/api/auth")
                .maxAge(SecurityConstants.REFRESH_EXPIRATION_DAYS / 1000)
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .body(new AuthResponseDto(accessToken));
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponseDto> refreshToken(@CookieValue(name = SecurityConstants.REFRESH_COOKIE_NAME, required = false) String refreshCookie){
        if (refreshCookie == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Optional<UserEntity> user = refreshTokenService.verifyRefreshToken(refreshCookie);
        if (user.isEmpty()) {
            // invalid or expire
            ResponseCookie clearedCookie = ResponseCookie.from(SecurityConstants.REFRESH_COOKIE_NAME, "")
                    .httpOnly(true)
                    .secure(false)
                    .path("/api/auth")
                    .maxAge(0)
                    .build();

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .header(HttpHeaders.SET_COOKIE, clearedCookie.toString())
                    .build();
        }
        
        
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.get().getUsername());

        // create new access token
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails.getUsername(), null, userDetails.getAuthorities());
        String newAccessToken = jwtGenerator.generateToken(authentication);

        // rotate refresh token
        String newRefreshRaw = refreshTokenService.createRefreshToken(user.get());
        ResponseCookie newRefreshCookie = ResponseCookie.from(SecurityConstants.REFRESH_COOKIE_NAME, newRefreshRaw)
                .httpOnly(true)
                .secure(false)
                .path("/api/auth")
                .maxAge(SecurityConstants.REFRESH_EXPIRATION_DAYS / 1000)
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, newRefreshCookie.toString())
            .body(new AuthResponseDto(newAccessToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getName() != null){
            userRepository.findByUsername(auth.getName()).ifPresent(user -> {
                refreshTokenService.revokeUserRefreshToken(user);
            });
        }

        ResponseCookie clearCookie = ResponseCookie.from(SecurityConstants.REFRESH_COOKIE_NAME, "")
                .httpOnly(true)
                .secure(false)
                .path("/api/auth")
                .maxAge(0)
                .build();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, clearCookie.toString()).build();
    }

    @GetMapping("/liveness")
    public ResponseEntity<Void> liveness() {
        return ResponseEntity.ok().build();
    }
    
}
