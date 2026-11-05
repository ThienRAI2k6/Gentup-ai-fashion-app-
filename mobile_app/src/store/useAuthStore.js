import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Tạo store quản lý trạng thái đăng nhập
const useAuthStore = create((set) => ({
  // --- 1. STATE (Dữ liệu) ---
  user: null, // Chứa thông tin user (tên, avatar, email...)
  token: null, // Chứa chuỗi JWT Token
  isLoading: true, // Trạng thái loading khi app vừa mở lên để check token cũ

  // --- 2. ACTIONS (Các hàm thay đổi dữ liệu) ---

  // Hàm gọi khi Đăng nhập thành công
  login: async (userData, tokenString) => {
    try {
      // Lưu token vào bộ nhớ cứng của điện thoại
      await AsyncStorage.setItem("userToken", tokenString);
      // Lưu thông tin user (cần chuyển thành chuỗi JSON vì AsyncStorage chỉ lưu string)
      await AsyncStorage.setItem("userInfo", JSON.stringify(userData));

      // Cập nhật State toàn cục để các màn hình khác nhận biết đã đăng nhập
      set({ user: userData, token: tokenString });
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu đăng nhập:", error);
    }
  },

  // Hàm gọi khi Đăng xuất
  logout: async () => {
    try {
      // Xóa dữ liệu khỏi bộ nhớ cứng
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userInfo");

      // Reset State về null
      set({ user: null, token: null });
    } catch (error) {
      console.error("Lỗi khi xóa dữ liệu đăng xuất:", error);
    }
  },

  // Hàm gọi ở App.js khi ứng dụng vừa khởi động để khôi phục phiên đăng nhập
  restoreSession: async () => {
    try {
      const storedToken = await AsyncStorage.getItem("userToken");
      const storedUser = await AsyncStorage.getItem("userInfo");

      if (storedToken && storedUser) {
        // Nếu tìm thấy token cũ, khôi phục lại State
        set({
          token: storedToken,
          user: JSON.parse(storedUser),
          isLoading: false,
        });
      } else {
        // Nếu không có, set loading = false để hiện màn hình Login
        set({ isLoading: false });
      }
    } catch (error) {
      console.error("Lỗi khi khôi phục phiên đăng nhập:", error);
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
