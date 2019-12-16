export default class CorreiosService {
    cache = {}
    filtraEndereco(endereco) {
        // Remove acentos...
        return endereco.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
            // ... pontuação ...
            .replace(/[^\w\s]+/g, " ")
            // ... e espaços extras
            .replace(/\s+/g, " ")
            .trim()
    }
    async obtemDadosApi(logradouro) {
        let param = this.filtraEndereco(logradouro)
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
    async buscaInfo(logradouro, numero=undefined) {
        const dadosApi = await this.obtemDadosApi(logradouro)
        if (dadosApi.length == 1 || numero === undefined) {
            return dadosApi[0]
        }
        const resultadosNumerosFixos = [], resultadosFaixa = [];
        for (let resultado of dadosApi){
            if (/^\d+$/.exec(resultado.complemento)){
                resultadosNumerosFixos.push(resultado)
            }
            else{
                resultadosFaixa.push(resultado)
            }
        }
        for (let resultado of resultadosNumerosFixos.concat(resultadosFaixa)){
            if (this.numeroEstaNoComplemento(numero, resultado.complemento))
                return resultado;
        }
    }
    async buscaCep(logradouro, numero=undefined) {
        const info = await this.buscaInfo(logradouro, numero)
        return info.cep
    }
    filtraNumeroDoComplemento(numeroDoComplemento) {
        let execResp = /(\d+)\/(\d+)/.exec(numeroDoComplemento)
        if (execResp){
            return [parseInt(execResp[1]), parseInt(execResp[2])]
        }
        else {
            return [parseInt(numeroDoComplemento)]
        }
    }
    filtraComplementoFaixa(complemento) {
        if (complemento === ""){
            return [0, Infinity]
        }
        let execResp = /^até (.+)$/.exec(complemento)
        if (execResp) {
            const filtrado = this.filtraNumeroDoComplemento(execResp[1])
            return [0, Math.max(...filtrado)]
        }
        execResp = /^de (.+) a (.+)$/.exec(complemento)
        if (execResp) {
            const filtradoMenor = this.filtraNumeroDoComplemento(execResp[1])
            const filtradoMaior = this.filtraNumeroDoComplemento(execResp[2])
            return [Math.min(...filtradoMenor), Math.max(...filtradoMaior)]
        }
        execResp = /^de (.+) ao fim$/.exec(complemento)
        if (execResp) {
            const filtrado = this.filtraNumeroDoComplemento(execResp[1])
            return [Math.min(...filtrado), Infinity]
        }
    }
    filtraFaixa(textoFaixa) {
        let faixa, parOuImpar;
        let execResp = /^lado (par|ímpar)$/.exec(textoFaixa)
        if (execResp) {
            return { faixa, parOuImpar: execResp[1] }
        }
        execResp = /^(.+)( - lado (par|ímpar))$/.exec(textoFaixa)
        if (execResp) {
            faixa = execResp[1]
            parOuImpar = execResp[3]
        }
        else {
            const ehFaixa = /^(de|até) \d+(\/\d+)?( (a \d+(\/\d+)?|ao fim))?$/.exec(textoFaixa)
            if (ehFaixa) {
                faixa = textoFaixa
            }
            else {
                throw "Faixa inválida: " + textoFaixa
            }
        }
        return { faixa, parOuImpar }
    }
    numeroEstaNoComplemento(numero, complemento) {
        let execResp = /^\d+$/.exec(complemento);
        if (execResp) {
            return parseInt(execResp[0]) == numero
        }
        const complementoFiltrado = this.filtraFaixa(complemento)
        if (complementoFiltrado.faixa) {
            const faixa = this.filtraComplementoFaixa(complementoFiltrado.faixa)
            const estaNaFaixa = this.numeroEstaNaFaixa(numero, faixa)
            if (!estaNaFaixa) return false
        }
        switch (complementoFiltrado.parOuImpar){
            case undefined:
                return true
            case "par":
                return (numero % 2) === 0
            case "ímpar":
                return (numero % 2) === 1
            default:
                throw new Error("Valor inválido para parOuImpar: " + complementoFiltrado.parOuImpar)
        }
    }
    numeroEstaNaFaixa(numero, faixa){
        return numero >= faixa[0] && numero <= faixa[1]
    }
    limpaCache(){
        this.cache = {}
    }
}