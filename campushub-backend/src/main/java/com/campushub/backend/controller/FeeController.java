package com.campushub.backend.controller;

import com.campushub.backend.entity.Fee;
import com.campushub.backend.service.FeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Manages fee payment status per student.
 * Used by: Non-teaching staff (edit), Student dashboard (view only).
 */
@RestController
@RequestMapping("/api/fees")
@CrossOrigin(originPatterns = "https://*.vercel.app")
public class FeeController {

    @Autowired
    private FeeService feeService;

    // Get all fees, or filter by course+batch
    @GetMapping
    public List<Fee> getFees(
            @RequestParam(required = false) String course,
            @RequestParam(required = false) String batch) {
        if (course != null && batch != null) {
            return feeService.findByCourseAndBatch(course, batch);
        }
        return feeService.findAll();
    }

    // Get a single student's fee status (used in student dashboard)
    @GetMapping("/student/{username}")
    public ResponseEntity<?> getStudentFee(@PathVariable String username) {
        return feeService.findByStudentUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Add a new fee record
    @PostMapping
    public Fee createFee(@RequestBody Fee fee) {
        return feeService.save(fee);
    }

    // Update an existing fee record (mark as PAID / PENDING)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateFee(@PathVariable Long id, @RequestBody Fee updated) {
        return feeService.findAll().stream()
                .filter(f -> f.getId().equals(id))
                .findFirst()
                .map(existing -> {
                    updated.setId(id);
                    return ResponseEntity.ok(feeService.save(updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete a fee record
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFee(@PathVariable Long id) {
        feeService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}