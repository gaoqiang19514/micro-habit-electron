const BASE_URL = 'https://fc-mp-5fa4a496-0aa2-45a9-b89c-4054536ad7e7.next.bspapp.com/microHabit';

export const get = ({ username, name, date }) => {
  return fetch(`${BASE_URL}/records?username=${username}&name=${name}&date=${date}`).then((res) => res.json());
};

export const add = (payload) => {
  return fetch(`${BASE_URL}/addRecord`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const update = (payload) => {
  return fetch(`${BASE_URL}/updateRecord`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};
