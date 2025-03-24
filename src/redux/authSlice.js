import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: JSON.parse(localStorage.getItem("po")) || [],
  users: JSON.parse(localStorage.getItem("users")) || {},
  currentUser: localStorage.getItem("liu") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      if (state.users[username] && state.users[username].password === password) {
        state.currentUser = username;
        localStorage.setItem("liu", username);
      } else {
        alert("Invalid username or password");
      }
    },

    register: (state, action) => {
      const { username, password } = action.payload;
      if (state.users[username]) {
        alert("Username already exists");
      } else {
        state.users[username] = { password, followers: [], following: [] };
        localStorage.setItem("users", JSON.stringify(state.users));
        alert("Registration successful! Please log in.");
      }
    },

    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("liu");
    },

    addPost: (state, action) => {
      state.posts.unshift(action.payload);
      localStorage.setItem("po", JSON.stringify(state.posts));
    },

    likePost: (state, action) => {
      const { postId, username } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        if (post.likers.includes(username)) {
          post.likers = post.likers.filter((user) => user !== username);
        } else {
          post.likers.push(username);
        }
        localStorage.setItem("po", JSON.stringify(state.posts));
      }
    },

    editPost: (state, action) => {
      const { postId, newContent } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        post.content = newContent;
        localStorage.setItem("po", JSON.stringify(state.posts));
      }
    },

    deletePost: (state, action) => {
      const postId = action.payload;
      state.posts = state.posts.filter((post) => post.id !== postId);
      localStorage.setItem("po", JSON.stringify(state.posts));
    },

    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        post.comments.push(comment);
        localStorage.setItem("po", JSON.stringify(state.posts));
      }
    },

    replyToComment: (state, action) => {
      const { postId, commentId, reply } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        const comment = post.comments.find((c) => c.id === commentId);
        if (comment) {
          comment.replies.push(reply);
          localStorage.setItem("po", JSON.stringify(state.posts));
        }
      }
    },
  },
});

export const {
  login,
  register,
  logout,
  addPost,
  likePost,
  editPost,
  deletePost,
  addComment,
  replyToComment,
} = authSlice.actions;
export default authSlice.reducer;
