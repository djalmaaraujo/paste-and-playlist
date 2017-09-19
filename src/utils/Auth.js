const Auth = {
  isLogged() {
    const tokenExists = localStorage.getItem('pnp_auth_token') || false;
    const expiresTime = parseInt(localStorage.getItem('pnp_auth_token_expiration_time'), 10) || false;
    let status = false;

    if (tokenExists) {
      const now = new Date().getTime();
      status = (now > expiresTime) ? false : true;
    }

    if (!status) {
      localStorage.removeItem('pnp_auth_token');
      localStorage.removeItem('pnp_auth_token_expiration_time');
    }

    return status;
  },

  login(params) {
    localStorage.setItem('pnp_auth_token', params.access_token);
    localStorage.setItem('pnp_auth_token_expiration_time', new Date().getTime() + (parseInt(params.expires_in, 10) * 1000)); // seconds to ms
  },

  token() {
    return localStorage.getItem('pnp_auth_token');
  }
};

export default Auth;