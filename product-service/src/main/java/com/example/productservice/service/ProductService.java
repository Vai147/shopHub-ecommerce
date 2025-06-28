package com.example.productservice.service;

import com.example.productservice.dto.ProductRequest;
import com.example.productservice.dto.ProductResponse;
import com.example.productservice.model.Product;
import com.example.productservice.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    public ProductResponse createProduct(ProductRequest request) {
        Product product = new Product(
            request.getName(),
            request.getDescription(),
            request.getPrice(),
            request.getStockQuantity(),
            request.getCategory(),
            request.getBrand(),
            request.getImageUrl()
        );
        
        Product savedProduct = productRepository.save(product);
        return convertToResponse(savedProduct);
    }
    
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findByIdAndActiveTrue(id)
            .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));
        return convertToResponse(product);
    }
    
    public List<ProductResponse> getAllProducts() {
        List<Product> products = productRepository.findByActiveTrue();
        return products.stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }
    
    public List<ProductResponse> getProductsByCategory(String category) {
        List<Product> products = productRepository.findByCategoryAndActiveTrue(category);
        return products.stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }
    
    public List<ProductResponse> getProductsByBrand(String brand) {
        List<Product> products = productRepository.findByBrandAndActiveTrue(brand);
        return products.stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }
    
    public List<ProductResponse> searchProducts(String keyword) {
        List<Product> products = productRepository.searchProducts(keyword);
        return products.stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }
    
    public List<ProductResponse> getAvailableProducts() {
        List<Product> products = productRepository.findAvailableProducts();
        return products.stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }
    
    public List<ProductResponse> getLowStockProducts(Integer threshold) {
        List<Product> products = productRepository.findLowStockProducts(threshold);
        return products.stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }
    
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findByIdAndActiveTrue(id)
            .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));
        
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStockQuantity(request.getStockQuantity());
        product.setCategory(request.getCategory());
        product.setBrand(request.getBrand());
        product.setImageUrl(request.getImageUrl());
        
        Product updatedProduct = productRepository.save(product);
        return convertToResponse(updatedProduct);
    }
    
    public void deleteProduct(Long id) {
        Product product = productRepository.findByIdAndActiveTrue(id)
            .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));
        
        product.setActive(false);
        productRepository.save(product);
    }
    
    public boolean updateStock(Long productId, Integer quantity) {
        Product product = productRepository.findByIdAndActiveTrue(productId)
            .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + productId));
        
        int newStock = product.getStockQuantity() - quantity;
        if (newStock < 0) {
            return false; // Insufficient stock
        }
        
        product.setStockQuantity(newStock);
        productRepository.save(product);
        return true;
    }
    
    public boolean checkStockAvailability(Long productId, Integer quantity) {
        Product product = productRepository.findByIdAndActiveTrue(productId)
            .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + productId));
        
        return product.getStockQuantity() >= quantity;
    }
    
    private ProductResponse convertToResponse(Product product) {
        return new ProductResponse(
            product.getId(),
            product.getName(),
            product.getDescription(),
            product.getPrice(),
            product.getStockQuantity(),
            product.getCategory(),
            product.getBrand(),
            product.getImageUrl(),
            product.getCreatedAt(),
            product.getUpdatedAt(),
            product.getActive()
        );
    }
} 