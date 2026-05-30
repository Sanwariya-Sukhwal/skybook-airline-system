package com.skybook.service;

import com.skybook.config.JwtUtil;
import com.skybook.dto.AuthResponse;
import com.skybook.dto.LoginRequest;
import com.skybook.entity.User;
import com.skybook.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;

    // Register User
    public User register(User user) {

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

    // Login User
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(
                        request.getEmail())
                .orElseThrow(() ->
                        new BadCredentialsException(
                                "Invalid Email"));

        boolean matches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!matches) {

            throw new BadCredentialsException(
                    "Invalid Password");
        }

        String token =
                jwtUtil.generateToken(user.getEmail());

        return new AuthResponse(token, user);
    }
}
