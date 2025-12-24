import {
  DataGrid,
  type GridColDef,
  type GridColumnGroupingModel,
  type GridValueFormatter,
} from "@mui/x-data-grid";
import React from "react";
import { formatNumber } from "../utils/numeric";
import type { GridColSpanFn } from "@mui/x-data-grid";
import Mp2Calculation from "../services/calculator";
import transform from "./transformToDataRows";
import { InputAdornment, Stack, TextField, Typography } from "@mui/material";

interface ContributionsTableProps {
  calculation: Mp2Calculation;
  setInterestRates: React.Dispatch<React.SetStateAction<number[]>>;
}

const ContributionsTable: React.FC<ContributionsTableProps> = (props) => {
  const { calculation } = props;
  const { columns, columnGroupingModel } = computeColumns(props);
  const transformedData = transform(calculation);

  return (
    <DataGrid
      rows={transformedData}
      columns={columns}
      getRowId={(row) => row["id"] ?? row["month"]}
      columnGroupingModel={columnGroupingModel}
      columnGroupHeaderHeight={100}
      showCellVerticalBorder
      showColumnVerticalBorder
    />
  );
};

function computeColumns(props: ContributionsTableProps): {
  columns: GridColDef[];
  columnGroupingModel: GridColumnGroupingModel;
} {
  const defaultContributionColDef: GridColDef = {
    headerName: "Contribution",
    width: 100,
    headerAlign: "right",
    align: "right",
    colSpan: ((_, row) => {
      if (row.id) {
        return 2;
      }
      return 1;
    }) as GridColSpanFn,
    valueFormatter: formatNumber as GridValueFormatter,
  } as GridColDef;

  const defaultAccumulationColDef = {
    headerName: "Accumulated",
    width: 120,
    headerAlign: "right",
    align: "right",
    valueFormatter: formatNumber as GridValueFormatter,
  } as GridColDef;

  const columns: GridColDef[] = [
    {
      field: "month",
      headerName: "Month",
      width: 150,
      valueGetter: (_, row) => {
        if (row.id !== undefined) {
          return row.label;
        }
        return row["month"];
      },
    },
    { ...defaultContributionColDef, field: "year1" },
    { ...defaultAccumulationColDef, field: "year1_acc" },
    { ...defaultContributionColDef, field: "year2" },
    { ...defaultAccumulationColDef, field: "year2_acc" },
    { ...defaultContributionColDef, field: "year3" },
    { ...defaultAccumulationColDef, field: "year3_acc" },
    { ...defaultContributionColDef, field: "year4" },
    { ...defaultAccumulationColDef, field: "year4_acc" },
    { ...defaultContributionColDef, field: "year5" },
    { ...defaultAccumulationColDef, field: "year5_acc" },
  ];

  const { calculation, setInterestRates } = props;
  const setDividendRateAtYear = (yearIndex: number) => {
    const { interestRates } = calculation;

    return (rate: number) => {
      const newRates = [...interestRates];
      newRates[yearIndex] = rate;
      setInterestRates(newRates);
    };
  };

  const renderYearColumnGroupHeader = (index: number) => (
    <YearColumnGroupHeader
      index={index}
      dividendRate={calculation.getRateForYear(index)}
      onDividendRateUpdate={setDividendRateAtYear(index)}
    />
  );

  const columnGroupingModel = [
    {
      groupId: "Year 1",
      children: [{ field: "year1" }, { field: "year1_acc" }],
      headerAlign: "center",
      renderHeaderGroup: () => renderYearColumnGroupHeader(0),
    },
    {
      groupId: "Year 2",
      children: [{ field: "year2" }, { field: "year2_acc" }],
      headerAlign: "center",
      renderHeaderGroup: () => renderYearColumnGroupHeader(1),
    },
    {
      groupId: "Year 3",
      children: [{ field: "year3" }, { field: "year3_acc" }],
      headerAlign: "center",
      renderHeaderGroup: () => renderYearColumnGroupHeader(2),
    },
    {
      groupId: "Year 4",
      children: [{ field: "year4" }, { field: "year4_acc" }],
      headerAlign: "center",
      renderHeaderGroup: () => renderYearColumnGroupHeader(3),
    },
    {
      groupId: "Year 5",
      children: [{ field: "year5" }, { field: "year5_acc" }],
      headerAlign: "center",
      renderHeaderGroup: () => renderYearColumnGroupHeader(4),
    },
  ] as GridColumnGroupingModel;
  return { columns, columnGroupingModel };
}

export default ContributionsTable;

/**
 * Private Components
 */

interface YearColumnGroupHeaderProps {
  index: number;
  dividendRate: number;
  onDividendRateUpdate: (rate: number) => void;
}

const YearColumnGroupHeader: React.FC<YearColumnGroupHeaderProps> = ({
  index,
  dividendRate,
  onDividendRateUpdate,
}) => {
  return (
    <Stack>
      <Typography>{`Year ${index + 1}`}</Typography>
      <TextField
        name={`year${index}-rate`}
        value={dividendRate}
        onChange={(e) => onDividendRateUpdate(parseFloat(e.target.value))}
        size="small"
        type="number"
        label="Dividend Rate"
        sx={{
          width: 120,
          mt: 1,
          "& input": {
            textAlign: "right",
          },
        }}
        slotProps={{
          htmlInput: {
            step: 0.1,
            min: 0,
            max: 100,
          },
          input: {
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          },
        }}
      />
    </Stack>
  );
};
