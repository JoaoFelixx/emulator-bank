window.addEventListener('load', () => {
  const hasUsername = localStorage.getItem('username');

  if (!hasUsername)
    location.assign('/views/login');

});