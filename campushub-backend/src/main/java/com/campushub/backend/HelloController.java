package com.campushub.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import java.util.HashMap;

@RestController // This tells Spring "I handle web requests!"
public class HelloController {

    @GetMapping("/api/hello") // This is the specific URL endpoint
    public Map<String, String> sayHello() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello from your Spring Boot Backend! 🚀");
        return response; // Spring Boot automatically converts this Map into JSON data
    }
}