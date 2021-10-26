import { createSlice } from "@reduxjs/toolkit";

// axios
import axios from "axios";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    currentPost: {
      title: "",
      content: "",
      likes: 0,
      dislikes: 0,
      publication_date: "",
      comments: [],
      current_user_interaction: null,
    },
    page: 0,
    total: 10,
    total_data_page: 10,
    total_pages: 1,
  },
  reducers: {
    setPostsList: (state, action) => {
      state.posts = action.payload.data;
      state.total_data_page = action.payload.data.length;
      state.page = action.payload.page;
      state.total = action.payload.total;
      state.total_pages = action.payload.total_pages;
    },
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
    setMorePostsList: (state, action) => {
      state.posts = Array.from(state.posts).concat(action.payload.data);
      state.total_data_page = action.payload.data.length;
      state.page = action.payload.page;
      state.total = action.payload.total;
      state.total_pages = action.payload.total_pages;
    },
    addNewPostToList: (state, action) => {
      let newPosts = state.posts;
      newPosts.unshift(action.payload);
      state.posts = newPosts;
    },
    addNewComment: (state, action) => {
      let newComments = state.currentPost.comments;
      newComments.unshift(action.payload);
      state.currentPost.comments = newComments;
    },
    updateInteractionPost: (state, action) => {
      let posts = state.posts;
      let response = action.payload;
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === response.post_id) {
          if (response.action === "like") {
            posts[i].likes = posts[i].likes + 1;
          } else {
            posts[i].dislikes = posts[i].likes + 1;
          }
        }
      }
      state.posts = posts;

      let currentPost = state.currentPost;
      if (response.action === "like") {
        currentPost.likes = parseInt(currentPost.likes) + 1;
      } else {
        currentPost.dislikes = parseInt(currentPost.likes) + 1;
      }
      state.currentPost = currentPost;
    },
  },
});

export const {
  setPostsList,
  setCurrentPost,
  setMorePostsList,
  updateInteractionPost,
  addNewPostToList,
  addNewComment,
} = postSlice.actions;

export default postSlice.reducer;

export const getPost = (id) => (dispatch) => {
  axios
    .get(`http://localhost:8080/api/posts/${id}`)
    .then((response) => {
      dispatch(setCurrentPost(response.data));
    })
    .catch((error) => console.log(error));
};

export const getPosts = () => (dispatch) => {
  axios
    .get("http://localhost:8080/api/posts/")
    .then((response) => {
      dispatch(setPostsList(response.data));
    })
    .catch((error) => console.log(error));
};

export const getMorePosts = () => (dispatch, getState) => {
  const { page } = getState().posts;
  axios
    .get(`http://localhost:8080/api/posts/?page=${page + 1}`)
    .then((response) => {
      dispatch(setMorePostsList(response.data));
    })
    .catch((error) => console.log(error));
};

export const createPost = (post) => (dispatch) => {
  axios
    .post("http://localhost:8080/api/posts/", post)
    .then((response) => {
      dispatch(addNewPostToList(response.data.body));
    })
    .catch((error) => console.log(error));
};

export const createComment = (comment) => (dispatch, getState) => {
  const { email } = getState().user.user;
  axios
    .post("http://localhost:8080/api/comments/", comment)
    .then((response) => {
      let responseData = response.data.data;
      responseData.email = email;
      console.error(responseData);
      dispatch(addNewComment(responseData));
    })
    .catch((error) => console.log(error));
};

export const updateInteraction = (interaction) => (dispatch) => {
  axios
    .post("http://localhost:8080/api/posts/interaction", interaction)
    .then((response) => {
      dispatch(updateInteractionPost(interaction));
    })
    .catch((error) => console.log(error));
};
