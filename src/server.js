//CommomJS => require ex.: const http = require('http')
// ESModules => import/export ex.: import http from 'http'
// colocar node: quando for modulo interno
import http from 'node:http'
import { url } from 'node:inspector';


//  HTTP - Duas coisas são precisas para fazer a requisição a uma API
//  - Método HTTP para fazer a requisição
//  - URL para acessar a rota

//Existem 5 métodos HTTP: GET, POST, PUT, PATCH, DELETE
    // GET    => Buscar uma informação do back-end
    // POST   => Criar uma informação
    // PUT    => Atualizar um recurso no back-end
    // PATCH  => Atualizar uma informação especifica de um recurso do back-end
    // DELETE => Deletar um recurso do back-end

    // Método + url
    // GET/users => Buscando usuários do back-end
    // POST/users => Criar um usuário no back-end


// Stateful é quando os arquivos estão armazenados na memória
// Stateless é quando deixamos os arquivos em um banco de dados


// Cabeçalhos (Requisição/Resposta) => Metadados


const users = [];

const server = http.createServer( (req, res) => {
    // Essa forma é a mesma coisa que usar a desestruturação na linha abaixo
    // const method = req.method;

    const { method, url } = req;

    if (method === 'GET' && url === '/users'){
        return res
        .setHeader('Content-type', 'application/json')
        .end('Listagem de usuários:\n' + JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users'){
        users.push({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
        })

        return res.end('Criação de usuário')
    }
 
    return res.end('Hello World')
})

// endereço para rodar no localhost
server.listen(3333);

