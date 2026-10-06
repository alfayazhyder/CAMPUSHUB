package com.campushub.backend.entity;

import jakarta.persistence.*;

/**
 * Stores the weekly class timetable for a given course and batch.
 * Each row represents one time slot on one day.
 *
 * Fixed daily time slots:
 *   08:30 - 09:00  -> Newspaper Reading (fixed, not editable)
 *   09:00 - 10:00  -> Hour 1
 *   10:00 - 10:30  -> Break (fixed, not editable)
 *   10:30 - 11:30  -> Hour 2
 *   11:30 - 12:30  -> Hour 3
 *   12:30 - 13:15  -> Lunch Break (fixed, not editable)
 *   13:15 - 14:15  -> Hour 4
 *   14:15 - 15:15  -> Hour 5
 *   15:15 - 15:30  -> Break (fixed, not editable)
 *   15:30 - 16:30  -> Hour 6 (Last)
 */
@Entity
@Table(name = "timetable")
public class Timetable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // "BCA", "BBA", "BCOM"
    private String course;

    // "2025-29", "2026-30"
    private String batch;

    // "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    private String day;

    // "HOUR1", "HOUR2", "HOUR3", "HOUR4", "HOUR5", "HOUR6"
    private String slotKey;

    // Label shown in UI, e.g., "09:00 – 10:00"
    private String timeLabel;

    // Subject taught in this slot, e.g., "Programming in C"
    private String subject;

    // Faculty name for this slot
    private String faculty;

    public Timetable() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }

    public String getBatch() { return batch; }
    public void setBatch(String batch) { this.batch = batch; }

    public String getDay() { return day; }
    public void setDay(String day) { this.day = day; }

    public String getSlotKey() { return slotKey; }
    public void setSlotKey(String slotKey) { this.slotKey = slotKey; }

    public String getTimeLabel() { return timeLabel; }
    public void setTimeLabel(String timeLabel) { this.timeLabel = timeLabel; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getFaculty() { return faculty; }
    public void setFaculty(String faculty) { this.faculty = faculty; }
}
