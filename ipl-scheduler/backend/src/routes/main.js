const express = require('express');
const mainController = require('../controllers/mainController');

const routes = express.Router();

// Define routes for teams, venues, and matches
routes.get('/teams', mainController.getTeams);
routes.get('/venues', mainController.getVenues);
routes.get('/matches', mainController.getMatches);

module.exports = routes;
