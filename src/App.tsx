import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Grid, Stack, TextField } from "@mui/material";

function App() {
  return (
    <Stack sx={{ height: "100vh" }}>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Grid container spacing={2}>
        <TextField
          id="starting-contribution"
          name="starting-contribution"
          label="Starting Contribution"
        />

        <TextField
          id="monthly-contribution"
          name="monthly-contribution"
          label="Monthly Contribution"
        />

        <TextField
          id="estimated-rate"
          name="estimated-rate"
          label="Estimated Rate"
        />
      </Grid>
    </Stack>
  );
}

export default App;
