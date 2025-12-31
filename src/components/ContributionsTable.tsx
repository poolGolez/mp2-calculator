import {
  DataGrid,
  type GridColDef,
  type GridColumnGroupingModel,
  type GridValueFormatter,
} from "@mui/x-data-grid";
import React from "react";
import { formatNumber } from "../utils/numeric";
import type { GridCellParams, GridColSpanFn } from "@mui/x-data-grid";
import Mp2Calculation from "../services/calculator";
import transform, { type DataRow } from "./transformToDataRows";
import { Box, lighten, Stack, Typography, useTheme } from "@mui/material";
import PercentTextField from "./PercentTextField";
import { inverseMapMonth } from "../utils/calendar";
import type { GridValueParser } from "@mui/x-data-grid";

interface ContributionsTableProps {
  calculation: Mp2Calculation;
  setContributions: React.Dispatch<React.SetStateAction<number[]>>;
  setInterestRates: React.Dispatch<React.SetStateAction<number[]>>;
}

const ContributionsTable: React.FC<ContributionsTableProps> = ({
  calculation,
  setContributions,
  setInterestRates,
}) => {
  const theme = useTheme();

  const { columns, columnGroupingModel } = computeColumns({
    calculation,
    setContributions,
    setInterestRates,
  });
  const transformedData = transform(calculation);

  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      <DataGrid
        rows={transformedData}
        columns={columns}
        getRowId={(row) => row["id"] ?? row["month"]}
        columnGroupingModel={columnGroupingModel}
        columnGroupHeaderHeight={100}
        showCellVerticalBorder
        showColumnVerticalBorder
        disableColumnMenu
        getRowHeight={(params) => (params.model.month ? 32 : "auto")}
        sx={{
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
            whiteSpace: "normal",
            wordBreak: "break-word",
            lineHeight: 1.3,
          },
          "& .contributions-cell": {
            bgcolor: lighten(theme.palette.primary.light, 0.7),
            color: theme.palette.primary.contrastText,
          },
          "& .accumulated-contributions-cell": {
            bgcolor: theme.palette.secondary.light,
            color: theme.palette.secondary.contrastText,
          },
        }}
        processRowUpdate={(newRow: DataRow, oldRow: DataRow) => {
          const editedFields = (
            Object.keys(newRow) as (keyof DataRow)[]
          ).filter((field) => newRow[field] !== oldRow[field]);

          const [editedField] = editedFields;

          let multiplier = 0;
          if (editedField === "year1") {
            multiplier = 0;
          } else if (editedField === "year2") {
            multiplier = 1;
          } else if (editedField === "year3") {
            multiplier = 2;
          } else if (editedField === "year4") {
            multiplier = 3;
          } else if (editedField === "year5") {
            multiplier = 4;
          }

          const newConts = [...calculation.contributions];
          const offset = inverseMapMonth(newRow.month as string);
          const targetIndex = 12 * multiplier + offset;
          newConts[targetIndex] = parseFloat(newRow[editedFields[0]] as string);
          setContributions(newConts);

          return newRow;
        }}
      />
    </Box>
  );
};

function computeColumns(props: ContributionsTableProps): {
  columns: GridColDef[];
  columnGroupingModel: GridColumnGroupingModel;
} {
  const defaultContributionColDef: GridColDef = {
    headerName: "Contribution",
    width: 115,
    editable: true,
    sortable: false,
    headerAlign: "right",
    headerClassName: "contributions-cell font-weight-bold font-bold",
    align: "right",
    cellClassName: (params: GridCellParams<DataRow, number>) =>
      params.row.month ? "contributions-cell" : "error.main",
    colSpan: ((_, row) => {
      if (row.id) {
        return 2;
      }
      return 1;
    }) as GridColSpanFn,
    valueParser: parseFloat as GridValueParser,
    valueFormatter: formatNumber as GridValueFormatter,
  } as GridColDef;

  const defaultAccumulationColDef = {
    headerName: "Accumulated Amount",
    width: 115,
    sortable: false,
    headerAlign: "right",
    headerClassName: "accumulated-contributions-cell",
    align: "right",
    cellClassName: (params: GridCellParams<DataRow, number>) =>
      params.row.month ? "accumulated-contributions-cell" : "error.main",
    valueFormatter: formatNumber as GridValueFormatter,
  } as GridColDef;

  const columns: GridColDef[] = [
    {
      field: "month",
      headerName: "Month",
      width: 120,
      sortable: false,
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
      <PercentTextField
        name={`year${index}-rate`}
        value={dividendRate}
        onChange={(e) => onDividendRateUpdate(parseFloat(e.target.value))}
        size="small"
        label="Dividend Rate"
        sx={{
          width: 120,
          mt: 1,
        }}
      />
    </Stack>
  );
};
