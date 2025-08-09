package com.example.items;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {
    private final ItemRepository repo;
    public DataLoader(ItemRepository repo) { this.repo = repo; }
    @Override
    public void run(String... args) {
        if (repo.count() == 0) {
            repo.save(new Item("Buy milk"));
            repo.save(new Item("Read a book"));
        }
    }
}
