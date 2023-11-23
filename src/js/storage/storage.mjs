export function saveUserInfo(userInfo) {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

export function getUserInfo() {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo) : null;
}
