import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

/**
 * Component CustomTextInput chuẩn Neon Cyberpunk
 * Tự động quản lý hiệu ứng phát sáng neon khi focus, icon bên trái và nút ẩn/hiện mật khẩu
 */
const CustomTextInput = ({
  iconName,
  isPassword = false,
  value,
  onChangeText,
  placeholder,
  containerStyle,
  inputStyle,
  onFocus,
  onBlur,
  ...restProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      style={[
        styles.inputWrapper,
        isFocused && styles.inputWrapperFocused,
        containerStyle,
      ]}
    >
      <LinearGradient
        colors={
          isFocused ? ["#9B59B6", "#FF6B35"] : ["#2A2545", "#2A2545"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.inputBorder}
      >
        <View style={styles.inputInner}>
          {iconName && (
            <Ionicons
              name={iconName}
              size={20}
              color={isFocused ? "#FF8C42" : "#6B6B8D"}
              style={styles.inputIcon}
            />
          )}

          <TextInput
            style={[styles.input, inputStyle]}
            placeholder={placeholder}
            placeholderTextColor="#6B6B8D"
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={isPassword ? !showPassword : restProps.secureTextEntry}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            {...restProps}
          />

          {isPassword && (
            <TouchableOpacity
              onPress={() => setShowPassword((prev) => !prev)}
              style={styles.eyeButton}
              activeOpacity={0.7}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color={isFocused ? "#FF8C42" : "#6B6B8D"}
              />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 16,
    borderRadius: 14,
  },
  inputWrapperFocused: {
    shadowColor: "#9B59B6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  inputBorder: {
    borderRadius: 14,
    padding: 1.5,
  },
  inputInner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#16132B",
    borderRadius: 13,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 16 : 4,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
    paddingVertical: Platform.OS === "ios" ? 0 : 12,
  },
  eyeButton: {
    padding: 4,
  },
});

export default CustomTextInput;

