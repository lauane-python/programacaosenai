// criando uma classe

class Caes {
    // Definir os atributos - características
    constructor(nome, idade, peso, cor, raca){
        //this nome do atributo
        this.nome = nome
        this.idade = idade
        this.altura = peso
        this.cor = cor
        this.raca = raca
    }

    // Definir os métodos - ações
    anda(passos){
        return `O objeto ${this.nome} está andando: ${passos} passos para frente`
    }

    fala(mensagem){
        return `O objeto ${this.nome} está falando: ${mensagem}`
    }

    come(comer){
        return `O objeto ${this.nome} está comendo: ${comer}`
    }

    dorme(horas){
        return `O objeto ${this.nome} está dormindo: ${horas} horas`
    }

    PegaOsso(osso){
        return `O objeto ${this.nome} está pega: ${osso} ossos`
    }

}

const p1 = new Caes("Bob",5,6,"Marrom","Dogue Alemão")
const p2 = new Caes("Rex",8,5,"Caramelo","Pastor alemão")
const p3 = new Caes("Scooby",3,4,"Castanho","Luluda Pumerânia")
const p4 = new Caes("Orelha",9,3,"Mesclado","SRD")

console.log(p1.anda(40))
console.log(p1.fala("Auauauau"))
console.log(p1.come("Ração"))
console.log(p1.dorme("2"))
console.log(p1.PegaOsso(7))

console.log(p2.anda(40))
console.log(p2.fala("Auauauau"))
console.log(p2.come("Ração"))
console.log(p2.dorme("2"))
console.log(p2.PegaOsso(7))

console.log(p3.anda(40))
console.log(p3.fala("Auauauau"))
console.log(p3.come("Ração"))
console.log(p3.dorme("2"))
console.log(p3.PegaOsso(7))

console.log(p4.anda(40))
console.log(p4.fala("Auauauau"))
console.log(p4.come("Ração"))
console.log(p4.dorme("2"))
console.log(p4.PegaOsso(7))
