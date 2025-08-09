package com.example.items;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:4200")
public class ItemController {
    private final ItemRepository repo;

    public ItemController(ItemRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Item> all() {
        return repo.findAll();
    }

    @PostMapping
    public Item create(@RequestBody Item in) {
        in.setId(null);
        return repo.save(in);
    }

    @PutMapping("/{id}")
    public Item update(@PathVariable Long id, @RequestBody Item in) {
        return repo.findById(id).map(e -> {
            e.setName(in.getName());
            e.setDone(in.isDone());
            return repo.save(e);
        }).orElseThrow(() -> new NoSuchElementException("Item not found with id " + id));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
