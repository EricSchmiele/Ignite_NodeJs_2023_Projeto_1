import http from 'node:http'
import { json } from './middlewares/json.js'

// - Criar usuarios
// - Listagem usuarios
// - edicao de usuarios
// - remocao de usuarios

// - HTTP
//   - método HTTP
//   - URL

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deletar um recurso do back-end

// GET /users => Buscando usuários do back-end
// POST /users => Criar um usuário no back-end

// Stateful - Stateless

// Cabeçalhos (Requisição/resposta) => Metadados

// HTTP Status Code

const users = []

const server = http.createServer(async (req, res) => {
    const {method, url } = req

    await json(req, res)

    console.log(req.body)

    if (method === 'GET' && url === '/users') {
        return res.end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        const { name, email } = req.body

        users.push({
            id: 1,
            name,
            email,
        })

        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()
})

server.listen(3390)