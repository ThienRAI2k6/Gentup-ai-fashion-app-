const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/auth.routes');

// Load biến môi trường
dotenv.config();

const app = express();

// Middleware để đọc dữ liệu JSON từ App gửi lên
app.use(express.json());

// Khai báo các đường dẫn API
app.use('/api/auth', authRoutes);

// Khởi chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server đang chạy thành công tại http://localhost:${PORT}`);
});