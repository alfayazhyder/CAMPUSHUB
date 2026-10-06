package com.campushub.backend.service;

import com.campushub.backend.entity.User;
import com.campushub.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAll() { return userRepository.findAll(); }

    public List<User> getByRole(String role) { return userRepository.findByRole(role); }

    public List<User> getStudentsByCourseAndBatch(String course, String batch) {
        return userRepository.findByRoleAndCourseAndBatch("STUDENT", course, batch);
    }

    public User save(User user) { return userRepository.save(user); }

    public void delete(Long id) { userRepository.deleteById(id); }
}
