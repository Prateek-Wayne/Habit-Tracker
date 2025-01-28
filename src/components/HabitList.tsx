import React from "react";
import useHabitStore, { Habit } from "../store/store";
import {
  Box,
  Button,
  Grid2 as Grid,
  Paper,
  styled,
  Typography,
} from "@mui/material";

const HabitList = () => {
  const { habits, deleteHabit, updateHabit } = useHabitStore();
  const today = new Date().toISOString().split("T")[0];
  return (
    <Grid container spacing={2} justifyContent="center">
      {habits.length === 0 ? (
        <Typography
          variant="h6"
          color="textSecondary"
          sx={{ textAlign: "center", mt: 3 }}
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
                  margin: "10px",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "space-between",

                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">{habit.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {habit.frequency}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    color={
                      habit.completedDates.includes(today)
                        ? "success"
                        : "primary"
                    }
                    onClick={() => {
                      updateHabit(habit.id, today);
                    }}
                  >
                    Mark Complete
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteHabit(habit.id)}
                  >
                    Remove
                  </Button>
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
