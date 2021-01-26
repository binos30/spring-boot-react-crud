package com.binos.springbootcrud.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Venus Lumanglas
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "item")
public class Item implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	private Long id;

	@Column(name = "name")
	private String name;

	@Column(name = "quantity")
	private int quantity;

	@Override
	public String toString() {
		return "Item [id=" + id + ", name=" + name + ", quantity=" + quantity + "]";
	}
}
