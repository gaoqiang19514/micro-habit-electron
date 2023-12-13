const startBtn = document.getElementById('btn');
const musicPlayer = document.getElementById('musicPlayer');

const onFinished = () => {
  musicPlayer.play();
  window.electronAPI.taskFinish({
    data: 'ok',
  });
};

startBtn.addEventListener('click', () => {
  setTimeout(() => {
    onFinished();
  }, 3000);
});

fetch('https://fc-mp-5fa4a496-0aa2-45a9-b89c-4054536ad7e7.next.bspapp.com/microHabit/get?username=tomcat').then(
  async (res) => {
    const data = await res.json();
  },
);
