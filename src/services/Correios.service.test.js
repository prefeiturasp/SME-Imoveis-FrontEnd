import fetchMock from 'fetch-mock'

import CorreiosService from './Correios.service'
import * as retornoApiCorreiosJson from './retorno.api.correios.json'

const URL_CORREIOS = 'https://viacep.com.br/ws/SP/Sao%20Paulo/Rua+Doutor+Diogo+De+Faria/json/'
const retornoApiCorreios = retornoApiCorreiosJson.default
fetchMock.get(URL_CORREIOS, retornoApiCorreios)

const cs = new CorreiosService();

async function bla() {
    let response = await fetch(
        URL_CORREIOS
    );
    return await response.json();
}

describe("test filtraEndereco", () => {
    it("remove acentos", () => {
        const frase = "ÀàÊéÍíÓõÚü";
        const retorno = "AaEeIiOoUu";
        expect(cs.filtraEndereco(frase)).toBe(retorno);
    })
    it("remove pontuação", () => {
        const frase = "  Abobrinha,maçã     abacaxi.{} ";
        const retorno = "Abobrinha maca abacaxi";
        expect(cs.filtraEndereco(frase)).toBe(retorno);
    })
})

describe("test buscaEndereco", () => {
    beforeEach(() => {
        cs.limpaCache()
        fetchMock.resetHistory()
    })
    it("funfa", async () => {
        const endereco = "Rua,Doutor Diogo De Faria,"
        const response = await cs.buscaEndereco(endereco)
        expect(response).toEqual(retornoApiCorreios)
    })
    it("usa cache", async () => {
        const endereco = "Rua,Doutor Diogo De Faria,"
        let response = await cs.buscaEndereco(endereco)
        expect(response).toEqual(retornoApiCorreios)
        response = await cs.buscaEndereco(endereco)
        expect(response).toEqual(retornoApiCorreios)
        expect(fetchMock.calls().length).toEqual(1)
    })
})

describe("test buscaCep", () => {
    beforeEach(() => {
        cs.limpaCache()
        fetchMock.resetHistory()
    })
    it("funfa", async () => {
        const endereco = "Rua Doutor Diogo De Faria"
        let cep = await cs.buscaCep(endereco)
        expect(cep).toEqual("04037-000")
    })
    it("modo preciso", async () => {
        const endereco = "Rua Doutor Diogo De Faria"
        let cep = await cs.buscaCep(endereco, true)
        expect(cep).toEqual("04037-000")
    })
})