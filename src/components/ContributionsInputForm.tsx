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
  const [monthlyContribution, setMonthlyContribution] = useState<number>(
    initState.monthlyContribution
  );
  const [estimatedRates, setEstimatedRates] = useState<number>(
    initState.estimatedRate
  );

  useEffect(() => {
    onUpdate(Array(5 * 12).fill(monthlyContribution));
  }, [monthlyContribution, onUpdate]);

  useEffect(() => {
    setInterestRates(Array(5).fill(estimatedRates));
  }, [estimatedRates, setInterestRates]);

  return (
    <Stack direction="row" spacing={2}>
      <NumberTextField
        id="monthly-contribution"
        name="monthly-contribution"
        label="Monthly Contribution"
        value={monthlyContribution}
        onChange={(e) => setMonthlyContribution(parseFloat(e.target.value))}
        slotProps={{
          htmlInput: {
            step: 500,
            min: 500,
          },
        }}
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
