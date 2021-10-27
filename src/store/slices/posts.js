import { createSlice } from "@reduxjs/toolkit";
import { api } from '../../config/api';
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
      let response = action.payload;
      let newComments = state.currentPost.comments;
      newComments.unshift(response);
      state.currentPost.comments = newComments;

      let posts = state.posts;
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === response.post_id) {
          posts[i].comments_count = parseInt(posts[i].comments_count) + 1;
        }
      }
      state.posts = posts;
    },
    updateInteractionPost: (state, action) => {
      let response = action.payload;

      let posts = state.posts;
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === response.post_id) {
          if (
            posts[i].current_user_interaction === "like" &&
            response.action === "like"
          ) {
            posts[i].likes = parseInt(posts[i].likes) - 1;
            posts[i].current_user_interaction = null;
          } else if (
            posts[i].current_user_interaction === "dislike" &&
            response.action === "dislike"
          ) {
            posts[i].dislikes = parseInt(posts[i].dislikes) - 1;
            posts[i].current_user_interaction = null;
          } else if (
            posts[i].current_user_interaction === null &&
            response.action === "like"
          ) {
            posts[i].likes = parseInt(posts[i].likes) + 1;
            posts[i].current_user_interaction = response.action;
          } else if (
            posts[i].current_user_interaction === null &&
            response.action === "dislike"
          ) {
            posts[i].dislikes = parseInt(posts[i].dislikes) + 1;
            posts[i].current_user_interaction = response.action;
          } else if (
            posts[i].current_user_interaction === "like" &&
            response.action === "dislike"
          ) {
            posts[i].likes = parseInt(posts[i].likes) - 1;
            posts[i].dislikes = parseInt(posts[i].dislikes) + 1;
            posts[i].current_user_interaction = response.action;
          } else if (
            posts[i].current_user_interaction === "dislike" &&
            response.action === "like"
          ) {
            posts[i].likes = parseInt(posts[i].likes) + 1;
            posts[i].dislikes = parseInt(posts[i].dislikes) - 1;
            posts[i].current_user_interaction = response.action;
          }
        }
      }
      state.posts = posts;

      let currentPost = state.currentPost;

      if (
        currentPost.current_user_interaction === "like" &&
        response.action === "like"
      ) {
        currentPost.likes = parseInt(currentPost.likes) - 1;
        currentPost.current_user_interaction = null;
      } else if (
        currentPost.current_user_interaction === "dislike" &&
        response.action === "dislike"
      ) {
        currentPost.dislikes = parseInt(currentPost.dislikes) - 1;
        currentPost.current_user_interaction = null;
      } else if (
        currentPost.current_user_interaction === null &&
        response.action === "like"
      ) {
        currentPost.likes = parseInt(currentPost.likes) + 1;
        currentPost.current_user_interaction = response.action;
      } else if (
        currentPost.current_user_interaction === null &&
        response.action === "dislike"
      ) {
        currentPost.dislikes = parseInt(currentPost.dislikes) + 1;
        currentPost.current_user_interaction = response.action;
      } else if (
        currentPost.current_user_interaction === "like" &&
        response.action === "dislike"
      ) {
        currentPost.likes = parseInt(currentPost.likes) - 1;
        currentPost.dislikes = parseInt(currentPost.dislikes) + 1;
        currentPost.current_user_interaction = response.action;
      } else if (
        currentPost.current_user_interaction === "dislike" &&
        response.action === "like"
      ) {
        currentPost.likes = parseInt(currentPost.likes) + 1;
        currentPost.dislikes = parseInt(currentPost.dislikes) - 1;
        currentPost.current_user_interaction = response.action;
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

export const getPost = (id) => (dispatch, getState) => {
  const { id: user_id } = getState().user.user;
  axios
    .get(`${api}/posts/${id}?user_id=${user_id}`)
    .then((response) => {
      dispatch(setCurrentPost(response.data));
    })
    .catch((error) => console.log(error));
};

export const getPosts = () => (dispatch, getState) => {
  const { id: user_id } = getState().user.user;
  axios
    .get(`${api}/posts/?user_id=${user_id}`)
    .then((response) => {
      dispatch(setPostsList(response.data));
    })
    .catch((error) => console.log(error));
};

export const getMorePosts = () => (dispatch, getState) => {
  const { page } = getState().posts;
  const { id: user_id } = getState().user.user;
  axios
    .get(`${api}/posts/?page=${page + 1}&user_id=${user_id}`)
    .then((response) => {
      dispatch(setMorePostsList(response.data));
    })
    .catch((error) => console.log(error));
};

export const createPost = (post) => (dispatch) => {
  axios
    .post(`${api}/posts/`, post)
    .then((response) => {
      dispatch(addNewPostToList(response.data.body));
    })
    .catch((error) => console.log(error));
};

export const createComment = (comment) => (dispatch, getState) => {
  const { email } = getState().user.user;
  axios
    .post(`${api}/comments/`, comment)
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
    .post(`${api}/posts/interaction`, interaction)
    .then((response) => {
      dispatch(updateInteractionPost(interaction));
    })
    .catch((error) => console.log(error));
};
