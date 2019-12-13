export default class CorreiosService {
    cache = {}
    filtraEndereco(endereco) {
        return endereco.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^\w\s]+/g, " ")
            .replace(/\s+/g, " ")
            .trim()
    }
    async buscaEndereco(endereco) {
        let param = this.filtraEndereco(endereco)
        param = param.replace(/\s/g, '+')
        if (param in this.cache){
            return this.cache[param]
        }
        let response = await fetch(
            `https://viacep.com.br/ws/SP/Sao%20Paulo/${param}/json/`
        )
        const leResposta = await response.json()
        this.cache[param] = leResposta
        return leResposta
    }
    async buscaCep(endereco, precise=false) {
        let json = await this.buscaEndereco(endereco)
        if (!precise) return json[0].cep
        for (let resultado of json){
            if (resultado.logradouro.toLowerCase() === endereco.toLowerCase()){
                return resultado.cep
            }
        }
    }
    limpaCache(){
        this.cache = {}
    }
}