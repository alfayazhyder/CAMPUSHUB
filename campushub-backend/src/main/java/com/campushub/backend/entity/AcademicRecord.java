package com.campushub.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "academic_records")
public class AcademicRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentUsername;
    private String studentName;

    // "BCA", "BBA", "BCOM"
    private String course;

    // "2025-29", "2026-30"
    private String batch;

    private String subject;

    private double attendancePercentage;
    private double firstInternalMark;
    private double secondInternalMark;
    private double semesterMark;
    private double internalMark; // Combined internal assessment, out of 30

    public AcademicRecord() {}

    // Getters and Setters
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

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public double getAttendancePercentage() { return attendancePercentage; }
    public void setAttendancePercentage(double attendancePercentage) { this.attendancePercentage = attendancePercentage; }

    public double getFirstInternalMark() { return firstInternalMark; }
    public void setFirstInternalMark(double firstInternalMark) { this.firstInternalMark = firstInternalMark; }

    public double getSecondInternalMark() { return secondInternalMark; }
    public void setSecondInternalMark(double secondInternalMark) { this.secondInternalMark = secondInternalMark; }

    public double getSemesterMark() { return semesterMark; }
    public void setSemesterMark(double semesterMark) { this.semesterMark = semesterMark; }

    public double getInternalMark() { return internalMark; }
    public void setInternalMark(double internalMark) { this.internalMark = internalMark; }
}
