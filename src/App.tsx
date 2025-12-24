import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Divider, Stack } from "@mui/material";
import ContributionsTable from "./components/ContributionsTable";
import { useState } from "react";
import ContributionsInputForm from "./components/ContributionsInputForm";
import { formatNumber } from "./utils/numeric";

function App() {
  const [contributions, setContributions] = useState<number[]>([]);

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
      <Stack
        direction="row"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <ContributionsInputForm
          initState={{
            startingContribution: 500.0,
            monthlyContribution: 500.0,
            estimatedRate: 6.5,
          }}
          onUpdate={setContributions}
        />
        <>
          <Stack spacing={2}>
            {Object.entries({
              "Total Interest Earned": `${formatNumber(
                6266.14
              )} (${formatNumber(20.89)}%)`,
              "Total Contributions": formatNumber(30000),
              "Ending Balance": formatNumber(36266.14),
            }).map(([key, value], index) => (
              <Stack direction="row" spacing={2} key={index}>
                <div>{key}</div>
                <div>{value}</div>
              </Stack>
            ))}
          </Stack>
        </>
      </Stack>
      <ContributionsTable contributions={contributions} />
    </Stack>
  );
}

export default App;
