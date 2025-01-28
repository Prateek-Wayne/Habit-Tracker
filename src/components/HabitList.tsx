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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
const HabitList = () => {
  const { habits } = useHabitStore();
  return (
    <Box sx={{ flexGrow: 1 }}>
      {habits.map((habit: Habit) => {
        return (
          <Paper
            elevation={2}
            key={habit.id}
            sx={{
              margin: "10px",
              alignItems: "center",
            }}
          >
            <Grid sx={{ alignItems: "center" }}>
              <Grid size={12}>
                <Typography variant="h6">{habit.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {habit.frequency}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <Button variant="outlined">Mark Complete</Button>
                  <Button variant="outlined" color="error">
                    Remove
                  </Button>
                </Box>
              </Grid>
              {/* <Grid size={12}></Grid> */}
            </Grid>
          </Paper>
        );
      })}
    </Box>
  );
};

export default HabitList;
