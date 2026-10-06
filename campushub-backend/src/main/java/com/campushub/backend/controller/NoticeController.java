package com.campushub.backend.controller;

import com.campushub.backend.entity.Notice;
import com.campushub.backend.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Handles notice board entries (upcoming events, announcements).
 * Used by: Non-teaching staff (edit), Student dashboard (view only).
 */
@RestController
@RequestMapping("/api/notices")
@CrossOrigin(originPatterns = "https://*.vercel.app")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @GetMapping
    public List<Notice> getAllNotices() {
        return noticeService.findAll();
    }

    @PostMapping
    public Notice createNotice(@RequestBody Notice notice) {
        return noticeService.save(notice);
    }

    @PutMapping("/{id}")
    public Notice updateNotice(@PathVariable Long id, @RequestBody Notice updated) {
        updated.setId(id);
        return noticeService.save(updated);
    }

    @DeleteMapping("/{id}")
    public void deleteNotice(@PathVariable Long id) {
        noticeService.deleteById(id);
    }
}