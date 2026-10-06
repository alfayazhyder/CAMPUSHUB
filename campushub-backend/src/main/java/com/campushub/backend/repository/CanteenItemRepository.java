package com.campushub.backend.repository;

import com.campushub.backend.entity.CanteenItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CanteenItemRepository extends JpaRepository<CanteenItem, Long> {
    List<CanteenItem> findByCategory(String category);
}
