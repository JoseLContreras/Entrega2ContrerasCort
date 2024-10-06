const setExpirationDate = (days) => {
  const now = new Date();
  const expirationDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  return expirationDate.toISOString();
};

const isExpired = (expirationDate) => {
  const now = new Date();
  return now.getTime() > expirationDate.getTime();
};

const getUserFromLocalStorage = () => {
  const userItem = localStorage.getItem('usuario');
  if (!userItem) {
    return null;
  }
  const user = JSON.parse(userItem);
  const expirationDate = new Date(user.expirationDate);
  if (isExpired(expirationDate)) {
    localStorage.removeItem('usuario');
    return null;
  }
  return user;
};

export { setExpirationDate, getUserFromLocalStorage };
