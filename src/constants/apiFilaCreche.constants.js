import endPoint from "./endPonts.constants";

export const API_FILACRECHE = "https://filadacreche.sme.prefeitura.sp.gov.br";

export const API_IMOVEIS_DEMANDA = `${endPoint.API_URL}/demanda`;

export default {
  maps_api_endpoint: `${API_FILACRECHE}/mapa`,
  demanda_endoint: `${API_FILACRECHE}/api/v1/schools/radius/wait`
};
