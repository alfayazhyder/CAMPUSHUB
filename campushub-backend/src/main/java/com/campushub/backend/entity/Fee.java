package com.campushub.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "fees")
public class Fee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentUsername;
    private String studentName;
    private String course;   // "BCA", "BBA", "BCOM"
    private String batch;    // "2025-29", "2026-30"
    private Double amountPaid;
    private String datePaid;
    private String status;   // "PAID" or "PENDING"

    public Fee() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getStudentUsername() { return studentUsername; }
    public void setStudentUsername(String studentUsername) { this.studentUsername = studentUsername; }
    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }
    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }
    public String getBatch() { return batch; }
    public void setBatch(String batch) { this.batch = batch; }
    public Double getAmountPaid() { return amountPaid; }
    public void setAmountPaid(Double amountPaid) { this.amountPaid = amountPaid; }
    public String getDatePaid() { return datePaid; }
    public void setDatePaid(String datePaid) { this.datePaid = datePaid; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}