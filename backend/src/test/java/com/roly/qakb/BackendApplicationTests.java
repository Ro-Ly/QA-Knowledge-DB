package com.roly.qakb;

import lombok.Getter;
import lombok.Setter;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Map;

@SpringBootTest
class BackendApplicationTests {
    public Map<String, Integer> adjust(String bString, Integer bInteger) {
        bString = "2";
        bInteger = 2;
        return Map.of(bString, bInteger);
    }

    public void adjustUser(User user) {
        user.name = "BobB";
    }

    @Getter
    @Setter
    private class User {
        private String name;
        private Integer age;
        public User(String name, Integer age) {
            this.name = name;
        }
    }

    @Test
    void contextLoads() {
        var user1 = new User("BobA", 10);
        String aString = "1";
        Integer aInteger = 1;
        System.out.println("String 1: " + aString);
        System.out.println("Integer 1: " + aInteger);

        var map = adjust(aString, aInteger);
        adjustUser(user1);
        System.out.println("String 2: " + aString);
        System.out.println("Integer 2: " + aInteger);

        System.out.println(map);
        System.out.println();
    }

}
