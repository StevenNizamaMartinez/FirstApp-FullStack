import app from "../libs/app";

export const getPostsRequest = async () => {
  try {
    const posts = await app.get("/posts");
    return posts.data
  } catch (error) {
    throw error;
  }
};

export const getPostRequest = async () => {
  try {
    const post = await app.get("/post");
    return post.data
  } catch (error) {
    throw error;
  }
}

export const getPostByUserIdRequest = async ({queryKey}) => {

  const id = queryKey[1];
  console.log("peticion");
  try {
    const post = await app.get(`/post/${id}`);
    return post.data
  } catch (error) {
    throw error;
  }
}

export const createPostRequest = async (data) => {
  try {
    const post = await app.post("/post",data);
    return post.data
  } catch (error) {
    throw error;
  }
}

export const deletePostRequest = async (id) => {
  try {
    const post = await app.delete(`/post/${id}`);
    return post.data
  } catch (error) {
    throw error;
  }
}

export const updatePostStatusRequest = async (id) => {
  try {
    const post = await app.patch(`/post/${id}`);
    return post.data
  } catch (error) {
    throw error;
  }
}