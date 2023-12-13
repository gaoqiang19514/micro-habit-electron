const main = () => {
  fetch('https://fc-mp-5fa4a496-0aa2-45a9-b89c-4054536ad7e7.next.bspapp.com/microHabit/get?username=tomcat').then(
    async (res) => {
      const app = document.getElementById('app');
      const data = await res.json();
      app.innerHTML = JSON.stringify(data);
    },
  );
};

window.addEventListener('DOMContentLoaded', main);
