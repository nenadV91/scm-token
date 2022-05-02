import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app/reducer";
import walletReducer from "./wallet/reducer";

export const store = configureStore({
  reducer: {
    app: appReducer,
    wallet: walletReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
