import { useState, ChangeEvent, useRef } from "react";
import { Box, TextField, Button, useMediaQuery } from "@mui/material";
import FlexCenter from "./FlexCenter";
import { capitalizeEachWord } from "../helper/commonMethods";
import { useAppDispatch } from "../store/store";
import { setGoal as reduxSetGoal } from "../store/goalsSlice";

const AddTask = () => {
  const [goal, setGoal] = useState<string>("");
  const inputRef = useRef<HTMLLinkElement>(null);
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");

  const dispatch = useAppDispatch();

  const handleGoalChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGoal(e.target.value);
  };

  const handleGoalAdd = () => {
    if (!goal.trim()) {
      alert("Please add task!");
      setGoal("");
      if (inputRef.current !== null) {
        inputRef.current.focus();
      }
    } else {
      dispatch(reduxSetGoal(capitalizeEachWord(goal)));
      setGoal("");
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleGoalAdd();
    }
  };

  return (
    <Box width="80%">
      <FlexCenter
        padding="1rem"
        flexDirection={isNonMobileScreen ? "row" : "column"}
      >
        <TextField
          fullWidth
          id="name"
          name="goal"
          variant="filled"
          label="Add Goal"
          type="text"
          value={goal}
          onChange={(e) => handleGoalChange(e)}
          inputRef={inputRef}
          onKeyDown={handleKeyDown}
        />
        <Button
          variant="contained"
          sx={{ fontWeight: "700", margin: "1rem", padding: "1rem 2rem" }}
          onClick={handleGoalAdd}
          disabled={!goal}
        >
          Add
        </Button>
      </FlexCenter>
    </Box>
  );
};

export default AddTask;
