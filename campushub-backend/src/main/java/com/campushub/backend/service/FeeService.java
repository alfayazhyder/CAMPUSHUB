package com.campushub.backend.service;

import com.campushub.backend.entity.Fee;
import com.campushub.backend.repository.FeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class FeeService {

    @Autowired
    private FeeRepository feeRepository;

    public List<Fee> findAll() { return feeRepository.findAll(); }

    public List<Fee> findByCourseAndBatch(String course, String batch) {
        return feeRepository.findByCourseAndBatch(course, batch);
    }

    public Optional<Fee> findByStudentUsername(String username) {
        return feeRepository.findByStudentUsername(username);
    }

    public Fee save(Fee fee) { return feeRepository.save(fee); }

    public void deleteById(Long id) { feeRepository.deleteById(id); }
}