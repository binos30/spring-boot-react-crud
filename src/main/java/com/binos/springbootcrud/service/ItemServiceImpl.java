package com.binos.springbootcrud.service;

import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.binos.springbootcrud.model.Item;
import com.binos.springbootcrud.repository.ItemRepository;

/**
 * @author Venus Lumanglas
 */
@Service
public class ItemServiceImpl implements ItemService {

	@Autowired
	private ItemRepository itemRepository;

	@Override
	public Collection<Item> getItems() {
		return itemRepository.findAllByOrderByNameAsc();
	}

	@Override
	public Optional<Item> getItemById(Long id) {
		return itemRepository.findById(id);
	}

	@Override
	public Item addItem(Item item) {
		return itemRepository.save(item);
	}

	@Override
	public Item updateItem(Item item) {
		return itemRepository.save(item);
	}

	@Override
	public void deleteItem(Long id) {
		itemRepository.deleteById(id);
	}

	@Override
	public void createItems() {
		if (itemRepository.findAll().size() == 0) {
			Item item1 = new Item();

			item1.setName("Apple");
			item1.setQuantity(20);

			addItem(item1);

			Item item2 = new Item();

			item2.setName("Banana");
			item2.setQuantity(25);

			addItem(item2);
		}

	}
}
