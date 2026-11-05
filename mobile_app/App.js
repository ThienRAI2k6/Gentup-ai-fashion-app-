import React, { useEffect } from "react";
import {
  StatusBar,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/auth/LoginScreen";
import RegisterScreen from "./src/screens/auth/RegisterScreen";
import useAuthStore from "./src/store/useAuthStore";
import CustomButton from "./src/components/CustomButton";

const Stack = createNativeStackNavigator();

// Cấu hình Dark Theme đồng bộ màu sắc Cyberpunk của ứng dụng
const CyberpunkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#0D0D1A",
    card: "#0D0D1A",
    text: "#FFFFFF",
    border: "#2A2545",
  },
};

// Màn hình chào mừng tạm thời sau khi đăng nhập thành công
const HomeScreen = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <SafeAreaView style={styles.homeContainer}>
      <View style={styles.homeContent}>
        <Text style={styles.homeTitle}>🎉 GENTUP</Text>
        <Text style={styles.homeSubtitle}>Đăng nhập thành công!</Text>
        <View style={styles.userInfoCard}>
          <Text style={styles.userInfoText}>
            👤 Tài khoản:{" "}
            <Text style={styles.highlightText}>
              {user?.name || user?.email || "Người dùng"}
            </Text>
          </Text>
        </View>
        <CustomButton
          title="Đăng Xuất"
          onPress={logout}
          containerStyle={styles.logoutBtn}
        />
      </View>
    </SafeAreaView>
  );
};

export default function App() {
  const { token, isLoading, restoreSession } = useAuthStore();

  useEffect(() => {
    // Khôi phục phiên đăng nhập từ AsyncStorage khi ứng dụng khởi động
    restoreSession();
  }, []);

  // Màn hình loading khi đang khôi phục phiên đăng nhập
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#0D0D1A" />
        <ActivityIndicator size="large" color="#FF6B35" />
        <Text style={styles.loadingText}>Đang tải GentUp...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer theme={CyberpunkTheme}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D1A" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: { backgroundColor: "#0D0D1A" },
        }}
      >
        {!token ? (
          // Luồng Auth (khi chưa đăng nhập)
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          // Luồng chính (khi đã có token)
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#0D0D1A",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#8888AA",
    marginTop: 14,
    fontSize: 14,
  },
  homeContainer: {
    flex: 1,
    backgroundColor: "#0D0D1A",
  },
  homeContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
  },
  homeTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 3,
    marginBottom: 8,
  },
  homeSubtitle: {
    fontSize: 16,
    color: "#FF8C42",
    marginBottom: 24,
    fontWeight: "600",
  },
  userInfoCard: {
    backgroundColor: "#16132B",
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#2A2545",
    width: "100%",
    marginBottom: 28,
    alignItems: "center",
  },
  userInfoText: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  highlightText: {
    color: "#B388FF",
    fontWeight: "bold",
  },
  logoutBtn: {
    width: "100%",
  },
});
