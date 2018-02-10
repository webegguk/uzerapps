import React from 'react';

export const ArrowUp = () => (
  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">
    <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path>
  </svg>
)

export const ArrowDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
  </svg>
)

export const Star = () => (
  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 23 25" width="23px" height="25px">
    <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"/>
  </svg>
)

const processResult = (result) => {
  const accounts = result.accounts;
  let resultProcessed = [];
  const users = result.users;
  Object.keys(users).forEach((userId) => {
    let user = { id: userId, ...users[userId] };
    // add the 'apps' property to users
    const userApps = accounts[user.account].apps;
    user.apps = Object.keys(userApps).map((appId) => ({ id: appId, ...userApps[appId] }));
    resultProcessed.push(user);
  });
  // sort users by name
  resultProcessed.sort((a, b) => a.name.localeCompare(b.name));
  return resultProcessed;
};


export default { processResult };