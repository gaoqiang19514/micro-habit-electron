import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as userApi from '../../apis/user';

import './index.css';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isDisabled = !username;

  const isExisted = async (username) => {
    const res = await userApi.list({ username })
    return res.data.length > 0;
  }

  const login = (username) => {
    localStorage.setItem('username', username)
    navigate('/');
  }

  const register = async (username) => {
    await userApi.add({ username })
    login(username);
  }

  const onSubmit = async () => {
    const isExist = await isExisted(username);
    if (isExist) {
      await login(username);
    } else {
      await register(username);
    }
  }

  return (
    <div className="container">
      <div className='input-box'>
        <input className='input' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='账号' />
      </div>
      <div className='input-box'>
        <input className='input' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='密码' />
      </div>
      <div><button disabled={isDisabled} className='btn' onClick={onSubmit}>登录/注册</button></div>
    </div>
  );
}

export default Login;

