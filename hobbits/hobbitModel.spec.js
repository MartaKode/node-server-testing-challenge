/*
testing isert() manually:

-make sure the data is not on the table (clean tables before each test)
-insert the data
-check that the data is in the table

*/
const db = require('../data/dbConfig.js')
const Hobbits = require('./hobbitsModel')

describe('environment', () => {
    it('should be using the testing database', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })
})

describe('hobbits model', () => {

    describe('insert()', () => {
        beforeEach(async () => {
            await db('hobbits').truncate()
        })

        it('should insert hobbits into database', async () => {
           //table was cleared by the beforeEach() function 
            await Hobbits.insert({ name: 'Rosie' })
            await Hobbits.insert({ name: 'Sam' })

            const hobbits = await db('hobbits')

            expect(hobbits).toHaveLength(2)
        })
    })

    // describe('remove()', () => {
    //     beforeEach(async () => {
    //         await db('hobbits').truncate()
    //     })

    //     it('should remove hobbits from database', () => {
    //         await Hobbits.remove(4)
    //         await Hobbits.remove(3)

    //         const hobbits = await db('hobbits')

    //         expect(hobbits).toHaveLength(2)
    //     })
    // })
})