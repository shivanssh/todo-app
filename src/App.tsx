import { Box, Typography } from "@mui/material";
import AddTask from "./components/AddTask";
import FlexCenter from "./components/FlexCenter";
import ShowTask from "./components/ShowTask";

function App() {
  return (
    <section className="app">
      <Box padding="4rem 6%" width="80%">
        <FlexCenter sx={{ flexDirection: "column" }}>
          <Typography
            variant="h5"
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Todo App
          </Typography>
          <AddTask />
          <Box width="80%">
            <ShowTask />
          </Box>
        </FlexCenter>
      </Box>
    </section>
  );
}

export default App;
