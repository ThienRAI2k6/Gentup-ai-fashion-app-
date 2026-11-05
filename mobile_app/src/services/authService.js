// src/services/authService.js
import apiClient from "./api";

const authService = {
  /**
   * Xử lý gọi API Đăng nhập
   * @param {Object} loginCredentials - Chứa { emailOrUsername, password }
   * @returns {Promise<Object>} - Trả về data từ server { user, token }
   */
  login: async (loginCredentials) => {
    const endpoint = "/api/auth/login";
    const response = await apiClient.post(endpoint, loginCredentials);
    return response.data;
  },

  /**
   * Xử lý gọi API Đăng ký tài khoản mới
   * @param {Object} registerData - Chứa { email, password }
   * @returns {Promise<Object>} - Trả về data từ server
   */
  register: async (registerData) => {
    const endpoint = "/api/auth/register";
    const response = await apiClient.post(endpoint, registerData);
    return response.data;
  },

  /**
   * Xử lý gọi API Đăng xuất (nếu backend có endpoint blacklist token)
   */
  logout: async () => {
    const endpoint = "/api/auth/logout";
    try {
      const response = await apiClient.post(endpoint);
      return response.data;
    } catch (error) {
      // Cho phép đăng xuất phía client kể cả khi server gặp sự cố
      console.warn("Lỗi khi gọi API đăng xuất:", error);
      return null;
    }
  },
};

export default authService;
