const axios = require('axios');
const Dev = require('../model/Dev');
const parseStringAsArray = require('../util/ParseStringAsArray');

module.exports = {

    async index(req, res) {
        const devs = await Dev.find();
        return res.json(devs);
    },

    async store(req, res) {
        const {github_username, techs, latitude, longitude} = req.body;

        let dev = await Dev.findOne({ github_username });
        if (dev) {
            return res.json(dev);
        }

        const responseGithub = await axios.get(`https://api.github.com/users/${github_username}`);
        const { name = login, avatar_url, bio } = responseGithub.data;

        const techsArray = parseStringAsArray(techs);

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        };

        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
        });

        return res.json(dev);
    }
};