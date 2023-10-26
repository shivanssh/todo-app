import { useState } from "react";
import { Box, List, ListItem, IconButton, Checkbox } from "@mui/material";
import { EditOutlined, DeleteOutline } from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useAppDispatch, useAppSelector } from "../store/store";
import { deleteGoal, updateCheckbox } from "../store/goalsSlice";
import EditGoal from "./EditGoal";

const ShowTask = () => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [currentId, setCurrentId] = useState("");

  const goals = useAppSelector((state) => state.goals);

  const handleEdit = (id: string) => {
    setShowModal(true);
    setCurrentId(id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteGoal(id));
  };

  const editAndDeleteButton = (id: string, checked: boolean) => (
    <FlexBetween>
      <IconButton onClick={() => handleEdit(id)}>
        <EditOutlined />
      </IconButton>
      <IconButton onClick={() => handleDelete(id)}>
        <DeleteOutline />
      </IconButton>
      <Checkbox
        checked={checked}
        onChange={() => dispatch(updateCheckbox({ id }))}
      />
    </FlexBetween>
  );

  return (
    <Box padding="0  0 0 2rem">
      {showModal && <EditGoal id={currentId} closeModal={handleCloseModal} />}
      {goals.length ? (
        <List>
          {goals.map(({ goal, id, checked }, idx) => {
            return (
              <FlexBetween key={id}>
                <FlexBetween>
                  <FlexBetween>
                    <ListItem>{idx + 1}.</ListItem>
                  </FlexBetween>
                  <FlexBetween>
                    <ListItem>{goal}</ListItem>
                  </FlexBetween>
                </FlexBetween>
                <FlexBetween>
                  <ListItem>{editAndDeleteButton(id, checked)}</ListItem>
                </FlexBetween>
              </FlexBetween>
            );
          })}
        </List>
      ) : null}
    </Box>
  );
};

export default ShowTask;
