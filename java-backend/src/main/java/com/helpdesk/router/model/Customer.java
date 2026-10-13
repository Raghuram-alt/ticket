package com.helpdesk.router.model;

/**
 * Customer domain model. Demonstrates OOP encapsulation.
 */
public class Customer {
    private String customerId;
    private String name;
    private String email;
    private String company;
    private String tier; // STARTER, PRO, ENTERPRISE
    private CustomerHistory history;

    public Customer() {
        this.history = new CustomerHistory();
    }

    public Customer(String customerId, String name, String email, String company, String tier) {
        this.customerId = customerId;
        this.name = name;
        this.email = email;
        this.company = company;
        this.tier = tier;
        this.history = new CustomerHistory(customerId, 0, 0, 0, 0);
    }

    // Getters and Setters
    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getTier() { return tier; }
    public void setTier(String tier) { this.tier = tier; }

    public CustomerHistory getHistory() { return history; }
    public void setHistory(CustomerHistory history) { this.history = history; }
}
