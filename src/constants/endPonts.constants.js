/* eslint-disable */
let API_URL = process.env.REACT_APP_API_URL;
let JWT_AUTH = `${API_URL}/api-token-auth/`;

if (process.env.NODE_ENV === "production") {
  // This way we can pass params to static files. see Dockerfile.
  // when build default env is production
  API_URL = "API_URL_REPLACE_ME";
  JWT_AUTH = "API_URL_REPLACE_ME/api-token-auth/";
}

module.exports = {
  API_URL: API_URL,
  JWT_AUTH: JWT_AUTH,
  IMOVEIS: "cadastro-imovel"
};
