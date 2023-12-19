import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@douyinfe/semi-ui';

import * as userApi from '../../apis/user';

import styles from './index.less';

console.log('styles', styles)

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isDisabled = !username;

  const isExisted = async (username) => {
    const res = await userApi.list({ username });
    return res.data.length > 0;
  };

  const login = (username) => {
    localStorage.setItem('username', username);
    navigate('/');
  };

  const register = async (username) => {
    await userApi.add({ username });
    login(username);
  };

  const onSubmit = async () => {
    setLoading(true);
    const isExist = await isExisted(username);
    if (isExist) {
      await login(username);
    } else {
      await register(username);
    }
  };

  return (
    <div className="container">
      <div className={styles.content}>
        <h1 className="title">微习惯</h1>
        <Input
          className="input"
          value={username}
          onKeyUp={(e) => e.keyCode === 13 && onSubmit()}
          onChange={setUsername}
          placeholder="账号"
        />
        <Input
          className="input"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="密码"
        />
        <div>
          <Button
            block
            loading={loading}
            disabled={isDisabled}
            onClick={onSubmit}
          >
            登录/注册
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
