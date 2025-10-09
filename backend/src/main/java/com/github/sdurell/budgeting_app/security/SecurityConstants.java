package com.github.sdurell.budgeting_app.security;

public class SecurityConstants {
    public static final long JWT_EXPIRATION_MINS = 15 * 60 * 1000;
    public static final long REFRESH_EXPIRATION_DAYS = 2 * 24 * 60 * 60 * 1000; 
    public static final String JWT_SECRET = "fE72x@uQy!eR9gL#4sssshZ6vW8mJ0kN1pT2rY3bU5cI7oXqD9sFvGdHjKlMnOpQrSt";
    public static final String REFRESH_COOKIE_NAME = "refreshToken";
}
