package com.campushub.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String username;

    private String password;

    // "ADMIN", "TEACHER", "NON_TEACHER", "STUDENT"
    private String role;

    // For students: "BCA", "BBA", "BCOM"
    private String course;

    // For students: "2025-29", "2026-30"
    private String batch;

    public User() {}

    public User(String name, String username, String password, String role, String course, String batch) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.role = role;
        this.course = course;
        this.batch = batch;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }

    public String getBatch() { return batch; }
    public void setBatch(String batch) { this.batch = batch; }
}
