const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const registerUser = async (email, password) => {
    try {
        // Kiểm tra xem email đã tồn tại trong hệ thống chưa
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            throw new Error('Email_Đã_Tồn_Tại');
        }

        // Mã hóa mật khẩu với saltRounds = 10
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Lưu thông tin vào MySQL
        const userId = await User.create({
            email,
            password: hashedPassword
        });

        return { id: userId, email };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    registerUser
};