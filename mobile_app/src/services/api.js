// src/services/api.js
import axios from "axios";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL =
  Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";

// Bạn có thể tạo file .env để lưu BASE_URL này cho bảo mật hơn sau này.

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 giây nếu không phản hồi thì báo lỗi
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Đọc Token từ bộ nhớ điện thoại
      const token = await AsyncStorage.getItem("userToken");

      // Nếu có token, gắn nó vào Header 'Authorization' theo chuẩn Bearer Token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Lỗi khi đọc token để gắn vào header:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
