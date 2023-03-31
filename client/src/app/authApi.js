import app from "../libs/app";

export const loginRequest = async (data) => {
  try {
    const response = await app.post("/auth/login", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerRequest = async (data) => {
  try {
    const response = await app.post("/auth/register", data);
    return response.data;
  } catch (error) {
    console.log("error en regiter");
    throw error;
  }
}

export const logoutRequest = async () => {
  try {
    const response = await app.post("/auth/logout");
    return response.data;
  } catch (error) {
    throw error;
  }
}