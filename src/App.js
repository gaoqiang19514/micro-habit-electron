import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import * as taskApi from './apis/task';
import * as recordApi from './apis/record';

import './App.css';

const username = 'tomcat';

const countDown = (endTime, callback) => {
  const countdownHelper = () => {
    const currentTime = new Date().getTime();
    const secondsRemaining = Math.max(0, Math.floor((endTime - currentTime) / 1000));

    const timer = setTimeout(countdownHelper, 300);
    callback(secondsRemaining, timer);
  };

  countdownHelper();
};

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

  const syncOriginData = (name, time) => {
    const task = tasks.find((task) => task.name === name);

    if (!task) {
      throw new Error('syncOriginData()调用失败，无法匹配到远程任务');
    }

    const target = task.target;
    const now = '2023-12-15';

    recordApi
      .get({
        name,
        username,
        date: now,
      })
      .then((data) => {
        const records = data.data;
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
            // 目标时间
            target,
          });
          return;
        }

        if (len === 1) {
          recordApi.update({
            query: {
              date: now,
              name,
            },
            payload: {
              value: records[0].value + time,
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

  const onFinished = () => {
    setStatus('1');
  };

  useEffect(() => {
    taskApi.get(username).then((data) => {
      const tasks = data.data;
      setTasks(tasks);
      setNames(tasks.map((item) => item.name));
    });
  }, []);

  const isDisabled = !currentName || !currentTime;

  return (
    <div className="container">
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

