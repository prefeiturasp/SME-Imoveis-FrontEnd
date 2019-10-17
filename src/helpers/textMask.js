import { createTextMask } from "redux-form-input-masks";

export const fieldCPF = createTextMask({
  pattern: "999.999.999-99",
  allowEmpty: false,
  guide: true,
  stripMask: false
});

export const fieldCep = createTextMask({
  pattern: "99999-999",
  allowEmpty: false,
  guide: true,
  stripMask: false
});

export const fieldTel = createTextMask({
  pattern: "(99) 9999-9999",
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
