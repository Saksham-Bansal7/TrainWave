export const BASE_URL = "http://localhost:5000/";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/users/register",
    LOGIN: "/api/users/login",
    GET_PROFILE: "/api/users/profile",
  },
  
  EXERCISE: {
    CREATE: "/api/exercises",
    GET_USER_EXERCISES: "/api/exercises",
    LEADERBOARD: "/api/exercises/leaderboard",
    DELETE: (id) => `/api/exercises/${id}`,
  },
};
 