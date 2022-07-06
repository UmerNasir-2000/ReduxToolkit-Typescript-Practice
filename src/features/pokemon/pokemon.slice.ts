import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Character {
  id: number;
  name: string;
  gender: string;
  status: string;
  species: string;
  image: string;
}

interface state {
  characters: Character[];
  error: string | undefined;
  status: string;
}

const initialState: state = {
  characters: [],
  error: "",
  status: "idle",
};

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(
        "https://rickandmortyapi.com/api/character"
      );
      return data;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  }
);

export const pokemonSlice = createSlice({
  name: "character",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCharacters.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.characters = action.payload;
      state.error = "";
      state.status = "finished";
    });
    builder.addCase(fetchCharacters.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = "error";
    });
  },
});

export default pokemonSlice.reducer;
