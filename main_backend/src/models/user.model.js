const db = require('../config/database');

const User = {
    createTable: async () => {
        const sql = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await db.execute(sql);
    },
    
    findByEmail: async (email) => {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },

    create: async (userData) => {
        const { email, password } = userData;
        const [result] = await db.execute(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, password]
        );
        return result.insertId;
    }
};

// Khởi tạo bảng ngay khi load model nếu chưa tồn tại
User.createTable().catch(err => console.error("Lỗi tạo bảng users:", err));

module.exports = User;