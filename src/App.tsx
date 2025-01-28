import { Box, Container, Typography } from "@mui/material";
import { NavBar } from "./components/Navbar";
import useHabitStore from "./store/store";
import AddHabitForm from "./components/AddHabitForm";
import HabitList from "./components/HabitList";

function App() {
  return (
    <Container>
      <Box mb={10}>
        <Typography variant="h2" component="h1" align="center">
          Habbit Tracker
        </Typography>
        <AddHabitForm />
      </Box>
      <HabitList />
    </Container>
  );
}

export default App;
