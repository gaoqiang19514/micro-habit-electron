import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import * as taskApi from './apis/task';
import * as recordApi from './apis/record';

import './App.css';

/**
 * 表示特定日期格式 "YYYY-MM-DD" 的日期字符串
 * @typedef {string} DateFormat
 */

/**
 * 打卡记录
 * @typedef {object} Record
 * @property {string} _id
 * @property {string} name
 * @property {DateFormat} date
 * @property {number} value
 * @property {number} target
 * @property {string} username
 */


const countDown = (endTime, callback) => {
  const countdownHelper = () => {
    const currentTime = new Date().getTime();
    const secondsRemaining = Math.max(0, Math.floor((endTime - currentTime) / 1000));

    const timer = setTimeout(countdownHelper, 300);
    callback(secondsRemaining, timer);
  };

  countdownHelper();
};

/**
 * 获取当天的年月日
 * @param {Date} date
 * @returns {DateFormat}
 */
function formatter(date) {
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return year + '-' + month + '-' + day;
}

function App() {
  // 1 默认状态
  // 2 倒计时中
  // 3 倒计时结束
  const [status, setStatus] = useState('1');
  const [countDownSeconds, setCountDownSeconds] = useState(0);
  const [currentName, setCurrentName] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [names, setNames] = useState([]);
  const [times, setTimes] = useState([0.1, 5, 10, 15, 20, 25]);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || '';
  const isDisabled = !currentName || !currentTime;

  const syncOriginData = (name, time) => {
    const task = tasks.find((task) => task.name === name);

    if (!task) {
      throw new Error('syncOriginData()调用失败，无法匹配到远程任务');
    }

    const target = task.target;
    const now = formatter(new Date());

    recordApi
      .get({
        name,
        username,
        date: now,
      })
      .then((data) => {
        /** @type {Record[]} */
        const records = data.data;
        /** @type {number} */
        const len = records.length;

        if (len === 0) {
          recordApi.add({
            // 任务名
            name,
            // 时间
            time,
            // 用户名
            username,
            // 当天时间
            date: now,
            value: time,
            // 目标时间
            target,
          });
          return;
        }

        if (len === 1) {
          const [record] = records
          recordApi.update({
            query: {
              name,
              date: now,
              username,
            },
            payload: {
              value: record.value + time,
            },
          });
          return;
        }

        throw new Error('syncOriginData()调用失败，匹配到多条record');
      });
  };

  const onStart = () => {
    if (!currentName) {
      alert('请选择任务');
      return;
    }

    if (!currentTime) {
      alert('请选择时间');
      return;
    }

    const durationMillisecond = currentTime * 60 * 1000;
    const endTime = new Date().getTime() + durationMillisecond;

    setStatus('2');

    countDown(endTime, (seconds, timer) => {
      setCountDownSeconds(seconds);
      if (seconds <= 0) {
        setStatus('3');
        clearTimeout(timer);
        syncOriginData(currentName, currentTime);
      }
    });
  };

  const onLogout = () => {
    localStorage.removeItem('username')
    navigate('/login');
  }

  const onFinished = () => {
    setStatus('1');
  };

  useEffect(() => {
    taskApi.list(username).then((data) => {
      const tasks = data.data;
      setTasks(tasks);
      setNames(tasks.map((item) => item.name));
    });
  }, []);

  useEffect(() => {
    if (!username) {
      navigate('/login');
    }
  }, [])


  return (
    <div className="container">
      <div>
        <div>{username}</div>
        <div onClick={onLogout}>退出登录</div>
      </div>
      {status === '1' && (
        <>
          <div className="row">
            <div>任务：</div>
            <ul className="options">
              {names.map((name) => (
                <li
                  className={classNames('option', {
                    current: name === currentName,
                  })}
                  key={name}
                  onClick={() => setCurrentName(name)}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <div className="row">
            <div>时间：</div>
            <ul className="options">
              {times.map((time) => (
                <li
                  className={classNames('option', {
                    current: time === currentTime,
                  })}
                  key={time}
                  onClick={() => setCurrentTime(time)}
                >
                  {time}分钟
                </li>
              ))}
            </ul>
          </div>
          <button
            className="btn"
            disabled={isDisabled}
            onClick={onStart}
          >
            启动
          </button>
        </>
      )}
      {status === '2' && <div className="countDownValue">{countDownSeconds}</div>}
      {status === '3' && (
        <div>
          <div className="congratulation">恭喜，任务完成！</div>
          <button
            className="btn"
            onClick={onFinished}
          >
            确定
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

