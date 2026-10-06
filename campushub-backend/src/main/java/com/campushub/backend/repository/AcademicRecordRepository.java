package com.campushub.backend.repository;

import com.campushub.backend.entity.AcademicRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AcademicRecordRepository extends JpaRepository<AcademicRecord, Long> {
    List<AcademicRecord> findByCourseAndBatch(String course, String batch);
    List<AcademicRecord> findByStudentUsername(String studentUsername);
    List<AcademicRecord> findByCourseAndBatchAndSubject(String course, String batch, String subject);
}
