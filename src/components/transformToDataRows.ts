import type Mp2Calculation from "../services/calculator";
import { mapMonth } from "../utils/calendar";

interface MonthlyContributionRow {
  month: string;
  [key: string]: string | number;
}


interface AnnualSummaryRow {
  id: 'TOTAL_CONTRIBUTIONS' | 'AVERAGE_MONTHLY_BALANCE' | 'DIVIDENDS' | 'ENDING_BALANCE';
  label: string;
  [key: string]: string | number;
}

type DataRow = MonthlyContributionRow | AnnualSummaryRow;

export default function transform(calculation: Mp2Calculation): DataRow[] {

  const contributionsRow = Array.from({ length: 12 }, (_, i) => ({
    month: mapMonth(i),
  }) as MonthlyContributionRow);


  const totalContributionsRow = {
    id: 'TOTAL_CONTRIBUTIONS',
    label: `Total Contributions`,
  } as AnnualSummaryRow;

  const totalAverageMonthlyBalanceRow = {
    id: 'AVERAGE_MONTHLY_BALANCE',
    label: `Average Monthly Balance`,
  } as AnnualSummaryRow;

  const dividendsRow = {
    id: 'DIVIDENDS',
    label: `Dividends`,
  } as AnnualSummaryRow;

  const endingBalanceRow = {
    id: 'ENDING_BALANCE',
    label: `Ending Balance`,
  } as AnnualSummaryRow;


  for (let yearIndex = 0; yearIndex < calculation.numberOfYears; yearIndex++) {
    const yearContributions = calculation.getContributionsForYear(yearIndex);
    const yearAccumulations = calculation.getAccumulatedMonthlyContributionsSinceYear(yearIndex);

    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const month = mapMonth(monthIndex);
      const row = contributionsRow.find((r) => r.month === month)!;

      const contribution = yearContributions[monthIndex]
      const accumulation = yearAccumulations[monthIndex]
      row[`year${yearIndex + 1}`] = contribution;
      row[`year${yearIndex + 1}_acc`] = accumulation;
    }

    const yearKey = `year${yearIndex + 1}`;
    totalContributionsRow[yearKey] = calculation.getTotalContributionsForYear(yearIndex);
    totalAverageMonthlyBalanceRow[yearKey] = calculation.getAverageMonthlyBalanceForYear(yearIndex);
    dividendsRow[yearKey] = calculation.getDividendsForYear(yearIndex);
    endingBalanceRow[yearKey] = calculation.getEndingBalanceForYear(yearIndex);
  }

  return [
    ...contributionsRow,
    totalContributionsRow,
    totalAverageMonthlyBalanceRow,
    dividendsRow,
    endingBalanceRow,
  ];
}