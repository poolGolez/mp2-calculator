import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Grid, Stack, TextField } from "@mui/material";
import ContributionsTable from "./components/ContributionsTable";
import { useState } from "react";

function App() {
  const form = (
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
  );

  const [contributions] = useState(
    Array(5 * 12)
      .fill(0)
      .map((_, index) => (index + 1) * 500)
  );

  return (
    <Stack sx={{ height: "100vh" }} spacing={2}>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      {form}
      <ContributionsTable contributions={contributions} />
    </Stack>
  );
}

export default App;
