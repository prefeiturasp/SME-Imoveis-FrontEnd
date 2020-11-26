import { createTextMask } from "redux-form-input-masks";
import formatString from "format-string-by-pattern";

export const fieldCPF_CNPJ = value => {
  if (value.length <= 11) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
  } else {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5");
  }
};

export const fieldCep = createTextMask({
  pattern: "99999-999",
  allowEmpty: false,
  guide: true,
  stripMask: false
});

export const fieldTel = createTextMask({
  pattern: "(99) 99999-9999",
  allowEmpty: false,
  guide: true,
  stripMask: false
});

export const fieldCel = createTextMask({
  pattern: "(99) 99999-9999",
  allowEmpty: false,
  guide: true,
  stripMask: false
});

export const telCelMask = value => {
  const cleanedValue = value.replace(/[^a-z0-9]/gi, "").replace(/\D/g, "");
  if (cleanedValue.length <= 10) {
    return formatString("(99) 9999-9999", value);
  } else {
    return formatString("(99) 9 9999-9999", value);
  }
};
