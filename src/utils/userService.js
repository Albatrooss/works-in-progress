import tokenService from './tokenService';

const BASE_URL = '/api/users/';

function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(user)
  })
    .then(res => {
      if (res.ok) return res.json();
      throw new Error('Email already taken!');
    })
    .then(({ token }) => tokenService.setToken(token))
}

async function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(creds)
  })
    .then(async res => {
      if (res.ok) return res.json();
      let err = await res.json();
      throw new Error(err.err.message)
    })
    .then(({ token }) => {
      tokenService.setToken(token);
    })
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

async function test() {
  let res = await fetch('api/classes/admin', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ admin: true })
  }).then(async res => await res.json())
  console.log(res)
  return res
}

export default {
  signup,
  getUser,
  login,
  logout,
  test
}