package com.example.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.entity.TestScore;

@Mapper
public interface SampleMapper {
    List<TestScore> select();
}