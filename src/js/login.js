window.addEventListener('submit', (event) => {
  event.preventDefault();

  const form = document.forms.login;

  const { name } = form;

  localStorage.setItem('username', name.value);

  window.location.assign('/');
})