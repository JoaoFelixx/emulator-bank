window.addEventListener('submit', (event) => {
  event.preventDefault();

  const form = document.forms.login;

  const { email, passowrd } = form;

  console.log(email, passowrd);
})