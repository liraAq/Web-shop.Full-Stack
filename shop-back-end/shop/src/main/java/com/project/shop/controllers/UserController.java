package com.project.shop.controllers;

import com.project.shop.configurations.JwtService;
import com.project.shop.models.User;
import com.project.shop.services.UserService;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;
    private Logger logger = LoggerFactory.getLogger(getClass());
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserController(UserService userService, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }


    @GetMapping("/user")
    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        User currentUser = userService.findByEmail(userDetails.getUsername());
        return ResponseEntity.ok(currentUser);
    }

    @GetMapping("/userid")
    public ResponseEntity<Long> getAuthenticatedUserId(HttpServletRequest request) {
        String token = jwtService.resolveToken(request);

        if (token != null) {
            try {
                String email = jwtService.extractUsername(token);
                System.out.println(email);
                User user = userService.findByEmail(email);
                Long userId = user.getId();
                System.out.println(userId);
                return new ResponseEntity<>(userId, HttpStatus.OK);
            } catch (SignatureException e) {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }



    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.registerUser(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(userService.authenticate(request));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@AuthenticationPrincipal UserDetails userDetails, @RequestBody User updatedUserData) {
        // Assuming you have a method in userService to update the user
        userService.updateUser(userDetails.getUsername(), updatedUserData);
        return ResponseEntity.ok("User profile updated successfully");
    }

    @GetMapping("/username")
    public String getUsernameOfAuthenticated(HttpServletRequest request){
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            String username = userService.getUsername(token);
            if (username != null) {
                return username;
            }
        }
        return "Unauthorized";
    }


    @GetMapping("/user/role")
    public ResponseEntity<?> getUserRole_2(@RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.substring(7);

        String userEmail = userService.getUsername(token);

        String userRole = userService.getUserRole(userEmail);

        if (userRole != null) {
            return ResponseEntity.ok().body(userRole);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User role not found");
        }
    }


}

