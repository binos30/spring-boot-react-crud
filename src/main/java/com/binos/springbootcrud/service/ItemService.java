package com.binos.springbootcrud.service;

import java.util.Collection;
import java.util.Optional;

import com.binos.springbootcrud.model.Item;

/**
 * @author Venus Lumanglas
 */
public interface ItemService {

	Collection<Item> getItems();

	Optional<Item> getItemById(Long id);

	Item addItem(Item item);

	Item updateItem(Item item);

	void deleteItem(Long id);

	void createItems();

}
