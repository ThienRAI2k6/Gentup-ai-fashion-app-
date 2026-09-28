const authService = require('../services/auth.service');

const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ email và mật khẩu' });
        }

        const newUser = await authService.registerUser(email, password);
        
        return res.status(201).json({
            message: 'Đăng ký tài khoản thành công',
            user: newUser
        });
    } catch (error) {
        if (error.message === 'Email_Đã_Tồn_Tại') {
            return res.status(409).json({ message: 'Email này đã được sử dụng' });
        }
        console.error("Lỗi Controller Register:", error);
        return res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
};

module.exports = {
    register
};