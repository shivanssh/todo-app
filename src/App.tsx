import { Box, Button, Typography } from "@mui/material";
import AddTask from "./components/AddTask";
import FlexCenter from "./components/FlexCenter";
import ShowTask from "./components/ShowTask";
import { useAppDispatch, useAppSelector } from "./store/store";
import { deleteAllGoals } from "./store/goalsSlice";

const DELETE_WARNING_MSG =
  "Are you sure wanna delete all goals? This action is irreversible.";

function App() {
  const dispatch = useAppDispatch();
  const goals = useAppSelector((state) => state.goals);

  const handleDeleteAll = () => {
    if (confirm(`${DELETE_WARNING_MSG}`)) {
      dispatch(deleteAllGoals());
    }
  };

  if (!navigator.cookieEnabled) {
    return (
      <FlexCenter>
        <Typography>Please enable cookie to use the application</Typography>
      </FlexCenter>
    );
  }

  return (
    <section className="app">
      <Box padding="2rem 6%" max-width="100%">
        <FlexCenter sx={{ flexDirection: "column" }}>
          <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              textAlign: "center",
              color: "white",
              background: "linear-gradient(#a49e9e, #333)",
              WebkitTextFillColor: "transparent",
              WebkitBackgroundClip: "text",
            }}
          >
            Todo App
          </Typography>
          <AddTask />
          <Box width="80%" maxHeight="400px" sx={{ overflowY: "auto" }}>
            <ShowTask />
          </Box>
          {goals.length !== 0 && (
            <Box borderTop="1px solid grey" width="100%">
              <FlexCenter>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleDeleteAll}
                  sx={{
                    padding: "0.5rem",
                    margin: "1rem  ",
                  }}
                >
                  Delete All
                </Button>
              </FlexCenter>
            </Box>
          )}
        </FlexCenter>
      </Box>
    </section>
  );
}

export default App;
