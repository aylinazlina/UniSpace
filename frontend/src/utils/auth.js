import jwt_decode from "jwt-decode";

export const getCurrentUser = () => {
  const token = localStorage.getItem("access");
  try {
    return token ? jwt_decode(token) : null;
  } catch (error) {
    return null;
  }
};
