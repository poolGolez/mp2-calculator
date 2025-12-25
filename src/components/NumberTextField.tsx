import { type TextFieldProps, TextField } from "@mui/material";

type NumberTextFieldProps = Omit<TextFieldProps, "onChange" | "value"> & {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const NumberTextField: React.FC<NumberTextFieldProps> = ({
  value,
  onChange,
  ...props
}) => {
  return (
    <TextField
      {...props}
      value={value}
      onChange={onChange}
      type="number"
      inputMode="decimal"
      sx={{
        "& input": {
          textAlign: "right",
        },
      }}
    />
  );
};

export default NumberTextField;
