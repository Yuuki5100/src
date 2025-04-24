package com.example.jems.service;

import com.example.jems.model.ErrorCodeSettingModel;
import com.example.jems.model.ErrorCodeId;
import com.example.jems.repository.ErrorCodeRepository;
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
    public List<ErrorCodeSettingModel> findAll() {
        return errorCodeRepository.findAll();
    }

    /**
     * エラーコードの新規登録または更新（Insert or Update）
     */
    public ErrorCodeSettingModel saveOrUpdate(ErrorCodeSettingModel errorCode) {
        return errorCodeRepository.save(errorCode);
    }

    /**
     * 特定のエラーコード（code + locale）を更新する
     */
    public Optional<ErrorCodeSettingModel> updateMessage(String code, String locale, String newMessage) {
        ErrorCodeId id = new ErrorCodeId(code, locale);
        Optional<ErrorCodeSettingModel> optional = errorCodeRepository.findById(id);
        if (optional.isPresent()) {
            ErrorCodeSettingModel model = optional.get();
            model.setMessage(newMessage);
            return Optional.of(errorCodeRepository.save(model));
        } else {
            return Optional.empty(); // 対象が存在しない
        }
    }
}
