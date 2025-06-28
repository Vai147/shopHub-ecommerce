package com.example.productservice.config;

import com.example.productservice.model.Product;
import com.example.productservice.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;

@Component
public class DataLoader implements CommandLineRunner {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Clear existing data
        productRepository.deleteAll();
        
        // Create sample products
        Product product1 = new Product(
            "iPhone 15 Pro",
            "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
            new BigDecimal("999.99"),
            50,
            "Electronics",
            "Apple",
            "https://example.com/iphone15pro.jpg"
        );
        
        Product product2 = new Product(
            "Samsung Galaxy S24",
            "Premium Android smartphone with AI features and stunning display",
            new BigDecimal("899.99"),
            35,
            "Electronics",
            "Samsung",
            "https://example.com/galaxys24.jpg"
        );
        
        Product product3 = new Product(
            "MacBook Pro 14-inch",
            "Powerful laptop with M3 chip, perfect for professionals",
            new BigDecimal("1999.99"),
            25,
            "Electronics",
            "Apple",
            "https://example.com/macbookpro.jpg"
        );
        
        Product product4 = new Product(
            "Nike Air Max 270",
            "Comfortable running shoes with Air Max technology",
            new BigDecimal("129.99"),
            100,
            "Footwear",
            "Nike",
            "https://example.com/nikeairmax.jpg"
        );
        
        Product product5 = new Product(
            "Adidas Ultraboost 22",
            "High-performance running shoes with Boost technology",
            new BigDecimal("179.99"),
            75,
            "Footwear",
            "Adidas",
            "https://example.com/ultraboost.jpg"
        );
        
        Product product6 = new Product(
            "Sony WH-1000XM5",
            "Premium noise-canceling wireless headphones",
            new BigDecimal("349.99"),
            30,
            "Electronics",
            "Sony",
            "https://example.com/sonyheadphones.jpg"
        );
        
        Product product7 = new Product(
            "Dell XPS 13",
            "Ultra-thin laptop with InfinityEdge display",
            new BigDecimal("1299.99"),
            20,
            "Electronics",
            "Dell",
            "https://example.com/dellxps.jpg"
        );
        
        Product product8 = new Product(
            "Puma RS-X",
            "Retro-inspired sneakers with bold design",
            new BigDecimal("89.99"),
            60,
            "Footwear",
            "Puma",
            "https://example.com/pumarsx.jpg"
        );
        
        // Save all products
        productRepository.saveAll(Arrays.asList(
            product1, product2, product3, product4, product5, product6, product7, product8
        ));
        
        System.out.println("Sample products loaded successfully!");
    }
} 