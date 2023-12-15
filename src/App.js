import React, { useState } from 'react';
import classNames from 'classnames';

import './App.css';

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
  const [names, setNames] = useState(['前端', '英语']);
  const [times, setTimes] = useState([0.1, 5, 10, 15, 20, 25]);

  const syncOriginData = (name, time) => {
    console.log('name', name);
    console.log('time', time);
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

