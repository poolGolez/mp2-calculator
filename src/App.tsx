import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Box, Divider, Stack } from "@mui/material";
import ContributionsTable from "./components/ContributionsTable";
import { useMemo, useState } from "react";
import ContributionsInputForm from "./components/ContributionsInputForm";
import Mp2Calculation from "./services/calculator";
import EarningsSection from "./components/EarningsSection";

function App() {
  const initialInterestRate = 6.65;
  const INITIAL_INTEREST_RATES = Array(5).fill(initialInterestRate);

  const [contributions, setContributions] = useState<number[]>([]);
  const [interestRates, setInterestRates] = useState<number[]>(
    INITIAL_INTEREST_RATES
  );

  const calculation = useMemo(() => {
    return new Mp2Calculation(contributions, interestRates);
  }, [contributions, interestRates]);

  return (
    <Stack sx={{ height: "100vh", width: "100%" }} spacing={2}>
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
        <Box flex={1}>
          <ContributionsInputForm
            initState={{
              monthlyContribution: 500.0,
              estimatedRate: initialInterestRate,
            }}
            onUpdate={setContributions}
            setInterestRates={setInterestRates}
          />
        </Box>
        <Box flex={2}>
          <EarningsSection calculation={calculation} />
        </Box>
      </Stack>
      <ContributionsTable
        calculation={calculation}
        setContributions={setContributions}
        setInterestRates={setInterestRates}
      />
    </Stack>
  );
}

export default App;
