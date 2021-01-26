package com.binos.springbootcrud.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.binos.springbootcrud.model.Item;

/**
 * @author Venus Lumanglas
 */
public interface ItemRepository extends JpaRepository<Item, Long> {

	Item findByName(String name);

	List<Item> findAllByOrderByNameAsc();
}
