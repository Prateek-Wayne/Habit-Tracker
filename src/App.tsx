import { Box, Container, Typography } from "@mui/material";
import { NavBar } from "./components/Navbar";
import useHabitStore from "./store/store";
import AddHabitForm from "./components/AddHabitForm";

function App() {
  const store = useHabitStore();
  console.log(store);
  return (
    <Container>
      <Box>
        <Typography variant="h2" component="h1" align="center">
          Habbit Tracker
        </Typography>
        <AddHabitForm />
      </Box>
    </Container>
  );
}

export default App;
