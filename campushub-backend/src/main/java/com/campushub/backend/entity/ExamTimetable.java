package com.campushub.backend.entity;

import jakarta.persistence.*;

/**
 * Exam schedule entries per course + batch.
 */
@Entity
@Table(name = "exam_timetable")
public class ExamTimetable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String course;    // "BCA", "BBA", "BCOM"
    private String batch;     // "2025-29", "2026-30"
    private String examDate;  // e.g. "2026-04-15"
    private String examTime;  // e.g. "10:00 AM"
    private String subject;
    private String venue;

    public ExamTimetable() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }
    public String getBatch() { return batch; }
    public void setBatch(String batch) { this.batch = batch; }
    public String getExamDate() { return examDate; }
    public void setExamDate(String examDate) { this.examDate = examDate; }
    public String getExamTime() { return examTime; }
    public void setExamTime(String examTime) { this.examTime = examTime; }
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    public String getVenue() { return venue; }
    public void setVenue(String venue) { this.venue = venue; }
}