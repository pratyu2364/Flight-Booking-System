package com.example.backend.dto;

import java.util.UUID;

public class TravellerDto {
    private String name;
    private int age;

    private UUID seat_id;

    public UUID getSeat_id() {
        return seat_id;
    }

    public void setSeat_id(UUID seat_id) {
        this.seat_id = seat_id;
    }

    public TravellerDto(String name, int age, UUID seat_id) {
        this.name = name;
        this.age = age;
        this.seat_id = seat_id;
    }

//    public TravellerDto(String name, int age) {
//        this.name = name;
//        this.age = age;
//    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "TravellerDto{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", seat_id=" + seat_id +
                '}';
    }
}
