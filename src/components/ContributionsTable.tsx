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

interface ContributionsTableProps {
  contributions: number[];
}

const INTEREST_RATE = 7.5;

const ContributionsTable: React.FC<ContributionsTableProps> = ({
  contributions,
}) => {
  const { columns, columnGroupingModel } = computeColumns();
  const calculation = new Mp2Calculation(
    contributions,
    Array(5).fill(INTEREST_RATE)
  );

  const transformedData = transform(calculation);

  return (
    <DataGrid
      rows={transformedData}
      columns={columns}
      getRowId={(row) => row["id"] ?? row["month"]}
      columnGroupingModel={columnGroupingModel}
      showCellVerticalBorder
      showColumnVerticalBorder
    />
  );
};

function computeColumns(): {
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

  const columnGroupingModel = [
    {
      groupId: "Year 1",
      children: [{ field: "year1" }, { field: "year1_acc" }],
      headerAlign: "center",
    },
    {
      groupId: "Year 2",
      children: [{ field: "year2" }, { field: "year2_acc" }],
      headerAlign: "center",
    },
    {
      groupId: "Year 3",
      children: [{ field: "year3" }, { field: "year3_acc" }],
      headerAlign: "center",
    },
    {
      groupId: "Year 4",
      children: [{ field: "year4" }, { field: "year4_acc" }],
      headerAlign: "center",
    },
    {
      groupId: "Year 5",
      children: [{ field: "year5" }, { field: "year5_acc" }],
      headerAlign: "center",
    },
  ] as GridColumnGroupingModel;
  return { columns, columnGroupingModel };
}

export default ContributionsTable;
