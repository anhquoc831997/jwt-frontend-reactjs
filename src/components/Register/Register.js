import React, { useEffect, useState } from 'react';
import './Register.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import { toast } from 'react-toastify';
const Register = (props) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState({
        email: '',
        validEmail: 'form-control',
        phone: '',
        validPhone: 'form-control',
        username: '',
        validUsername: 'form-control',
        password: '',
        validPassword: 'form-control',
        confirmPassword: '',
        validConfirmPassword: 'form-control'
    });
    let history = useHistory();
    const handleLogin = () => {
        history.push('/login');
    }
    const isValidInputs = () => {
        let isValid = true;
        const newErrors = { ...errors };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;// Mã regex cho email
        if (!email) {
            newErrors.email = 'Email is require';
            newErrors.validEmail = 'form-control is-invalid';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'The email format is incorrect';
            newErrors.validEmail = 'form-control is-invalid';
            isValid = false;
        } else {
            newErrors.email = '';
            newErrors.validEmail = 'form-control is-valid';
        }
        const phoneRegex = /^[0-9]{10}$/; // Mã regex cho số điện thoại 10 chữ số
        if (!phone) {
            newErrors.phone = 'Phone is require';
            newErrors.validPhone = 'form-control is-invalid';
            isValid = false;
        } else if (!phoneRegex.test(phone)) {
            newErrors.phone = 'The phone number must have 10 digits';
            newErrors.validPhone = 'form-control is-invalid';
            isValid = false;
        } else {
            newErrors.phone = '';
            newErrors.validPhone = 'form-control is-valid';
        }
        if (!username) {
            newErrors.username = 'Username is require';
            newErrors.validUsername = 'form-control is-invalid';
            isValid = false;
        } else {
            newErrors.username = '';
            newErrors.validUsername = 'form-control is-valid';
        }
        if (!password) {
            newErrors.password = 'Password is require';
            newErrors.validPassword = 'form-control is-invalid';
            newErrors.confirmPassword = 'Passwords is require';
            newErrors.validConfirmPassword = 'form-control is-invalid';
            isValid = false;
        } else {
            newErrors.password = '';
            newErrors.validPassword = 'form-control is-valid';
            if (confirmPassword !== password) {
                newErrors.confirmPassword = 'Passwords do not match';
                newErrors.validConfirmPassword = 'form-control is-invalid';
                isValid = false;
            } else {
                newErrors.confirmPassword = '';
                newErrors.validConfirmPassword = 'form-control is-valid';
            }
        }
        setErrors(newErrors);
        return isValid;
    }
    const handleBlur = (field) => {
        const newErrors = { ...errors };

        switch (field) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;// Mã regex cho email
                if (!email) {
                    newErrors.email = 'Email is require';
                    newErrors.validEmail = 'form-control is-invalid';
                } else if (!emailRegex.test(email)) {
                    newErrors.email = 'The email format is incorrect';
                    newErrors.validEmail = 'form-control is-invalid';
                } else {
                    newErrors.email = '';
                    newErrors.validEmail = 'form-control is-valid';
                }
                break;

            case 'phone':
                const phoneRegex = /^[0-9]{10}$/; // Mã regex cho số điện thoại 10 chữ số
                if (!phone) {
                    newErrors.phone = 'Phone is require';
                    newErrors.validPhone = 'form-control is-invalid';
                } else if (!phoneRegex.test(phone)) {
                    newErrors.phone = 'The phone number must have 10 digits';
                    newErrors.validPhone = 'form-control is-invalid';
                } else {
                    newErrors.phone = '';
                    newErrors.validPhone = 'form-control is-valid';
                }
                break;

            case 'username':
                if (!username) {
                    newErrors.username = 'Username is require';
                    newErrors.validUsername = 'form-control is-invalid';
                } else {
                    newErrors.username = '';
                    newErrors.validUsername = 'form-control is-valid';
                }
                break;

            case 'password':
                if (!password) {
                    newErrors.password = 'Password is require';
                    newErrors.validPassword = 'form-control is-invalid';
                    newErrors.confirmPassword = 'Passwords is require';
                    newErrors.validConfirmPassword = 'form-control is-invalid';
                } else {
                    newErrors.password = '';
                    newErrors.validPassword = 'form-control is-valid';
                    if (confirmPassword !== password) {
                        newErrors.confirmPassword = 'Passwords do not match';
                        newErrors.validConfirmPassword = 'form-control is-invalid';
                    } else {
                        newErrors.confirmPassword = '';
                        newErrors.validConfirmPassword = 'form-control is-valid';
                    }
                }
                break;

            default:
                break;
        }

        setErrors(newErrors);
    }
    const handleRegister = () => {
        let check = isValidInputs();
        if (check) {
            axios.post('http://localhost:8080/api/v1/register', {
                email, phone, username, password, confirmPassword
            })
        }
        // console.log('check user data', userData);
    }
    useEffect(() => {
        // axios.get('http://localhost:8080/api/v1/test-api').then(data => {
        //     console.log('check data', data);
        // });

    }, []);
    return (
        <div className='register-container'>
            <div className='container'>
                <div className='row px-3 px-sm-0'>
                    <div className='content-left col-12 d-none col-sm-7 d-sm-block'>
                        <div className='brand'>
                            Facebook
                        </div>
                        <div className='detail'>
                            Facebook helps you connect and share with the people in your life.
                        </div>
                    </div>
                    <div className='content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3'>
                        <div className='brand d-sm-none'>
                            Facebook
                        </div>
                        <div className='form-group'>
                            <label>Email:</label>
                            <input type='text' className={errors.validEmail} placeholder='Email address'
                                value={email} onChange={(event) => setEmail(event.target.value)}
                                onBlur={() => handleBlur("email")}
                            ></input>
                            {errors.email && <div className="error">{errors.email}</div>}
                        </div>
                        <div className='form-group'>
                            <label>Phone number:</label>
                            <input type='text' className={errors.validPhone} placeholder='Phone number'
                                value={phone} onChange={(event) => setPhone(event.target.value)}
                                onBlur={() => handleBlur("phone")}
                            ></input>
                            {errors.phone && <div className="error">{errors.phone}</div>}
                        </div>
                        <div className='form-group'>
                            <label>User name:</label>
                            <input type='text' className={errors.validUsername} placeholder='User name'
                                value={username} onChange={(event) => setUsername(event.target.value)}
                                onBlur={() => handleBlur("username")}
                            ></input>
                            {errors.username && <div className="error">{errors.username}</div>}
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input type='password' className={errors.validPassword} placeholder='Password'
                                value={password} onChange={(event) => setPassword(event.target.value)}
                                onBlur={() => handleBlur("password")}
                            ></input>
                            {errors.password && <div className="error">{errors.password}</div>}
                        </div>
                        <div className='form-group'>
                            <label>Re-enter password:</label>
                            <input type='password' className={errors.validConfirmPassword} placeholder='Re-enter password'
                                value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
                                onBlur={() => handleBlur("password")}
                            ></input>
                            {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
                        </div>
                        <button className='btn btn-primary' onClick={() => handleRegister()}>Register</button>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleLogin()}>
                                Already have an acount. Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;