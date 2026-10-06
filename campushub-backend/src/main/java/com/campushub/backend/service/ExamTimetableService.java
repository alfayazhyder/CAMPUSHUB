package com.campushub.backend.service;

import com.campushub.backend.entity.ExamTimetable;
import com.campushub.backend.repository.ExamTimetableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ExamTimetableService {

    @Autowired
    private ExamTimetableRepository examTimetableRepository;

    public List<ExamTimetable> findByCourseAndBatch(String course, String batch) {
        return examTimetableRepository.findByCourseAndBatch(course, batch);
    }

    public ExamTimetable save(ExamTimetable examTimetable) {
        return examTimetableRepository.save(examTimetable);
    }

    public void deleteById(Long id) { examTimetableRepository.deleteById(id); }
}
