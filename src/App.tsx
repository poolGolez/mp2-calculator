import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Box, Divider, Stack, Typography } from "@mui/material";
import ContributionsTable from "./components/ContributionsTable";
import { useMemo, useState } from "react";
import ContributionsInputForm from "./components/ContributionsInputForm";
import { formatNumber } from "./utils/numeric";
import Mp2Calculation from "./services/calculator";

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

  const { totalDividends, totalContributionAmount, endingBalance } =
    calculation;

  const totalDividendsPercent =
    (calculation.totalDividends / calculation.totalContributionAmount) * 100;

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
            estimatedRate: initialInterestRate,
          }}
          onUpdate={setContributions}
          setInterestRates={setInterestRates}
        />
        <Stack spacing={2} flex={1}>
          <Stack direction="row" spacing={1}>
            <Box flex={1} textAlign="left">
              Total Dividends Earned
            </Box>
            <Box flex={1} textAlign="right" fontWeight="bold">
              <Typography>
                <Typography component="span" fontWeight="bold">
                  {formatNumber(totalDividends)}
                </Typography>
                {` (${formatNumber(totalDividendsPercent)}%)`}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Box flex={1} textAlign="left">
              Total Contributions
            </Box>
            <Box flex={1} textAlign="right" fontWeight="bold">
              {formatNumber(totalContributionAmount)}
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Box flex={1} textAlign="left">
              Ending Balance (after 5 years)
            </Box>
            <Box flex={1} textAlign="right" fontWeight="bold">
              {formatNumber(endingBalance)}
            </Box>
          </Stack>
        </Stack>
      </Stack>
      <ContributionsTable calculation={calculation} />
    </Stack>
  );
}

export default App;
