package com.project.shop.services;


import com.project.shop.configurations.JwtService;
import com.project.shop.controllers.AuthenticationRequest;
import com.project.shop.controllers.AuthenticationResponse;
import com.project.shop.controllers.RegisterRequest;
import com.project.shop.models.Role;
import com.project.shop.models.User;
import com.project.shop.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@Service
public class UserService {

    @Value("${admin.email}")
    private String adminEmail;

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse registerUser(RegisterRequest request){

        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request){

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()

                )
        );

        var user = userRepository.findByEmail(request.getEmail());
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    @Transactional
    public void updateUser(String userEmail, User updatedUserData) {
        User existingUser = userRepository.findByEmail(userEmail);

        if (existingUser != null) {
            // Update name
            existingUser.setName(updatedUserData.getName());

            // Check if a new password is provided and update it
            if (updatedUserData.getPassword() != null && !updatedUserData.getPassword().isEmpty()) {
                String encodedPassword = passwordEncoder.encode(updatedUserData.getPassword());
                existingUser.setPassword(encodedPassword);
            }

            // Handle the case where the user is not found
            userRepository.save(existingUser);
        } else {
            System.out.println("User not found with email: " + userEmail);
        }
    }


    public String getUsername(String token){
        return jwtService.extractUsername(token);
    }

    public User findByEmail(String email){
        return userRepository.findByEmail(email);
    }


    public String getUserRole(String email) {

        if (email.equals(adminEmail)) {
            return "ADMIN";
        } else {
            return "USER";
        }
    }
}
