import React, { useState } from "react";
import "./styles.scss";
import BaseHome from "components/BaseHome";
import { Card } from "primereact/card";
import { Field, Form } from "react-final-form";
import { InputText } from "components/Input/InputText";
import Spin from "antd/es/spin";
import { BUTTON_STYLE, BUTTON_TYPE } from "components/Botao/constants";
import Botao from "components/Botao";
import { numeroProtocolo } from "helpers/textMask";
import { toastError } from "components/Toast/dialogs";
import { getImovel } from "services/Imovel.service";
import HTTP_STATUS from "http-status-codes";
import { TextArea } from "components/TextArea/TextArea";

const ConsultaImovel = () => {

	const [imovel, setImovel] = useState(false);
	const [erro, setErro] = useState(false);

	const onSubmit = async (values) => {
		if (values.numero_protocolo && values.numero_protocolo.length === 6) {
			const uuid = values.numero_protocolo.split("/")[0]
			getImovel(uuid)
      .then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setImovel(response.data);
        }
      })
      .catch(() => {
        toastError("Cadastro não encontrado");
      });
		} else {
			toastError("O número do protocolo deve conter 5 dígitos")
		}
	};

	const buscarNovamente = async () => {
		setImovel(false);
	};

	return(
		<BaseHome>
			<section id="consulta-imovel">
				<div className="container">
					<div className="row">
						<div className="col-12 p-4">
							<h4 className="cor-azul">
								Acompanhamento de Protocolo
							</h4>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<Card className="card-imovel">
								<Form onSubmit={onSubmit}>
									{({ handleSubmit, form, submitting, values }) => (
										<Spin spinning={submitting}>
											<form onSubmit={handleSubmit}>
												{imovel ? (
													<div>
														<div className="row">
															<div className="col-4">
																<Field
																	component={InputText}
																	label={<b>Nº do protocolo</b>}
																	name={"nmr_protocolo"}
																	defaultValue={imovel.protocolo}
																	disabled={true}
																/>
															</div>
															<div className="col-8"></div>
														</div>
														<div className="row imovel-content">
															<div className="col-4">
																<Field
																	component={InputText}
																	defaultValue={imovel.status}
																	name={"status"}
																	label={<b>Status Atual</b>}
																	disabled={true}
																/>
															</div>
															<div className="col-8"></div>
															<div className="col-12 mt-4">
																<p className="cor-azul">Dados do Imóvel</p>
															</div>
															<div className="col-8">
																<Field
																	component={InputText}
																	defaultValue={imovel.endereco}
																	name={"endereco"}
																	label={<b>Endereço</b>}
																	disabled={true}
																/>
															</div>
															<div className="col-4">
																<Field
																	component={InputText}
																	defaultValue={imovel.numero}
																	name={"numero"}
																	label={<b>Número</b>}
																	disabled={true}
																/>
															</div>
															<div className="col-6">
																<Field
																	component={InputText}
																	defaultValue={imovel.complemento}
																	name={"complemento"}
																	label={<b>Complemento</b>}
																	disabled={true}
																/>
															</div>
															<div className="col-3">
																<Field
																	component={InputText}
																	defaultValue={imovel.bairro}
																	name={"bairro"}
																	label={<b>Bairro</b>}
																	disabled={true}
																/>
															</div>
															<div className="col-3">
																<Field
																	component={InputText}
																	defaultValue={imovel.cep}
																	name={"cep"}
																	label={<b>CEP</b>}
																	disabled={true}
																/>
															</div>
															<div className="col-6">
																<Field
																	component={InputText}
																	defaultValue={imovel.cidade}
																	name={"cidade"}
																	label={<b>Cidade</b>}
																	disabled={true}
																/>
															</div>
															<div className="col-3">
																<Field
																	component={InputText}
																	defaultValue={imovel.uf}
																	name={"estado"}
																	label={<b>Estado</b>}
																	disabled={true}
																/>
															</div>
															<div className="col-3">
																<Field
																	component={InputText}
																	defaultValue={imovel.area_construida}
																	name={"area_construida"}
																	label={<b>Área Construída em m²</b>}
																	disabled={true}
																/>
															</div>
															<div className="col-4">
																<Field
																	component={InputText}
																	defaultValue={imovel.iptu}
																	name="iptu"
																	label={<b>IPTU</b>}
																	disabled={true}
																/>
															</div>
															<div className="col-8 mt-5">
																<input
																	component='input'
																	className="naoPossuiIPTU"
																	name="nao_possui_iptu"
																	type="checkbox"
																	checked={imovel.nao_possui_iptu}
																/>
																<label className="ml-2"><b>Este imóvel não possui IPTU</b></label>
															</div>
															<div className="col-12  mb-4">
																<Field
																	component={TextArea}
																	defaultValue={imovel.observacoes}
																	name={"observacoes"}
																	label={<b>Observações</b>}
																	style={{minHeight: "100px", height: "100px", maxHeight: '100px'}}
																	disabled={true}
																/>
															</div>
															<div className="col-6">
																<Field
																	component={InputText}
																	defaultValue={imovel.setor.dre.nome}
																	name={"dre"}
																	label={<b>DRE</b>}
																	disabled={true}
																/>
															</div>
															<div className="col-3">
																<Field
																	component={InputText}
																	defaultValue={imovel.setor.distrito.nome}
																	name={"distrito"}
																	label={<b>Distrito</b>}
																	disabled={true}
																/>
															</div>
															<div className="col-3">
																<Field
																	component={InputText}
																	defaultValue={imovel.setor.codigo}
																	name={"setor"}
																	label={<b>Setor</b>}
																	disabled={true}
																/>
															</div>
															<div className="col-9"></div>
															<div className="col-3">
																<Botao
																	type={BUTTON_TYPE.BUTTON}
																	style={BUTTON_STYLE.BLUE}
																	className="col-12  mt-3"
																	texto="Nova Busca"
																	onClick={() => buscarNovamente()}
																/>
															</div>
														</div>
													</div>
												) : (
													<div className="row">
														<div className="col-4">
															<Field
																customChange={numeroProtocolo}
																component={InputText}
																label={<b>Número do Protocolo</b>}
																placeholder={'Nº do Protocolo'}
																name="numero_protocolo"
															/>
														</div>
														<div className="col-8 botao-buscar">
															<Botao
																type={BUTTON_TYPE.SUBMIT}
																style={BUTTON_STYLE.BLUE}
																className="col-2"
																texto="Buscar"
															/>
														</div>
													</div>
												)}
											</form>
										</Spin>
									)}
								</Form>
							</Card>
						</div>
					</div>
				</div>
			</section>
		</BaseHome>
	);
}

export default ConsultaImovel;
