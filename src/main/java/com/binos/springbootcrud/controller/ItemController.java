//package com.binos.springbootcrud.controller;
//
//import java.net.URI;
//import java.net.URISyntaxException;
//import java.util.Collection;
//import java.util.Optional;
//
//import javax.validation.Valid;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.binos.springbootcrud.entity.Item;
//import com.binos.springbootcrud.service.ItemService;
//
///**
// * @author Venus Lumanglas
// */
//@RestController
//@RequestMapping("/api")
//public class ItemController {
//
//	private final Logger log = LoggerFactory.getLogger(ItemController.class);
//
//	@Autowired
//	private ItemService itemService;
//
//	@GetMapping("/items")
//	public Collection<Item> items() {
//		return itemService.getItems();
//	}
//
//	@GetMapping("/items/{id}")
//	public ResponseEntity<Item> getItemById(@PathVariable Long id) {
//		Optional<Item> item = itemService.getItemById(id);
//		return item.map(response -> ResponseEntity.ok().body(response))
//				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
//	}
//
//	@PostMapping("/items")
//	public ResponseEntity<Item> addItem(@Valid @RequestBody Item item) throws URISyntaxException {
//		log.info("Request to add item: {}", item);
//		Item result = itemService.addItem(item);
//		return ResponseEntity.created(new URI("/api/items/" + result.getId())).body(result);
//	}
//
//	@PutMapping("/items/{id}")
//	public ResponseEntity<Item> updateItem(@Valid @RequestBody Item item) {
//		log.info("Request to update item: {}", item);
//		Item result = itemService.updateItem(item);
//		return ResponseEntity.ok().body(result);
//	}
//
//	@DeleteMapping("/items/{id}")
//	public ResponseEntity<Object> deleteItem(@PathVariable Long id) {
//		log.info("Request to delete item: {}", id);
//		itemService.deleteItem(id);
//		return new ResponseEntity<Object>("Successfully Deleted", HttpStatus.OK);
//	}
//}
