import React from 'react';
import useHabitStore, { Habit } from '../store/store';
import {
  Box,
  Button,
  Grid2 as Grid,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';

const HabitList = () => {
  const { habits, deleteHabit, updateHabit } = useHabitStore();
  const today = new Date().toISOString().split('T')[0];

  const getStreak = (habit: Habit) => {
    let streak = 0;
    const currentDate = new Date();
    while (true) {
      const dateString = currentDate.toISOString().split('T')[0];
      if (habit.completedDates.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };
  return (
    <Grid container spacing={2} justifyContent='center'>
      {habits.length === 0 ? (
        <Typography
          variant='h6'
          color='textSecondary'
          sx={{ textAlign: 'center', mt: 3 }}
        >
          No habits added yet. Start by adding a habit!
        </Typography>
      ) : (
        habits.map((habit: Habit) => {
          return (
            <Grid size={12} key={habit.id}>
              <Paper
                elevation={2}
                component={Box}
                sx={{
                  margin: '10px',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: 1,
                    }}
                  >
                    <Typography variant='h6'>{habit.name}</Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {habit.frequency}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant='outlined'
                      color={
                        habit.completedDates.includes(today)
                          ? 'success'
                          : 'primary'
                      }
                      onClick={() => updateHabit(habit.id, today)}
                    >
                      Mark Complete
                    </Button>
                    <Button
                      variant='outlined'
                      color='error'
                      onClick={() => deleteHabit(habit.id)}
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>

                {/* Streak & Progress Bar */}
                <Box sx={{ width: '100%', marginTop: 2 }}>
                  <Typography
                    variant='body2'
                    sx={{ fontWeight: 'bold', marginBottom: '8px' }}
                  >
                    Current Streak: {getStreak(habit)}{' '}
                    {getStreak(habit) === 1 ? 'day' : 'days'}
                  </Typography>
                  <LinearProgress
                    variant='determinate'
                    value={(getStreak(habit) / 30) * 100}
                    sx={{
                      height: 8,
                      borderRadius: '4px',
                      backgroundColor: '#e0e0e0',
                    }}
                  />
                </Box>
              </Paper>
            </Grid>
          );
        })
      )}
    </Grid>
  );
};

export default HabitList;
