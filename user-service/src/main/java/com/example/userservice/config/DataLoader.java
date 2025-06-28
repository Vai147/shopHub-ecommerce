package com.example.userservice.config;

import com.example.userservice.model.User;
import com.example.userservice.model.UserRole;
import com.example.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataLoader implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Clear existing data
        userRepository.deleteAll();
        
        // Create sample users
        User admin = new User(
            "admin",
            "admin@ecommerce.com",
            passwordEncoder.encode("admin123"),
            "Admin",
            "User"
        );
        admin.setRole(UserRole.ADMIN);
        admin.setPhoneNumber("+1234567890");
        
        User user1 = new User(
            "john_doe",
            "john.doe@email.com",
            passwordEncoder.encode("password123"),
            "John",
            "Doe"
        );
        user1.setPhoneNumber("+1987654321");
        
        User user2 = new User(
            "jane_smith",
            "jane.smith@email.com",
            passwordEncoder.encode("password123"),
            "Jane",
            "Smith"
        );
        user2.setPhoneNumber("+1122334455");
        
        User moderator = new User(
            "moderator",
            "moderator@ecommerce.com",
            passwordEncoder.encode("mod123"),
            "Moderator",
            "User"
        );
        moderator.setRole(UserRole.MODERATOR);
        moderator.setPhoneNumber("+1555666777");
        
        // Save all users
        userRepository.saveAll(Arrays.asList(admin, user1, user2, moderator));
        
        System.out.println("Sample users loaded successfully!");
        System.out.println("Admin credentials: admin / admin123");
        System.out.println("User credentials: john_doe / password123");
    }
} 