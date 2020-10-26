const axios = require('axios');
const baseUrl = 'https://api.github.com'

/**
 * send a request to githun search endpoint and return filtered result 
 * @param {string} q 
 * @param {string} sort 
 */
const getRepositories = async(q, sort) => {
    const result = await axios.get(`${baseUrl}/search/repositories?q=${q}&page=1&per_page=10&sort=${sort}`);
    
    const repositoriesInfo = result.data.items.map(repo => {
        return {
            ownerUrl: repo.owner.url,
            ownerName: repo.owner.login,
            repoName: repo.name,
            stars: repo.stargazers_count,
            forks: repo.forks,
            id: repo.id
        }
    })
   
    return repositoriesInfo
};

module.exports = {
    getRepositories,
}