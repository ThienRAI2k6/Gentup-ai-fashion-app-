import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

/**
 * Component CustomButton gradient chuẩn Neon Cyberpunk
 * Tạo nút bấm gradient cam - tím với hiệu ứng bóng đổ phát sáng
 */
const CustomButton = ({
  title,
  onPress,
  colors = ["#FF6B35", "#9B59B6"],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  loading = false,
  disabled = false,
  containerStyle,
  buttonStyle,
  textStyle,
  children,
  activeOpacity = 0.85,
  ...restProps
}) => {
  const isActionDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity}
      disabled={isActionDisabled}
      style={[
        styles.buttonShadow,
        isActionDisabled && styles.buttonDisabled,
        containerStyle,
      ]}
      {...restProps}
    >
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        style={[styles.gradientButton, buttonStyle]}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : children ? (
          children
        ) : (
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonShadow: {
    borderRadius: 14,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  gradientButton: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default CustomButton;

