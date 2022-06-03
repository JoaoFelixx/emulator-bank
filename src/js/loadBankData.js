if (!localStorage.getItem('saved_money')) {
  const SAVED_MONEY = 1000;

  localStorage.setItem('saved_money', SAVED_MONEY);
}