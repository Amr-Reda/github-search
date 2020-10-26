const {getRepositories} = require('../utils');

describe('getRepositories test', () => {

    test('should return array of repos in success state', async () => {
        const q = 'nodejs';
        const sort = '';

        const result = await getRepositories(q, sort);

        expect(result.length).toEqual(10)

        for (const repo of result) {
            expect(Object.keys(repo)).toEqual(['ownerUrl', 'ownerName', 'repoName', 'stars', 'forks', 'id'])
        }
    })

    test('should return array of sorted repos according to sort param', async () => {
        const q = 'nodejs';
        const sort = 'stars';

        const result = await getRepositories(q, sort);

        expect(result[0].stars).toBeGreaterThanOrEqual(result[9].stars)
    })

})