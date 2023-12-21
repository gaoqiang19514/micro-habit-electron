import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@douyinfe/semi-ui';

import * as userApi from '@/apis/user';
import styles from './style.less';

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
    <div className={styles.container}>
      <h1 className={styles.title}>微习惯</h1>
      <Input
        className={styles.input}
        value={username}
        onKeyUp={(e) => e.keyCode === 13 && onSubmit()}
        onChange={setUsername}
        placeholder="账号"
      />
      <Input
        className={styles.input}
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="密码"
      />
      <div>
        <Button
          block
          theme="solid"
          type="primary"
          loading={loading}
          disabled={isDisabled}
          onClick={onSubmit}
        >
          登录/注册
        </Button>
      </div>
    </div>
  );
}

export default Login;
