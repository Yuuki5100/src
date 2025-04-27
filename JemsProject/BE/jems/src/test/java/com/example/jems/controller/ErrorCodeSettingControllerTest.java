package com.example.jems.controller;

import com.example.jems.config.MockConfig;
import com.example.jems.model.ErrorCodeSettingModel;
import com.example.jems.service.ErrorCodeService;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ErrorCodeSettingController.class)
@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles("test")
@Import(MockConfig.class)
class ErrorCodeSettingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ErrorCodeService errorCodeService;

    @Test
    void testUpdateErrorCodeMessage_success() throws Exception {
        String code = "E10001";
        String locale = "ja";
        String newMessage = "新しいエラーメッセージ";

        ErrorCodeSettingModel mockModel = new ErrorCodeSettingModel(code, locale, newMessage);

        Mockito.when(errorCodeService.updateMessage(code, locale, newMessage))
                .thenReturn(Optional.of(mockModel));

        // リクエストボディは、JSON形式のMap
        String requestBodyJson = "{ \"newMessage\": \"" + newMessage + "\" }";

        mockMvc.perform(put("/error-codes/{code}?locale={locale}", code, locale)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(code))
                .andExpect(jsonPath("$.locale").value(locale))
                .andExpect(jsonPath("$.message").value(newMessage));
    }

    @Test
    void testUpdateErrorCodeMessage_notFound() throws Exception {
        String code = "E99999";
        String locale = "en";
        String newMessage = "Not found message";

        Mockito.when(errorCodeService.updateMessage(code, locale, newMessage))
                .thenReturn(Optional.empty());

        String requestBodyJson = "{ \"newMessage\": \"" + newMessage + "\" }";

        mockMvc.perform(put("/error-codes/{code}?locale={locale}", code, locale)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyJson))
                .andExpect(status().isNotFound());
    }
    
    @Test
    void testReloadErrorCodes_success() throws Exception {
        // モックを追加してリロード処理が成功するようにする
        Mockito.when(errorCodeService.reloadErrorCodes())
                .thenReturn("Error codes reloaded successfully.");

        mockMvc.perform(post("/error-codes/reload"))
                .andExpect(status().isOk())
                .andExpect(content().string("Error codes reloaded successfully."));
    }
}