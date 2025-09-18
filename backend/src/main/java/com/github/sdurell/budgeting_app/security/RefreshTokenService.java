package com.github.sdurell.budgeting_app.security;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.github.sdurell.budgeting_app.model.RefreshToken;
import com.github.sdurell.budgeting_app.model.UserEntity;
import com.github.sdurell.budgeting_app.repository.RefreshTokenRepository;

import jakarta.transaction.Transactional;

@Service
public class RefreshTokenService {
    
    private final RefreshTokenRepository refreshTokenRepository;
    private final SecureRandom secureRandom = new SecureRandom();
    private final PasswordEncoder passwordEncoder;
    private final long refreshTokenDurationMs;
    
    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository, PasswordEncoder passwordEncoder,
            @Value("${security.refresh-token-expiration-ms:" + SecurityConstants.REFRESH_EXPIRATION_DAYS + "}") long refreshTokenDurationMs) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.refreshTokenDurationMs = refreshTokenDurationMs;
    }

    @Transactional
    public String createRefreshToken(UserEntity user){
        byte[] random = new byte[64];
        secureRandom.nextBytes(random);
        String rawToken = Base64.getUrlEncoder().withoutPadding().encodeToString(random);

        String tokenHash = hashWithSHA256(rawToken);
        
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setTokenHash(tokenHash);
        refreshToken.setUser(user);
        refreshToken.setExpireDate(Instant.now().plusMillis(refreshTokenDurationMs));

        refreshTokenRepository.deleteByUser(user); //single token per user
        refreshTokenRepository.save(refreshToken);

        return rawToken;
    }

    public Optional<UserEntity> verifyRefreshToken(String rawToken){
        String tokenHash = hashWithSHA256(rawToken);
        
        return refreshTokenRepository.findByTokenHash(tokenHash)
                .filter(rt -> rt.getExpireDate().isAfter(Instant.now()))
                .map(RefreshToken::getUser);
    }
    
    @Transactional
    public void revokeUserRefreshToken(UserEntity user){
        refreshTokenRepository.deleteByUser(user);
    }

    private String hashWithSHA256(String input){
        try{
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(input.getBytes(StandardCharsets.UTF_8));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(hash);
        } catch (NoSuchAlgorithmException e){
            throw new RuntimeException("SHA-256 not supported", e);
        }
    }
}

