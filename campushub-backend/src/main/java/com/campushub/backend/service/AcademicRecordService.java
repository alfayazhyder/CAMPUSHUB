package com.campushub.backend.service;

import com.campushub.backend.entity.AcademicRecord;
import com.campushub.backend.repository.AcademicRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AcademicRecordService {

    @Autowired
    private AcademicRecordRepository academicRecordRepository;

    public List<AcademicRecord> getByCourseAndBatch(String course, String batch) {
        return academicRecordRepository.findByCourseAndBatch(course, batch);
    }

    public List<AcademicRecord> getByStudentUsername(String username) {
        return academicRecordRepository.findByStudentUsername(username);
    }

    public AcademicRecord save(AcademicRecord record) {
        return academicRecordRepository.save(record);
    }

    public void delete(Long id) {
        academicRecordRepository.deleteById(id);
    }
}
