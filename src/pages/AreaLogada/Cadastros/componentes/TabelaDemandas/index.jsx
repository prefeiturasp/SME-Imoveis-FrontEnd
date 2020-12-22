import React from "react";

export const TabelaDemanadas = ({id, demanda}) => {

	return (
			<table key={id}  className="w-100">
				<thead>
					<tr>
						<td 
							className="detalhesDemanda"
							colSpan="4"
						>
							<b>
								Detalhes da Demanda
							</b>
						</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<p>
								<b>
									Berçário 1
								</b>
							</p>
							<span
								className="pt-2 pb-2 pl-5 pr-5 detalhes"
							>
								{demanda && demanda.bercario_i}
							</span>
						</td>
						<td>
							<p>
								<b>
									Berçário 2
								</b>
							</p>
							<span 
								className="pt-2 pb-2 pl-5 pr-5 detalhes"
							>
								{demanda && demanda.bercario_ii}
							</span>
						</td>
						<td>
							<p>
								<b>
									Mini Grupo 1
								</b>
							</p>
							<span 
								className="pt-2 pb-2 pl-5 pr-5 detalhes"
							>
								{demanda && demanda.mini_grupo_i}
							</span>
						</td>
						<td>
							<p>
								<b>
									Mini Grupo 2
								</b>
							</p>
							<span 
								className="pt-2 pb-2 pl-5 pr-5 detalhes">
								{demanda && demanda.mini_grupo_ii}
							</span>
						</td>
					</tr>
				</tbody>
			</table>
	);
};