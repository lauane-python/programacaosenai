// criando uma classe

class Pessoa {
    // Definir os atributos - características
    constructor(nome, idade, altura, genero, cidade){
        //this nome do atributo
        this.nome = nome
        this.idade = idade
        this.altura = altura
        this.genero = genero
        this.cidade = cidade
    }

    // Definir os métodos - ações
    respirar(){
        return `O objeto ${this.nome} está respirando bem!`
    }

    falar(mensagem){
        return `O objeto ${this.nome} está falando: ${mensagem}`
    }

    andar(passos){
        return `O objeto ${this.nome} está andando: ${passos} passos para frente`
    }

}

const p1 = new Pessoa("Lauane",17,1.65,"Feminino",90,"Presidente Prudente")
const p2 = new Pessoa("Melissa",16,1.63,"Feminino",80,"Presidente Prudente")

console.log(p2.falar("A Melissa é chata"))
console.log(p2.respirar())
console.log(p1.falar("A Melissa só fala hein"))
console.log(p1.respirar())
console.log(p1.andar(40))