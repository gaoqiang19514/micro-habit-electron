const startBtn = document.getElementById('btn');
const musicPlayer = document.getElementById('musicPlayer');

const countDown = (endTime, callback) => {
  const countdownHelper = () => {
    const currentTime = new Date().getTime();
    const secondsRemaining = Math.max(0, Math.floor((endTime - currentTime) / 1000));

    const timer = setTimeout(countdownHelper, 300);
    callback(secondsRemaining, timer);
  };

  countdownHelper();
};

const onFinished = () => {
  musicPlayer.play();
  window.electronAPI.taskFinish({
    data: 'ok',
  });
};

startBtn.addEventListener('click', () => {
  // 1. 启动倒计时
  // 2. 倒计时结束，调用add创建记录（add接口内部区分是创建还是更新）
  // 3. 显示完成视图
  // 4. 调用onFinished置顶提醒

  const minutes = 10;
  const endTime = new Date().getTime() + currentTime * 60 * 1000;

  setTimeout(() => {
    onFinished();
  }, 3000);
});

fetch('https://fc-mp-5fa4a496-0aa2-45a9-b89c-4054536ad7e7.next.bspapp.com/microHabit/get?username=tomcat').then(
  async (res) => {
    const data = await res.json();
  },
);
