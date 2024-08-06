import { authUser, loginUser, fetchToken } from "@/api/userApi";
import { StaredUserType } from "@/types/type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type SigninFormTypes = {
  email: string;
  password: string;
};
type SignUpFormTypes = {
  email: string;
  password: string;
  username: string;
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async (
    { email, password, username }: SignUpFormTypes,
    { rejectWithValue }
  ) => {
    try {
      const user = await authUser({ email, password, username });
      return user;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ email, password }: SigninFormTypes, { rejectWithValue }) => {
    try {
      const user = await loginUser({ email, password });
      return user;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

export const getTokens = createAsyncThunk(
  "user/getTokens",
  async ({ email, password }: SigninFormTypes) => {
    const tokens = await fetchToken({ email, password });
    return tokens;
  }
);

type AuthStateType = {
  newUser: null | StaredUserType;
  user: null | StaredUserType;
  tokens: {
    access: string | null;
    refresh: string | null;
  };
  error: null | string;
};

const initialState: AuthStateType = {
  newUser: null,
  user: null,
  tokens: {
    access: null,
    refresh: null,
  },
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.tokens.access = null;
      state.tokens.refresh = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<StaredUserType>) => {
          state.user = action.payload;
        }
      )
      .addCase(getUser.rejected, (state, action) => {
        console.error(action.payload);
        state.error = JSON.stringify(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        console.error(action.payload);
        state.error = JSON.stringify(action.payload);
      })
      .addCase(
        getTokens.fulfilled,
        (
          state,
          action: PayloadAction<{
            access: string | null;
            refresh: string | null;
          }>
        ) => {
          state.tokens.access = action.payload.access;
          state.tokens.refresh = action.payload.refresh;
        }
      );
  },
});
export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
