import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import FlexCenter from "./FlexCenter";
import { CloseOutlined } from "@mui/icons-material";
import { updateGoal } from "../store/goalsSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

/**
 * use portals to add a modal
 * modal with save and cancel button with cross on top right
 * Event propagation should be handled
 * Esc keydown should trigger close modal call
 *
 */

type EditGoalProps = {
  id: string;
  closeModal: () => void;
};

const EditGoal = ({ closeModal, id: targetId }: EditGoalProps) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLLinkElement>(null);
  const goals = useAppSelector((state) => state.goals);
  const currentGoalObj = goals.find(({ id }) => id === targetId);

  if (!currentGoalObj) {
    console.log("Id does not match with any goal");
  }

  const { goal: currentGoal } = currentGoalObj!;

  const [updatedGoal, setUpdatedGoal] = useState(currentGoal);

  const handleGoalUpdate = () => {
    if (!updatedGoal.trim()) {
      if (inputRef.current !== null) {
        inputRef.current.focus();
      }
      return alert("Please enter your goal");
    }
    dispatch(updateGoal({ id: targetId, goal: updatedGoal }));
    closeModal();
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleGoalUpdate();
    }

    if (event.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      return document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {createPortal(
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            backdropFilter: "blur(10px)",
            position: "absolute",
            zIndex: "2",
            top: 0,
            left: 0,
            cursor: "pointer",
          }}
          onClick={() => closeModal()}
        >
          <FlexCenter
            width="50%"
            height="30%"
            padding="1rem 2rem"
            sx={{
              backgroundColor: "#fefefc",
              cursor: "default",
              flexDirection: "column",
              borderRadius: "5px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Box
              sx={{
                justifyContent: "flex-end",
                display: "flex",
                width: "100%",
                alignItems: "center",
              }}
            >
              <IconButton onClick={() => closeModal()}>
                <CloseOutlined />
              </IconButton>
            </Box>
            <Typography
              variant="h5"
              textAlign="center"
              margin="1rem"
              fontWeight="bold"
            >
              Edit Goal
            </Typography>
            <TextField
              fullWidth
              id="goal"
              name="goal"
              value={updatedGoal}
              onChange={(e) => setUpdatedGoal(e.target.value)}
              onKeyDown={handleKeyDown}
              inputRef={inputRef}
            />
            <Box
              width="100%"
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
              padding="0.5rem"
              margin="0.5rem"
            >
              <Button variant="contained" onClick={handleGoalUpdate}>
                Save
              </Button>
              <Button variant="outlined" onClick={() => closeModal()}>
                Cancel
              </Button>
            </Box>
          </FlexCenter>
        </Box>,
        document.body
      )}
    </>
  );
};

export default EditGoal;
