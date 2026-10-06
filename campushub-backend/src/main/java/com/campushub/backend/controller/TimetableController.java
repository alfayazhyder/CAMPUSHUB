package com.campushub.backend.controller;

import com.campushub.backend.entity.Timetable;
import com.campushub.backend.service.TimetableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Manages the weekly class timetable with fixed time slots.
 * Used by: Teaching staff (edit), Student dashboard (view only).
 * * Fixed slots (non-editable slots are handled in the frontend):
 * 08:30-09:00 Newspaper Reading | 10:00-10:30 Break | 12:30-13:15 Lunch | 15:15-15:30 Break
 * Editable slots stored here: HOUR1..HOUR6
 */
@RestController
@RequestMapping("/api/timetable")
@CrossOrigin(originPatterns = "https://*.vercel.app")
public class TimetableController {

    @Autowired
    private TimetableService timetableService;

    @GetMapping
    public List<Timetable> getTimetable(
            @RequestParam String course,
            @RequestParam String batch) {
        return timetableService.findByCourseAndBatch(course, batch);
    }

    @PostMapping
    public Timetable create(@RequestBody Timetable timetable) {
        return timetableService.save(timetable);
    }

    @PutMapping("/{id}")
    public Timetable update(@PathVariable Long id, @RequestBody Timetable updated) {
        updated.setId(id);
        return timetableService.save(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        timetableService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}