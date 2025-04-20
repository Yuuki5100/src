package com.example.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum SubjectType {
    JAPANESE(1,"JAPANESE"),
    MATH(2,"MATH"),
    SCIENCE(3,"SCIENCE"),
    ;

    private final int code;
    private final String subject;

    public int getCode(){
        return code;
    }

    public static SubjectType getByString(int number) {
        // 値から enum 定数を特定して返す処理
        for (SubjectType value : SubjectType.values()) {
          if (value.getCode() == number) {
            return value;
          }
        }
        return null; // 特定できない場合
      }


}

