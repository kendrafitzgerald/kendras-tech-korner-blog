
const login= document.querySelector('#show-login');
const signup = document.querySelector('#show-signup');
let showLogin = document.querySelector('#login-form');
let showSignUp = document.querySelector('#signup-form');

login.addEventListener('click', () => {
    showLogin.setAttribute('style', 'display: block');
    login.setAttribute('style','display: none');
    signup.setAttribute('style','display: none')
});

signup.addEventListener('click', () => {
    showSignUp.setAttribute('style','display: block');
    login.setAttribute('style','display: none');
    signup.setAttribute('style','display: none')
});

const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#user-name').value.trim()
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };

  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document.querySelector('#login-form').addEventListener('click', loginFormHandler);
  
  document.querySelector('#signup-form').addEventListener('click', signupFormHandler);
  