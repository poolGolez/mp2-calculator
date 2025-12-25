import { Stack } from "@mui/material";
import React, {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import NumberTextField from "./NumberTextField";
import PercentTextField from "./PercentTextField";

interface ContributionsInputFormInitState {
  startingContribution: number;
  monthlyContribution: number;
  estimatedRate: number;
}

interface ContributionsInputFormProps {
  initState: ContributionsInputFormInitState;
  onUpdate: Dispatch<SetStateAction<number[]>>;
  setInterestRates: Dispatch<SetStateAction<number[]>>;
}

const ContributionsInputForm: React.FC<ContributionsInputFormProps> = ({
  initState,
  onUpdate,
  setInterestRates,
}) => {
  const [startingContribution, setStartingContribution] = useState<number>(
    initState.startingContribution
  );
  const [monthlyContribution, setMonthlyContribution] = useState<number>(
    initState.monthlyContribution
  );
  const [estimatedRates, setEstimatedRates] = useState<number>(
    initState.estimatedRate
  );

  useEffect(() => {
    onUpdate([
      startingContribution,
      ...Array(5 * 12 - 1).fill(monthlyContribution),
    ]);
  }, [startingContribution, monthlyContribution, onUpdate]);

  useEffect(() => {
    setInterestRates(Array(5).fill(estimatedRates));
  }, [estimatedRates, setInterestRates]);

  return (
    <Stack direction="row" spacing={2}>
      <NumberTextField
        id="starting-contribution"
        name="starting-contribution"
        label="Starting Contribution"
        value={startingContribution}
        onChange={(e) => setStartingContribution(parseFloat(e.target.value))}
      />
      <NumberTextField
        id="monthly-contribution"
        name="monthly-contribution"
        label="Monthly Contribution"
        value={monthlyContribution}
        onChange={(e) => setMonthlyContribution(parseFloat(e.target.value))}
      />
      <PercentTextField
        id="estimated-rate"
        name="estimated-rate"
        label="Estimated Rate"
        value={estimatedRates}
        onChange={(e) => setEstimatedRates(parseFloat(e.target.value))}
      />
    </Stack>
  );
};

export default ContributionsInputForm;
