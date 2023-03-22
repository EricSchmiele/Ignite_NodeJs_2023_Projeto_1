import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query

            const tasks = database.select('tasks', {
                title: search,
                description: search,
            })

            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body

            if (!title || !description) {
                return res.writeHead(400).end(JSON.stringify({message:'Present a valid title and a valid description!'}))
            }

            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date(),
                updated_at: new Date(),
            }

            console.log(task)

            database.insert('tasks', task)

            return res.writeHead(201).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params

            if (!database.getById('tasks', id)) {
                return res.writeHead(404).end(JSON.stringify({message: 'Task with given id not found'}))
            }

            database.delete('tasks', id)

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const { title, description } = req.body

            if (!title || !description) {
                return res.writeHead(400).end(JSON.stringify({message:'Present a valid title and a valid description!'}))
            }

            if (!database.getById('tasks', id)) {
                return res.writeHead(404).end(JSON.stringify({message: 'Task with given id not found'}))
            }

            database.update('tasks', id, {
                title,
                description,
                updated_at: new Date(),
            })

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params

            if (!database.getById('tasks', id)) {
                return res.writeHead(404).end(JSON.stringify({message: 'Task with given id not found'}))
            }
            
            database.update('tasks', id, {
                completed_at: new Date(),
                updated_at: new Date(),
            })

            return res.writeHead(204).end()
        }
    }
]