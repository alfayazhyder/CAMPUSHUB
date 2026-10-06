package com.campushub.backend.repository;

import com.campushub.backend.entity.Fee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface FeeRepository extends JpaRepository<Fee, Long> {
    List<Fee> findByCourseAndBatch(String course, String batch);
    Optional<Fee> findByStudentUsername(String studentUsername);
}
