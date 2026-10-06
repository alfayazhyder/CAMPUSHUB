package com.campushub.backend.service;

import com.campushub.backend.entity.CanteenItem;
import com.campushub.backend.repository.CanteenItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CanteenItemService {

    @Autowired
    private CanteenItemRepository canteenItemRepository;

    public List<CanteenItem> findAll() { return canteenItemRepository.findAll(); }

    public List<CanteenItem> findByCategory(String category) {
        return canteenItemRepository.findByCategory(category);
    }

    public CanteenItem save(CanteenItem item) { return canteenItemRepository.save(item); }

    public void deleteById(Long id) { canteenItemRepository.deleteById(id); }
}
