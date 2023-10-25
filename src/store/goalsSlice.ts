import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

interface Goals {
  id: string;
  goal: string;
  checked: boolean;
}

const initialState: Goals[] = [];

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    setGoal: (state, actions) => {
      return [...state, { id: uuid(), goal: actions.payload, checked: false }];
    },

    deleteGoal: (state, actions) =>
      state.filter(({ id }) => id !== actions.payload),

    updateGoal: (state, actions) => {
      return state.map((goal) =>
        goal.id === actions.payload.id
          ? {
              ...goal,
              goal: actions.payload.goal,
            }
          : goal
      );
    },

    updateCheckbox: (state, actions) =>
      state.map((goal) =>
        goal.id === actions.payload.id
          ? { ...goal, checked: !goal.checked }
          : goal
      ),
  },
});

export const { setGoal, deleteGoal, updateGoal, updateCheckbox } =
  goalsSlice.actions;

export default goalsSlice.reducer;
