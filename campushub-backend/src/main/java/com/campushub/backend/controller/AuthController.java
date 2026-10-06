package com.campushub.backend.controller;

import com.campushub.backend.entity.User;
import com.campushub.backend.repository.UserRepository;
import com.campushub.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

/**
 * Handles login and all member management (add/edit/delete students and staff).
 * Used by: Login page, Admin dashboard.
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(originPatterns = "https://*.vercel.app")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    // ===== LOGIN =====
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(loginRequest.getPassword())) {
                return ResponseEntity.ok(user);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    // ===== GET ALL MEMBERS (Admin panel) =====
    @GetMapping("/members")
    public ResponseEntity<List<User>> getAllMembers(
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String course,
            @RequestParam(required = false) String batch) {

        if (role != null && course != null && batch != null) {
            return ResponseEntity.ok(userRepository.findByRoleAndCourseAndBatch(role, course, batch));
        }
        if (role != null) {
            return ResponseEntity.ok(userRepository.findByRole(role));
        }
        return ResponseEntity.ok(userRepository.findAll());
    }

    // ===== ADD MEMBER =====
    @PostMapping("/add-member")
    public ResponseEntity<?> addMember(@RequestBody User newUser) {
        if (userRepository.findByUsername(newUser.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists!");
        }
        userRepository.save(newUser);
        return ResponseEntity.ok(newUser);
    }

    // ===== EDIT MEMBER =====
    @PutMapping("/members/{id}")
    public ResponseEntity<?> updateMember(@PathVariable Long id, @RequestBody User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setName(updatedUser.getName());
            user.setUsername(updatedUser.getUsername());
            user.setPassword(updatedUser.getPassword());
            user.setRole(updatedUser.getRole());
            user.setCourse(updatedUser.getCourse());
            user.setBatch(updatedUser.getBatch());
            userRepository.save(user);
            return ResponseEntity.ok(user);
        }).orElse(ResponseEntity.notFound().build());
    }

    // ===== DELETE MEMBER =====
    @DeleteMapping("/members/{id}")
    public ResponseEntity<?> deleteMember(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}