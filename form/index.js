const loginInput = document.getElementById('login');
const passwordInput = document.getElementById('password');
const sendBtn = document.getElementById('send');

sendBtn.addEventListener('click', () => {
  const login = loginInput.value;
  const password = passwordInput.value;

  const spinner = document.getElementsByClassName('wait')[0];

  spinner.style.display = 'flex';
  fetch(`http://localhost:3000/signup/${login}/${password}`).then(({ status }) => {
    spinner.style.display = 'none';

    if (status !== 200) {
      console.error('Error');
    }
  });
});
