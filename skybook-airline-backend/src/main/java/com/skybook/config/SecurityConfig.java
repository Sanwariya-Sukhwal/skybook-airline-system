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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of(
                "http://localhost:5173",
                "https://skybook02.vercel.app"
        ));

        configuration.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
        ));

        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
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

                        // Allow Preflight Requests
                        .requestMatchers(HttpMethod.OPTIONS, "/**")
                        .permitAll()

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

                        // View Flights
                        .requestMatchers(
                                HttpMethod.GET,
                                "/flights/**"
                        )
                        .permitAll()

                        // =========================
                        // PASSENGER APIs
                        // =========================

                        .requestMatchers("/passengers/**")
                        .hasAnyAuthority(
                                "USER",
                                "ADMIN"
                        )

                        // =========================
                        // ADMIN BOOKING APIs
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
                        // USER BOOKING APIs
                        // =========================

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

                        .requestMatchers(
                                "/bookings/flight/**"
                        )
                        .hasAnyAuthority(
                                "USER",
                                "ADMIN"
                        )

                        // =========================
                        // PAYMENT APIs
                        // =========================

                        .requestMatchers(
                                "/payments/status/**"
                        )
                        .hasAuthority("ADMIN")

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