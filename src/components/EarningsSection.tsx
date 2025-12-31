import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { formatNumber } from "../utils/numeric";
import type Mp2Calculation from "../services/calculator";

interface EarningsSectionProps {
  calculation: Mp2Calculation;
}

const EarningsSection: React.FC<EarningsSectionProps> = ({
  calculation: { totalDividends, totalContributionAmount, endingBalance },
}) => {
  const totalDividendsPercent =
    (totalDividends / totalContributionAmount) * 100;

  return (
    <Stack spacing={2} flex={1} direction="row">
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
  );
};

export default EarningsSection;
