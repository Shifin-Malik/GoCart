import axios from "axios";

const setupAxios = (backendUrl, onLogout) => {
  axios.defaults.baseURL = backendUrl;

  const reqInterceptor = axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  const resInterceptor = axios.interceptors.response.use(
    (response) => response,

    (error) => {
      if (
        error.response &&
        (error.response.status === 401 ||
         error.response.status === 403)
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        if (onLogout) onLogout();
      }

      return Promise.reject(error);
    }
  );

  return () => {
    axios.interceptors.request.eject(reqInterceptor);
    axios.interceptors.response.eject(resInterceptor);
  };
};

export default setupAxios;
