package com.example.items;

import jakarta.persistence.*;

@Entity
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private boolean done;

    public Item() {}

    public Item(String name) {
        this.name = name;
        this.done = false;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public boolean isDone() { return done; }
    public void setDone(boolean done) { this.done = done; }
}
