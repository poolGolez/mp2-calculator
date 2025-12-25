import { InputAdornment, TextField, type TextFieldProps } from "@mui/material";
import type React from "react";

type PercentTextFieldProps = Omit<TextFieldProps, "onChange" | "value"> & {
  value?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PercentTextField: React.FC<PercentTextFieldProps> = ({
  value,
  onChange,
  sx,
  ...props
}) => {
  return (
    <TextField
      {...props}
      type="number"
      inputMode="decimal"
      value={value}
      onChange={onChange}
      sx={[
        {
          "& input": {
            textAlign: "right",
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      slotProps={{
        htmlInput: {
          step: 0.05,
          min: 0,
          max: 100,
        },
        input: {
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        },
      }}
    />
  );
};

export default PercentTextField;
