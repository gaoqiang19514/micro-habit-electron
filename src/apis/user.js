const BASE_URL = 'https://fc-mp-5fa4a496-0aa2-45a9-b89c-4054536ad7e7.next.bspapp.com/microHabit';

export const list = ({ username }) => {
  return fetch(`${BASE_URL}/users?username=${username}`).then((res) => res.json());
};

export const add = (payload) => {
  return fetch(`${BASE_URL}/addUser`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};
