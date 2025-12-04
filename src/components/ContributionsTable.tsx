import {
  DataGrid,
  type GridColDef,
  type GridValueFormatter,
} from "@mui/x-data-grid";
import React from "react";
import { formatNumber } from "../utils/numeric";

interface ContributionsTableProps {
  contributions: number[];
}

const ContributionsTable: React.FC<ContributionsTableProps> = ({
  contributions,
}) => {
  const columns = computeColumns();
  const tableData = convertToTableData(contributions);

  return (
    <DataGrid
      rows={tableData}
      columns={columns}
      getRowId={(row) => row["month"]}
    />
  );
};

function computeColumns(): GridColDef[] {
  const defaultContributionColDef: GridColDef = {
    width: 100,
    headerAlign: "right",
    align: "right",
    valueFormatter: formatNumber as GridValueFormatter,
  } as GridColDef;

  const defaultAccumulationColDef: GridColDef = {
    width: 120,
    headerAlign: "right",
    align: "right",
    valueFormatter: formatNumber as GridValueFormatter,
  } as GridColDef;

  const columns: GridColDef[] = [
    { field: "month", headerName: "Month", width: 80 },
    {
      ...defaultContributionColDef,
      field: "year1",
      headerName: "Year 1",
    },
    {
      ...defaultAccumulationColDef,
      field: "year1_acc",
      headerName: "Year 1 Acc",
    },
    {
      ...defaultContributionColDef,
      field: "year2",
      headerName: "Year 2",
    },
    {
      ...defaultAccumulationColDef,
      field: "year2_acc",
      headerName: "Year 2 Acc",
    },
    {
      ...defaultContributionColDef,
      field: "year3",
      headerName: "Year 3",
    },
    {
      ...defaultAccumulationColDef,
      field: "year3_acc",
      headerName: "Year 3 Acc",
    },
    {
      ...defaultContributionColDef,
      field: "year4",
      headerName: "Year 4",
    },
    {
      ...defaultAccumulationColDef,
      field: "year4_acc",
      headerName: "Year 4 Acc",
    },
    {
      ...defaultContributionColDef,
      field: "year5",
      headerName: "Year 5",
    },
    {
      ...defaultAccumulationColDef,
      field: "year5_acc",
      headerName: "Year 5 Acc",
    },
  ];
  return columns;
}

function convertToTableData(contributions: number[]) {
  const contributionsWithAccum = contributions.reduce(
    (result, contribution, index) => {
      const previousAccumulated = index > 0 ? result[index - 1].accumulated : 0;
      const accumulated = previousAccumulated + contribution;

      result.push({
        contribution,
        accumulated,
      });
      return result;
    },
    [] as { contribution: number; accumulated: number }[]
  );

  const dataMap = contributionsWithAccum.reduce(
    (acc, curr, index) => {
      const monthIndex = index % 12;
      const yearIndex = Math.floor(index / 12) + 1;
      const month = mapMonth(monthIndex);

      if (!acc[month]) {
        acc[month] = { month };
      }

      acc[month][`year${yearIndex}`] = curr.contribution;
      acc[month][`year${yearIndex}_acc`] = curr.accumulated;

      return acc;
    },
    {} as Record<
      string,
      {
        month: string;
        [key: string]: number | string;
      }
    >
  );

  return Object.values(dataMap);
}

function mapMonth(index: number) {
  return new Date(2000, index, 1)
    .toLocaleString("en-US", { month: "short" })
    .toUpperCase();
}

export default ContributionsTable;
