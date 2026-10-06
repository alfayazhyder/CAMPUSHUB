package com.campushub.backend.service;

import com.campushub.backend.entity.Notice;
import com.campushub.backend.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NoticeService {

    @Autowired
    private NoticeRepository noticeRepository;

    public List<Notice> findAll() { return noticeRepository.findAll(); }

    public Notice save(Notice notice) { return noticeRepository.save(notice); }

    public void deleteById(Long id) { noticeRepository.deleteById(id); }
}
