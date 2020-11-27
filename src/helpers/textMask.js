import { createTextMask } from "redux-form-input-masks";
import formatString from "format-string-by-pattern";

export const fieldCPF_CNPJ = value => {
  const cleanedValue = value.replace(/[^a-z0-9]/gi, "").replace(/\D/g, "");
  if (cleanedValue.length <= 11) {
    return formatString("999.999.999-99", value);
  } else {
    return formatString("99.999.999/9999-99", value);
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
