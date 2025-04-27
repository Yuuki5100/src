package com.example.jems.service;

import com.example.jems.model.ErrorCodeSettingModel;
import com.example.jems.model.ErrorCodeId;
import com.example.jems.repository.ErrorCodeSettingRepository;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@NoArgsConstructor
@Transactional
@Service
public class ErrorCodeService {

    @Autowired
    private ErrorCodeSettingRepository errorCodeRepository;

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
        ErrorCodeSettingModel model = optional.get();
        model.setMessage(newMessage);
        if (optional.isPresent()) {
            return Optional.of(errorCodeRepository.save(model));
        } else {
            return Optional.of(errorCodeRepository.save(model));
        }
    }

    public String reloadErrorCodes(){
        //return errorCodeRepository.findAll();
        return "Error codes reloaded successfully.";
    }
}
