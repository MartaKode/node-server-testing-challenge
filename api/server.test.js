const supertest = require('supertest')

const server = require('./server.js')

const db = require('../data/dbConfig')

describe('server', function () {
    it('runs the test', function () {
        expect(true).toBe(true)
    })

    describe('GET /', () => {
        it('should respond with 200 OK', () => {
            return supertest(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('should respond with JSON', () => {
            return supertest(server)
                .get('/')
                .then(res => {
                    expect(res.type).toMatch(/json/i)
                })
        })

        it('should respond with api: "up"', () => {
            return supertest(server)
                .get('/')
                .then(res => {
                    expect(res.body.api).toBe('up')
                })
        })
    })

//```````````````GET``````````````````````````
//get hobbits
    describe('GET /hobbits', () => {

        it('should respond with status 200 OK', () => {
            return supertest(server)
            .get('/hobbits')
            .then( res => {
                expect(res.status).toBe(200)
            })
        })

        it('should respond with array of hobbits', () => {
            return supertest(server)
            .get('/hobbits')
            .then(res => {
                expect(res.body).toHaveLength(2)
            })
        })

        it('should respond with JSON', () => {
            return supertest(server)
                .get('/hobbits')
                .then(res => {
                    expect(res.type).toMatch(/json/i)
                })
        })

    })

//get by id
describe('GET /hobbits/:id', () => {
    beforeEach(async () => {
        await db('hobbits').truncate()
        await db('hobbits').insert({name: 'Marta'})
    })

    it('should respond with status 200 OK after finding a hobit', () => {
        return supertest(server)
        .get('/hobbits/1')
        .then( res => {
            expect(res.status).toBe(200)
        })
    })

    it('should find 1 hobbit as an object', () => {
        return supertest(server)
        .get('/hobbits/1')
        .then(res => {
            expect(res.body.name).toBe('Marta')
        })
    })

    it('should respond with JSON', () => {
        return supertest(server)
            .get('/hobbits/1')
            .then(res => {
                expect(res.type).toMatch(/json/i)
            })
    })

})

//````````````````POST`````````````````````
    describe('POST /hobbits', () => {
        beforeEach(async () => {
            await db('hobbits').truncate()
            await db('hobbits').insert({name: 'Marta'})
        })

        it('should respond with status 201', () => {
            return supertest(server)
            .post('/hobbits')
            .send({name: 'Marta'})
            .then( res => {
                expect(res.status).toBe(201)
            })
        })

        it('should return the new hobbit', () => {
            return supertest(server)
            .post('/hobbits')
            .send({name: 'Marta'})
            .then(res => {
                expect(res.body.name).toBe('Marta')
            })
        })

        it('should insert a new hobbit', () => {
            return supertest(server)
            .post('/hobbits')
            .send({name: 'Marcia'})
            .then(res => {
                return supertest(server)
                .post('/hobbits')
                .send({name: 'Marta'})
                .then(res => {
                return supertest(server)
                .get('/hobbits')
                .then( res => {
                    expect(res.body).toHaveLength(3)
                })
            })
            })
        })
    })

//``````````````DELETE``````````````````````
    describe('DELETE /hobbits/:id', () => {
        beforeEach(async () => {
            await db('hobbits').truncate()
            await db('hobbits').insert({name: 'Marta'})
            await db('hobbits').insert({name: 'Frania'})
        })


        it('should respond with status 200 OK after deleting', () => {
            return supertest(server)
            .delete('/hobbits/1')
            .then( res => {
                expect(res.status).toBe(200)
            })
        })

        it('should respond with matching ids', () => {
            return supertest(server)
            .delete('/hobbits/1')
            .then( res => {
                expect(res.body.id).toBe(1)
            })
        })

        it('should respond with status 404 NOT FOUND after trying to delete not existing id', () => {
            return supertest(server)
            .delete('/hobbits/4')
            .then( res => {
                expect(res.status).toBe(404)
            })
        })

        it('should delete a hobbit from the database', () => {
            return supertest(server)
            .delete('/hobbits/2')
            .then( res => {
                return supertest(server)
                .get('/hobbits')
                .then( res => {
                    expect(res.body).toHaveLength(1)
                })
            })
          
        })

    })

//```````````````PUT````````````````````
    describe('PUT /hobbits/:id', () => {
        beforeEach(async () => {
            await db('hobbits').truncate()
            await db('hobbits').insert({name: 'Marta'})
            await db('hobbits').insert({name: 'Frania'})
        })

        it('should respond with status 200 OK on successful update', () => {
            return supertest(server)
            .put('/hobbits/1')
            .send({name: 'Marcia'})
            .then(res => {
                expect(res.status).toBe(200)
            })
        })

        it('should respond with updated object', () => {
            return supertest(server)
            .put('/hobbits/1')
            .send({name: 'Marcia'})
            .then(res => {
                expect(res.body.name).toBe('Marcia')
            })
        })

        it('should respond with status 404 NOT FOUND after trying to update not existing id', () => {
            return supertest(server)
            .put('/hobbits/4')
            .then( res => {
                expect(res.status).toBe(404)
            })
        })

    })
    
})


