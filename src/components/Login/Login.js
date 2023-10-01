import React from 'react';
import './Login.scss'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import { loginUser } from "../../services/userService"
import { toast } from 'react-toastify';
const Login = (props) => {
    let history = useHistory();

    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        valueLogin: '',
        validValueLogin: 'form-control',
        password: '',
        validPassword: 'form-control',
    });
    const handleCreateNewAccount = () => {
        history.push('/register');
    }
    const handleBlur = (field) => {
        const newErrors = { ...errors };
        const phoneRegex = /^[0-9]{10}$/; // Mã regex cho số điện thoại 10 chữ số
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;// Mã regex cho email

        switch (field) {
            case 'valueLogin':
                if (!valueLogin) {
                    newErrors.valueLogin = "Please enter your email address or phone number";
                    newErrors.validValueLogin = 'form-control is-invalid';
                }
                else {
                    if (emailRegex.test(valueLogin) || phoneRegex.test(valueLogin)) {
                        newErrors.valueLogin = "";
                        newErrors.validValueLogin = 'form-control is-valid';
                    }
                    else {
                        newErrors.valueLogin = "Please enter a valid email or phone number (10 digits) format";
                        newErrors.validValueLogin = 'form-control is-invalid';
                    }
                }
                break;

            case 'password':
                if (!password) {
                    newErrors.password = "Please enter your password";
                    newErrors.validPassword = 'form-control is-invalid';
                }
                else {
                    newErrors.password = "";
                    newErrors.validPassword = 'form-control is-valid';
                }
                break;

            default:
                break;
        }

        setErrors(newErrors);
    }
    const isValidInputs = () => {
        let isValid = true;
        const newErrors = { ...errors };
        if (!valueLogin) {
            newErrors.valueLogin = "Please enter your email address or phone number";
            isValid = false;
        }
        else {
            newErrors.valueLogin = "";

        }
        if (!password) {
            newErrors.password = "Please enter your password";
            isValid = false;
        }
        else {
            newErrors.password = "";
        }
        setErrors(newErrors);
        return isValid;
    }
    const handleLogin = async () => {
        let check = isValidInputs();
        if (check) {
            let response = await loginUser(valueLogin, password);
            let dataService = response.data;
            if (dataService.EC == 0) {
                toast.success(dataService.EM);
                let data = {
                    isAuthenticated: true,
                    token: 'fake token'
                }
                sessionStorage.setItem("account", JSON.stringify(data));
                history.push('/users');
                window.location.reload();
            }
            else {
                toast.error(dataService.EM);
            }
        }
    }
    const handlePressEnter = (event) => {
        if (event.charCode === 13) {
            handleLogin();
        }
    }
    return (
        <div className='login-container'>
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
                        <input
                            type='text'
                            className={errors.validValueLogin}
                            placeholder='Email address or phone number'
                            value={valueLogin}
                            onChange={(event) => { setValueLogin(event.target.value) }}
                            onBlur={() => handleBlur("valueLogin")}
                        />
                        {errors.valueLogin && <div className="error">{errors.valueLogin}</div>}
                        {/* <div className="error">test</div> */}
                        <input
                            type='password'
                            className={errors.validPassword}
                            placeholder='Password'
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
                            onBlur={() => handleBlur("password")}
                            onKeyPress={(event) => handlePressEnter(event)}
                        />
                        {errors.password && <div className="error">{errors.password}</div>}
                        <button className='btn btn-primary' onClick={() => handleLogin()}>
                            Login
                        </button>
                        <span className='text-center'>
                            <a className='forgot-password' href="#">Forgot your password?</a>
                        </span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleCreateNewAccount()}>
                                Create new account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;