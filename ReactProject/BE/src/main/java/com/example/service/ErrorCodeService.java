package com.example.service;

import com.example.demo.model.ErrorCodeModel;
import com.example.demo.model.ErrorCodeId;
import com.example.demo.repository.ErrorCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ErrorCodeService {

    @Autowired
    private ErrorCodeRepository errorCodeRepository;

    /**
     * 全てのエラーコードを取得する
     */
    public List<ErrorCodeModel> findAll() {
        return errorCodeRepository.findAll();
    }

    /**
     * エラーコードの新規登録または更新（Insert or Update）
     */
    public ErrorCodeModel saveOrUpdate(ErrorCodeModel errorCode) {
        return errorCodeRepository.save(errorCode);
    }

    /**
     * 特定のエラーコード（code + locale）を更新する
     */
    public Optional<ErrorCodeModel> updateMessage(String code, String locale, String newMessage) {
        ErrorCodeId id = new ErrorCodeId(code, locale);
        Optional<ErrorCodeModel> optional = errorCodeRepository.findById(id);
        if (optional.isPresent()) {
            ErrorCodeModel model = optional.get();
            model.setMessage(newMessage);
            return Optional.of(errorCodeRepository.save(model));
        } else {
            return Optional.empty(); // 対象が存在しない
        }
    }
}
