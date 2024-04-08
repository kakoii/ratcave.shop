import { validateEmail } from './email-validator.js'

export const sendSubscribe = (emailInput) => {
  const isValidEmail = validateEmail(emailInput)
  if (isValidEmail === true) {
    sendData(emailInput)
  }
}

export const sendHttpRequest = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: data
      ? {
          'Content-Type': 'application/json'
        }
      : {}
  }).then(response => {
    if (response.status >= 400) {
      return response.json().then(errResData => {
        const error = new Error('Something went wrong!')
        error.data = errResData
        throw error
      })
    }
    return response.json()
  })
}

const sendData = (emailInput) => {
  sendHttpRequest('POST', '/subscribe', {
    email: emailInput
  }).then(responseData => {
    return responseData
  }).catch(err => {
    console.log(err, err.data)
    window.alert(err.data.error)
  })
}