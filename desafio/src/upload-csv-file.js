import fs from 'fs'
import { parse } from 'csv'
import fetch from 'node-fetch'


const __dirname = new URL('./leitura_tasks.csv', import.meta.url)

const processFile = async () => {
    const records = []
    const parser = fs.createReadStream(__dirname).pipe(parse({
        delimiter: ',',
        skipEmptyLines: true,
        fromLine: 2,
    }))
    for await (const record of parser) {
        records.push(record)
    }
    return records
}

(async () => {
    const records = await processFile()
    records.forEach(async (record) => {
        const [title, description] = record

        await fetch('http://localhost:3390/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
            }),
        })
    })
})()
