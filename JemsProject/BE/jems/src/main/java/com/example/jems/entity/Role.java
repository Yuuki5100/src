package com.example.jems.entity;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum Role {
    USER("USER"),
    ADMIN("ADMIN");

    private final String roleLabel;

    public String getRoleLabel() {
        return roleLabel;
    }

    public static String containRole(String role) {
        for (Role roleObj : Role.values()){
            if (roleObj.roleLabel.equals(role)) {
                return role;
            }
        }
        throw new IllegalArgumentException("Invalid role: " + role);
    }
}
