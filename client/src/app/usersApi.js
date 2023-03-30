import app from "../libs/app";

export const getUsersRequest = async () => {
  try {
    const reponse = await app.get("/users");
    return reponse.data;
  } catch (error) {
    throw error
  }
};


export const getUserRequest = async() => {
  try {
    const response = await app.get("/user");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getUserByIdRequest = async (id) => {
  try {
    const response = await app.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}