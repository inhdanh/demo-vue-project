import { makeRequest } from '.'
import { USER } from '../constants'

export const userService = {
  login
}

function login(username, password) {
  return makeRequest('/auth/login', {
    method: 'POST',
    data: {
      username,
      password
    }
  })
    .then((user) => {
      if (user.access_token) {
        localStorage.setItem(USER, JSON.stringify(user))
      }
      return user
    })
    .catch((error) => Promise.reject(error))
}
