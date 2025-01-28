import { Box, Container, Typography } from '@mui/material';
import useHabitStore from './store/store';
import AddHabitForm from './components/AddHabitForm';
import HabitList from './components/HabitList';
import { useEffect } from 'react';

function App() {
  const { fetchHabits } = useHabitStore();
  useEffect(() => {
    fetchHabits();
  }, []);
  return (
    <Container>
      <Box mb={10}>
        <Typography variant='h1' component='h1' align='center' color='primary'>
          StreakKeeper
        </Typography>
        <AddHabitForm />
      </Box>
      <HabitList />
    </Container>
  );
}

export default App;
