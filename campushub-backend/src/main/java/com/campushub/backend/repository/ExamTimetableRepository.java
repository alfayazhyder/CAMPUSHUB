package com.campushub.backend.repository;

import com.campushub.backend.entity.ExamTimetable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExamTimetableRepository extends JpaRepository<ExamTimetable, Long> {
    List<ExamTimetable> findByCourseAndBatch(String course, String batch);
}
