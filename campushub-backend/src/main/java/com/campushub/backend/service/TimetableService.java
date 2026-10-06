package com.campushub.backend.service;

import com.campushub.backend.entity.Timetable;
import com.campushub.backend.repository.TimetableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TimetableService {

    @Autowired
    private TimetableRepository timetableRepository;

    public List<Timetable> findByCourseAndBatch(String course, String batch) {
        return timetableRepository.findByCourseAndBatch(course, batch);
    }

    public Timetable save(Timetable timetable) { return timetableRepository.save(timetable); }

    public void deleteById(Long id) { timetableRepository.deleteById(id); }
}
