export const formataValues = (values) => {
  delete values.logs;
  delete values.anexos;
  if (!values.latitude) {
    values.latitude = -1;
  }
  if (!values.longitude) {
    values.longitude = -1;
  }
  return values;
};
