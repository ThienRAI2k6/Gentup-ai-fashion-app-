import axios from 'axios';

// Nếu dùng điện thoại thật kết nối cùng WiFi với máy tính:
// Mở cmd gõ "ipconfig" để lấy địa chỉ IPv4 (ví dụ 192.168.1.15)
const LOCAL_IP = '192.168.0.143'; // ĐỔI THÀNH IPV4 CỦA MÁY TÍNH BẠN

const api = axios.create({
    baseURL: `http://${LOCAL_IP}:3000`,
    timeout: 10000,
});

export default api;