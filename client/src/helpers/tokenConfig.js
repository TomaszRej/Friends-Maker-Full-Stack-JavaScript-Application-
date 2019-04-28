// Setup config/headers and token
const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().auth.token;

  console.warn(token, 'TOKEN W TOKEN CONFIG FUNC :)  W USER ACTION')

  // Headers
  const config = {
      headers: {
          'Content-type': 'application/json'
      }
  };

  // If token, add to headers
  if (token) {
     // config.headers['x-auth-token'] = token;
      config.headers['Authorization'] = token;
  }

  return config;
}

module.exports = tokenConfig;