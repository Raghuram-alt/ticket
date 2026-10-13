package com.helpdesk.router.service;

import com.helpdesk.router.model.Customer;
import com.helpdesk.router.model.CustomerHistory;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Service managing customer records and their support history.
 */
@Service
public class CustomerService {

    private final Map<String, Customer> customerMap = new ConcurrentHashMap<>();

    public CustomerService() {
        initSampleCustomers();
    }

    private void initSampleCustomers() {
        addCustomer(new Customer("CUST-101", "Rahul Kumar", "rahul.kumar@acme-corp.com", "Acme Corporation", "ENTERPRISE"), 6, 4, 1, 1);
        addCustomer(new Customer("CUST-102", "Sarah Chen", "sarah.c@techflow.io", "TechFlow Inc", "PRO"), 5, 1, 3, 1);
        addCustomer(new Customer("CUST-103", "John Smith", "jsmith@globallogistics.com", "Global Logistics", "ENTERPRISE"), 8, 5, 2, 1);
        addCustomer(new Customer("CUST-104", "Elena Rostova", "elena@novasoft.dev", "NovaSoft Solutions", "STARTER"), 2, 0, 1, 1);
        addCustomer(new Customer("CUST-105", "Marcus Aurelius", "marcus@stoicconsulting.org", "Stoic Consulting", "PRO"), 4, 2, 1, 1);
        addCustomer(new Customer("CUST-106", "Amina Idris", "amina@saharanet.io", "SaharaNet", "ENTERPRISE"), 9, 3, 5, 1);
    }

    private void addCustomer(Customer customer, int total, int billing, int technical, int other) {
        CustomerHistory history = new CustomerHistory(customer.getCustomerId(), total, billing, technical, other);
        customer.setHistory(history);
        customerMap.put(customer.getCustomerId(), customer);
    }

    public List<Customer> getAllCustomers() {
        return new ArrayList<>(customerMap.values());
    }

    public Optional<Customer> getCustomerById(String customerId) {
        return Optional.ofNullable(customerMap.get(customerId));
    }

    public Customer findOrCreateByEmail(String email, String name) {
        for (Customer c : customerMap.values()) {
            if (c.getEmail().equalsIgnoreCase(email.trim())) {
                return c;
            }
        }
        String newId = "CUST-" + (100 + customerMap.size() + 1);
        Customer newCustomer = new Customer(newId, name, email, "New Organization", "STARTER");
        customerMap.put(newId, newCustomer);
        return newCustomer;
    }

    public CustomerHistory getCustomerHistory(String customerId) {
        Customer c = customerMap.get(customerId);
        if (c != null && c.getHistory() != null) {
            return c.getHistory();
        }
        return new CustomerHistory(customerId, 0, 0, 0, 0);
    }
}
