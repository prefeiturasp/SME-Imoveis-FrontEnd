import React, { useState, useEffect } from "react";
import { getImovelAsDict } from "services/Imovel.service";
import HTTP_STATUS from "http-status-codes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DadosCadastrante from "./components/DadosCadastrante";
import DadosImovel from "./components/DadosImovel";
import { setTextContent } from "./helper";

const Emails = () => {
  const [, setTipoEmail] = useState(null);
  const [imovel, setImovel] = useState(null);
  const [emailText, setEmailText] = useState(<div></div>)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    const tipo_email = urlParams.get("tipo_email");
    if (uuid) {
      getImovelAsDict(uuid)
        .then((response) => {
          if (response.status === HTTP_STATUS.OK) {
            setImovel(response.data);
            setTipoEmail(tipo_email);
            setEmailText(setTextContent(tipo_email, response.data));
          }
        })
        .catch(() => {
        });
    }
  }, []);

  const content = imovel ? (
    <div>
      <Header/>
      {emailText}
      <DadosCadastrante imovel={imovel}/>
      <DadosImovel imovel={imovel}/>
      <Footer/>
    </div>
  ) : (<div></div>)

  return(
    content
  );
};

export default Emails;
