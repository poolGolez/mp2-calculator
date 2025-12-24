import { InputAdornment, Stack, TextField } from "@mui/material";
import React, {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

interface ContributionsInputFormInitState {
  startingContribution: number;
  monthlyContribution: number;
  estimatedRate: number;
}

interface ContributionsInputFormProps {
  initState: ContributionsInputFormInitState;
  onUpdate: Dispatch<SetStateAction<number[]>>;
}

const ContributionsInputForm: React.FC<ContributionsInputFormProps> = ({
  initState,
  onUpdate,
}) => {
  const [startingContribution, setStartingContribution] = useState<number>(
    initState.startingContribution
  );
  const [monthlyContribution, setMonthlyContribution] = useState<number>(
    initState.monthlyContribution
  );
  const [estimatedRate, setEstimatedRate] = useState<number>(
    initState.estimatedRate
  );

  useEffect(() => {
    onUpdate([
      startingContribution,
      ...Array(5 * 12 - 1).fill(monthlyContribution),
    ]);
  }, [startingContribution, monthlyContribution, onUpdate]);

  return (
    <Stack direction="row" spacing={2}>
      <TextField
        id="starting-contribution"
        name="starting-contribution"
        label="Starting Contribution"
        type="number"
        value={startingContribution}
        onChange={(e) => setStartingContribution(parseFloat(e.target.value))}
      />
      <TextField
        id="monthly-contribution"
        name="monthly-contribution"
        label="Monthly Contribution"
        type="number"
        value={monthlyContribution}
        onChange={(e) => setMonthlyContribution(parseFloat(e.target.value))}
      />
      <TextField
        id="estimated-rate"
        name="estimated-rate"
        label="Estimated Rate"
        type="number"
        value={estimatedRate}
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          },
        }}
        onChange={(e) => setEstimatedRate(parseFloat(e.target.value))}
      />
    </Stack>
  );
};

export default ContributionsInputForm;
