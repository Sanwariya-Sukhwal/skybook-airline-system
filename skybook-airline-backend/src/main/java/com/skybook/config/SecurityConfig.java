package com.skybook.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {})
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> auth

                        // Public APIs
                        .requestMatchers("/auth/**")
                        .permitAll()

                        // =========================
                        // FLIGHT APIs (ADMIN ONLY)
                        // =========================

                        .requestMatchers(
                                HttpMethod.POST,
                                "/flights/**"
                        )
                        .hasAuthority("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/flights/**"
                        )
                        .hasAuthority("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/flights/**"
                        )
                        .hasAuthority("ADMIN")

                        // =========================
                        // BOOKING MANAGEMENT (ADMIN)
                        // =========================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/bookings"
                        )
                        .hasAuthority("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/bookings/**"
                        )
                        .hasAuthority("ADMIN")

                        // =========================
                        // PAYMENT MANAGEMENT (ADMIN)
                        // =========================

                        .requestMatchers(
                                "/payments/status/**"
                        )
                        .hasAuthority("ADMIN")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/payments/*"
                        )
                        .hasAuthority("ADMIN")

                        // =========================
                        // USER BOOKINGS
                        // =========================

                        .requestMatchers(
                                "/bookings/user/**"
                        )
                        .hasAnyAuthority(
                                "USER",
                                "ADMIN"
                        )

                        .requestMatchers(
                                HttpMethod.POST,
                                "/bookings"
                        )
                        .hasAnyAuthority(
                                "USER",
                                "ADMIN"
                        )

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/bookings/**"
                        )
                        .hasAnyAuthority(
                                "USER",
                                "ADMIN"
                        )

                        // =========================
                        // USER PAYMENTS
                        // =========================

                        .requestMatchers(
                                HttpMethod.POST,
                                "/payments"
                        )
                        .hasAnyAuthority(
                                "USER",
                                "ADMIN"
                        )

                        .requestMatchers(
                                "/payments/booking/**"
                        )
                        .hasAnyAuthority(
                                "USER",
                                "ADMIN"
                        )

                        // All Remaining APIs
                        .anyRequest()
                        .authenticated()
                )

                .addFilterBefore(
                        jwtFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}