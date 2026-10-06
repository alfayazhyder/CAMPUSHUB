package com.campushub.backend.controller;

import com.campushub.backend.entity.ExamTimetable;
import com.campushub.backend.service.ExamTimetableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Manages exam timetable entries per course and batch.
 * Used by: Teaching staff (edit), Student dashboard (view only).
 */
@RestController
@RequestMapping("/api/exam-timetable")
@CrossOrigin(originPatterns = "https://*.vercel.app")
public class ExamTimetableController {

    @Autowired
    private ExamTimetableService examTimetableService;

    @GetMapping
    public List<ExamTimetable> getExamTimetable(
            @RequestParam String course,
            @RequestParam String batch) {
        return examTimetableService.findByCourseAndBatch(course, batch);
    }

    @PostMapping
    public ExamTimetable create(@RequestBody ExamTimetable examTimetable) {
        return examTimetableService.save(examTimetable);
    }

    @PutMapping("/{id}")
    public ExamTimetable update(@PathVariable Long id, @RequestBody ExamTimetable updated) {
        updated.setId(id);
        return examTimetableService.save(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        examTimetableService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}