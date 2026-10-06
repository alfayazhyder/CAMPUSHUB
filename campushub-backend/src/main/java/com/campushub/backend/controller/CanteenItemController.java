package com.campushub.backend.controller;

import com.campushub.backend.entity.CanteenItem;
import com.campushub.backend.service.CanteenItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Manages today's canteen menu (snacks and lunch).
 * Used by: Non-teaching staff (edit), Student dashboard (view only).
 */
@RestController
@RequestMapping("/api/canteen")
@CrossOrigin(originPatterns = "https://*.vercel.app")
public class CanteenItemController {

    @Autowired
    private CanteenItemService canteenItemService;

    // Get all items (or filtered by category: SNACKS / LUNCH)
    @GetMapping
    public List<CanteenItem> getAllItems(
            @RequestParam(required = false) String category) {
        if (category != null) {
            return canteenItemService.findByCategory(category.toUpperCase());
        }
        return canteenItemService.findAll();
    }

    @PostMapping
    public CanteenItem create(@RequestBody CanteenItem item) {
        item.setCategory(item.getCategory().toUpperCase());
        return canteenItemService.save(item);
    }

    @PutMapping("/{id}")
    public CanteenItem update(@PathVariable Long id, @RequestBody CanteenItem updated) {
        updated.setId(id);
        updated.setCategory(updated.getCategory().toUpperCase());
        return canteenItemService.save(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        canteenItemService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}