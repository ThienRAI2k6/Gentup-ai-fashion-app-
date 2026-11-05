import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import authService from "../../services/authService";
import useAuthStore from "../../store/useAuthStore";

// ─── Logo Google chính xác theo brand guidelines ───
const GoogleLogo = ({ size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48">
    <Path
      d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
      fill="#FFC107"
    />
    <Path
      d="M5.3 14.7l7.4 5.4C14.3 16.4 18.8 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.7 6.6 5.3 14.7z"
      fill="#FF3D00"
    />
    <Path
      d="M24 46c5.4 0 10.3-1.8 14.1-5l-7-5.4c-2 1.4-4.5 2.3-7.1 2.3-6 0-11.1-4-12.9-9.5l-7.3 5.6C7.5 41.2 15.2 46 24 46z"
      fill="#4CAF50"
    />
    <Path
      d="M44.5 20H24v8.5h11.8c-.9 2.6-2.6 4.8-4.8 6.3l7 5.4C42.2 36.2 46 30.7 46 24c0-1.3-.2-2.7-.5-4h-1z"
      fill="#1976D2"
    />
  </Svg>
);

// ─── Icon Facebook ───
const FacebookIcon = ({ size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12z"
      fill="#FFFFFF"
    />
  </Svg>
);

// ─── Hiệu ứng ngôi sao lấp lánh (sparkle) ───
const Sparkle = ({ top, left, right, size = 12, color = "#B388FF" }) => (
  <Text
    style={{
      position: "absolute",
      top,
      left,
      right,
      fontSize: size,
      color,
      opacity: 0.7,
    }}
  >
    ✦
  </Text>
);

const LoginScreen = ({ navigation }) => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const loginAction = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    if (!emailOrUsername || !password) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    try {
      const credentials = { emailOrUsername, password };
      const result = await authService.login(credentials);
      await loginAction(result.user, result.token);

      Alert.alert(
        "Thành công",
        `Chào mừng ${result.user?.name || "bạn"} đã quay trở lại!`,
      );
    } catch (error) {
      console.log("Lỗi đăng nhập:", error);
      let errorMessage = "Đã có lỗi xảy ra. Vui lòng thử lại sau!";
      if (error.response) {
        errorMessage =
          error.response.data?.message || `Lỗi server: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = "Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng!";
      }
      Alert.alert("Đăng nhập thất bại", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Đăng nhập bằng Google");
  };

  const handleFacebookLogin = () => {
    console.log("Đăng nhập bằng Facebook");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D1A" />

      {/* Nền gradient tím-cam tối */}
      <LinearGradient
        colors={["#0D0D1A", "#1A1035", "#0D0D1A"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Hiệu ứng ánh sáng neon nền */}
      <View style={styles.glowCircleOrange} />
      <View style={styles.glowCirclePurple} />

      {/* Ngôi sao lấp lánh trang trí */}
      <Sparkle top={80} left={30} size={10} color="#B388FF" />
      <Sparkle top={120} right={40} size={14} color="#FF8C42" />
      <Sparkle top={280} left={20} size={8} color="#B388FF" />
      <Sparkle top={420} right={25} size={12} color="#FF8C42" />
      <Sparkle top={560} left={40} size={10} color="#B388FF" />
      <Sparkle top={650} right={50} size={14} color="#FF8C42" />
      <Sparkle top={750} left={60} size={8} color="#B388FF" />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* ─── Logo và Tiêu đề ─── */}
            <View style={styles.headerContainer}>
              <View style={styles.logoWrapper}>
                <LinearGradient
                  colors={["#9B59B6", "#FF6B35"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.logoBorder}
                >
                  <View style={styles.logoInner}>
                    <Image
                      source={require("../../assets/logo.png")}
                      style={styles.logo}
                      resizeMode="cover"
                    />
                  </View>
                </LinearGradient>
              </View>

              <Text style={styles.appName}>GENTUP</Text>
              <Text style={styles.tagline}>Nâng tầm phong cách</Text>
              <Text style={styles.subtitle}>
                Đăng nhập để tiếp tục hành trình của bạn
              </Text>
            </View>

            {/* ─── Form nhập liệu (Dùng CustomTextInput và CustomButton) ─── */}
            <View style={styles.formContainer}>
              <CustomTextInput
                iconName="person-outline"
                placeholder="Email hoặc tên đăng nhập"
                value={emailOrUsername}
                onChangeText={setEmailOrUsername}
                autoCapitalize="none"
              />

              <CustomTextInput
                iconName="lock-closed-outline"
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                isPassword
              />

              {/* Quên mật khẩu */}
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
              </TouchableOpacity>

              {/* Nút Đăng Nhập gradient */}
              <CustomButton
                title="Đăng Nhập"
                onPress={handleLogin}
                loading={loading}
              />
            </View>

            {/* ─── Đăng nhập Mạng xã hội ─── */}
            <View style={styles.socialContainer}>
              <View style={styles.dividerContainer}>
                <LinearGradient
                  colors={["transparent", "#3D3560"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.divider}
                />
                <Text style={styles.dividerText}>Hoặc tiếp tục với</Text>
                <LinearGradient
                  colors={["#3D3560", "transparent"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.divider}
                />
              </View>

              <View style={styles.socialButtonsRow}>
                {/* Nút Google */}
                <TouchableOpacity
                  style={[styles.socialBtn, styles.googleBtn]}
                  onPress={handleGoogleLogin}
                  activeOpacity={0.85}
                >
                  <GoogleLogo size={22} />
                  <Text style={styles.googleBtnText}>Google</Text>
                </TouchableOpacity>

                {/* Nút Facebook */}
                <TouchableOpacity
                  style={[styles.socialBtn, styles.facebookBtn]}
                  onPress={handleFacebookLogin}
                  activeOpacity={0.85}
                >
                  <FacebookIcon size={22} />
                  <Text style={styles.facebookBtnText}>Facebook</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* ─── Footer Đăng ký ─── */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Chưa có tài khoản? </Text>
              <TouchableOpacity
                onPress={() => navigation?.navigate?.("Register")}
              >
                <Text style={styles.registerText}>Đăng ký ngay</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D1A",
  },
  glowCircleOrange: {
    position: "absolute",
    top: -80,
    right: -60,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#FF6B35",
    opacity: 0.08,
  },
  glowCirclePurple: {
    position: "absolute",
    bottom: 100,
    left: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#9B59B6",
    opacity: 0.06,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 28,
    justifyContent: "center",
    paddingVertical: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoWrapper: {
    marginBottom: 20,
    shadowColor: "#9B59B6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  logoBorder: {
    width: 108,
    height: 108,
    borderRadius: 54,
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  logoInner: {
    width: 102,
    height: 102,
    borderRadius: 51,
    overflow: "hidden",
    backgroundColor: "#1A1035",
  },
  logo: {
    width: 102,
    height: 102,
  },
  appName: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 4,
    marginBottom: 6,
    textShadowColor: "#9B59B6",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  tagline: {
    fontSize: 16,
    color: "#FF8C42",
    fontWeight: "600",
    marginBottom: 4,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 13,
    color: "#8888AA",
    marginTop: 4,
  },
  formContainer: {
    marginBottom: 24,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
    marginTop: 2,
  },
  forgotPasswordText: {
    color: "#FF8C42",
    fontSize: 13,
    fontWeight: "600",
  },
  socialContainer: {
    marginBottom: 24,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    color: "#6B6B8D",
    paddingHorizontal: 14,
    fontSize: 13,
  },
  socialButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
  },
  socialBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 14,
    gap: 10,
  },
  googleBtn: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  googleBtnText: {
    color: "#333333",
    fontSize: 15,
    fontWeight: "700",
  },
  facebookBtn: {
    backgroundColor: "#1877F2",
    shadowColor: "#1877F2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  facebookBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  footerText: {
    color: "#8888AA",
    fontSize: 14,
  },
  registerText: {
    color: "#FF8C42",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default LoginScreen;
