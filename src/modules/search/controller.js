const {getRepositories} = require('./utils');

const search = async (req, res) => {
    try {
        const {q, sort} = req.query;
        const results = await getRepositories(q, sort)
        return res.status(200).json(results)
    } catch (error) {
        return res.status(500).json({
            msg: 'Internal server error'
        })
    }
}

module.exports = {
    search
}