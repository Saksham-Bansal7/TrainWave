import { configureStore, createSlice } from "@reduxjs/toolkit";

// UI slice for landing page features
const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showLoginModal: false,
    showSignupModal: false,
  },
  reducers: {
    toggleLoginModal: (state) => {
      state.showLoginModal = !state.showLoginModal;
      state.showSignupModal = false; // Close signup when opening login
    },
    toggleSignupModal: (state) => {
      state.showSignupModal = !state.showSignupModal;
      state.showLoginModal = false; // Close login when opening signup
    },
    closeModals: (state) => {
      state.showLoginModal = false;
      state.showSignupModal = false;
    },
  },
});

// Export actions
export const { toggleLoginModal, toggleSignupModal, closeModals } =
  uiSlice.actions;

// Configure store
const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
});

export default store;
