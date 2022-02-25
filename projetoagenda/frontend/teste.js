const instrutores = [
    {
        nome: 'Pedro',
        idade: 22,
        cidade: 'anapolis'
    },
    {
        nome: 'Lucas',
        idade: 27,
        cidade: 'Petropolis'
    },
    {
        nome: 'Matheus',
        idade: 25,
        cidade: 'anapolis'
    },
    {
        nome: 'Rodrigo',
        idade: 42,
        cidade: 'Petropolis'
    },
    {
        nome: 'Julio',
        idade: 38,
        cidade: 'anapolis'
    },
    {
        nome: 'Tiago',
        idade: 62,
        cidade: 'anapolis'
    },
    {
        nome: 'Felipe',
        idade: 37,
        cidade: 'Petropolis'
    },
    {
        nome: 'Santiago',
        idade: 36,
        cidade: 'anapolis'
    },
    {
        nome: 'Livisson',
        idade: 52,
        cidade: 'Petropolis'
    },
    {
        nome: 'Alisson',
        idade: 43,
        cidade: 'anapolis'
    }
]

const cidade = instrutores.filter( valor => valor.cidade === instrutores[instrutores.length - 1].cidade)

cidade.sort((a, b) => b.idade - a.idade)

console.log(cidade)