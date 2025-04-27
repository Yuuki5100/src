package com.example.jems.service;

import com.example.jems.model.SettingModel;
import com.example.jems.repository.SettingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class SettingServiceTest {

    @Mock
    private SettingRepository settingRepository;

    @InjectMocks
    private SettingService settingService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void findAllSettings_ShouldReturnAllSettings() {
        // Arrange
        SettingModel setting1 = new SettingModel("key1", "value1");
        SettingModel setting2 = new SettingModel("key2", "value2");
        when(settingRepository.findAll()).thenReturn(Arrays.asList(setting1, setting2));

        // Act
        List<SettingModel> settings = settingService.findAllSettings();

        // Assert
        assertThat(settings).hasSize(2);
        verify(settingRepository, times(1)).findAll();
    }

    @Test
    void updateSetting_WhenKeyExists_ShouldUpdateAndReturnSetting() {
        // Arrange
        String key = "theme";
        String oldValue = "light";
        String newValue = "dark";
        SettingModel existingSetting = new SettingModel(key, oldValue);

        when(settingRepository.findById(key)).thenReturn(Optional.of(existingSetting));

        // Act
        Optional<SettingModel> updatedSettingOpt = settingService.updateSetting(key, newValue);

        // Assert
        assertThat(updatedSettingOpt).isPresent();
        assertThat(updatedSettingOpt.get().getValue()).isEqualTo(newValue);
        verify(settingRepository, times(1)).save(existingSetting);
    }

    @Test
    void updateSetting_WhenKeyDoesNotExist_ShouldReturnEmpty() {
        // Arrange
        String key = "nonexistentKey";
        String value = "value";

        when(settingRepository.findById(key)).thenReturn(Optional.empty());

        // Act
        Optional<SettingModel> updatedSettingOpt = settingService.updateSetting(key, value);

        // Assert
        assertThat(updatedSettingOpt).isEmpty();
        verify(settingRepository, never()).save(any());
    }

    @Test
    void deleteSetting_WhenKeyExists_ShouldDeleteAndReturnTrue() {
        // Arrange
        String key = "keyToDelete";

        when(settingRepository.existsById(key)).thenReturn(true);

        // Act
        boolean result = settingService.deleteSetting(key);

        // Assert
        assertThat(result).isTrue();
        verify(settingRepository, times(1)).deleteById(key);
    }

    @Test
    void deleteSetting_WhenKeyDoesNotExist_ShouldReturnFalse() {
        // Arrange
        String key = "missingKey";

        when(settingRepository.existsById(key)).thenReturn(false);

        // Act
        boolean result = settingService.deleteSetting(key);

        // Assert
        assertThat(result).isFalse();
        verify(settingRepository, never()).deleteById(any());
    }
}
