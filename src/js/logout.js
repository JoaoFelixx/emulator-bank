document.querySelector('.logOut')
  .addEventListener('click', () => {
    localStorage.clear()

    location.assign('/views/login/')
  });