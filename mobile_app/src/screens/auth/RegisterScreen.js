import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../../services/api'; // Trỏ tới cấu hình axios chung của dự án

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            setError('Email không được để trống.');
            return false;
        }
        if (!emailRegex.test(email)) {
            setError('Định dạng email không hợp lệ.');
            return false;
        }
        if (!password) {
            setError('Mật khẩu không được để trống.');
            return false;
        }
        if (password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự.');
            return false;
        }
        
        setError('');
        return true;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        try {
            const response = await api.post('/api/auth/register', {
                email,
                password
            });

            if (response.status === 201) {
                Alert.alert('Thành công', 'Đăng ký tài khoản thành công!');
                // Điều hướng sang màn hình đăng nhập sau khi thành công
                // navigation.navigate('Login'); 
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Có lỗi xảy ra kết nối với máy chủ.';
            Alert.alert('Đăng ký thất bại', errorMessage);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng Ký Tài Khoản</Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Đăng Ký</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: '#F9F9F9',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    errorText: {
        color: '#FF3B30',
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: '500',
    }
});

export default RegisterScreen;