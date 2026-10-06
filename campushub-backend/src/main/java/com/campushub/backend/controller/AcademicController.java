package com.campushub.backend.controller;

import com.campushub.backend.entity.AcademicRecord;
import com.campushub.backend.service.AcademicRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Handles academic data: attendance, internal marks, semester marks.
 * Used by: Teaching Staff dashboard (edit), Student dashboard (view).
 */
@RestController
@RequestMapping("/api/academic")
@CrossOrigin(originPatterns = "https://*.vercel.app")
public class AcademicController {

    @Autowired
    private AcademicRecordService academicRecordService;

    // Teacher/Admin: Get all records for a cohort (course + batch)
    @GetMapping("/cohort")
    public List<AcademicRecord> getCohortRecords(
            @RequestParam String course,
            @RequestParam String batch) {
        return academicRecordService.getByCourseAndBatch(course, batch);
    }

    // Student: Get only their own records
    @GetMapping("/student/{username}")
    public List<AcademicRecord> getStudentRecords(@PathVariable String username) {
        return academicRecordService.getByStudentUsername(username);
    }

    // Teacher: Add or update a record
    @PostMapping("/save")
    public AcademicRecord saveRecord(@RequestBody AcademicRecord record) {
        return academicRecordService.save(record);
    }

    // Teacher: Update existing record by ID
    @PutMapping("/update/{id}")
    public AcademicRecord updateRecord(@PathVariable Long id, @RequestBody AcademicRecord updated) {
        updated.setId(id);
        return academicRecordService.save(updated);
    }

    // Teacher/Admin: Delete a record
    @DeleteMapping("/delete/{id}")
    public String deleteRecord(@PathVariable Long id) {
        academicRecordService.delete(id);
        return "Record deleted successfully.";
    }
}