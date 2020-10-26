const {search} = require('../controller');
const MockExpressResponse = require('mock-express-response')

describe('search endpoint test', () => {

    test('should return response with status code 200', async () => {
        const mockedRequest = {
            query: {
                q: 'nodejs',
                sort: ''
            }
        }
        const mockedResponse = new MockExpressResponse()

        const response = await search(mockedRequest, mockedResponse);
        expect(response.statusCode).toEqual(200)

    })

    test('should return response with status code 500', async () => {
        const mockedRequest = {
            query: {
                q: '',
                sort: ''
            }
        }
        const mockedResponse = new MockExpressResponse()

        const response = await search(mockedRequest, mockedResponse);
        expect(response.statusCode).toEqual(500)

    })

})