package com.campushub.backend.repository;

import com.campushub.backend.entity.Timetable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TimetableRepository extends JpaRepository<Timetable, Long> {
    List<Timetable> findByCourseAndBatch(String course, String batch);
    List<Timetable> findByCourseAndBatchAndDay(String course, String batch, String day);
}
