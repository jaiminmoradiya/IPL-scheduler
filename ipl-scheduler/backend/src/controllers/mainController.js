const db = require('../config/db-configuration');

const mainController = {

    getTeams: (req, res) => {
        const sql = 'SELECT id, name, full_name FROM team_details';

        db.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching teams: ' + err.message);
                return res.status(500).json({ error: 'Internal server error' });
            }

            res.status(200).json(results);
        });
    },

    getVenues: (req, res) => {
        const sql = 'SELECT * FROM venue_details';

        db.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching venues: ' + err.message);
                return res.status(500).json({ error: 'Internal server error' });
            }

            res.status(200).json(results);
        });
    },

    getMatches: (req, res) => {
        var team = req.query.team;
        var venue = req.query.venue;
        const favTeam = req.query.favTeam;

        if (favTeam !== undefined) {
            team = favTeam;
        }

        var baseQuery = `
      SELECT m.id AS match_id, t1.name AS team1_name, t2.name AS team2_name, 
             v.stadium_name AS venue_name, m.status, m.match_time
      FROM match_details AS m
      INNER JOIN team_details AS t1 ON m.team1_id = t1.id
      INNER JOIN team_details AS t2 ON m.team2_id = t2.id
      INNER JOIN venue_details AS v ON m.venue_id = v.id`;
        var teamFilter = '';
        var venueFilter = '';
        var values = [];

        if (team !== undefined) {
            teamFilter = ' WHERE (m.team1_id = ? OR m.team2_id = ?)';
            if (isNaN(team)) {
                return res.status(400).json({ error: 'Invalid team id' });
            }
            values.push(team);
            values.push(team);
        }
        if (venue !== undefined) {
            if (team === undefined) venueFilter = ' WHERE m.venue_id = ?';
            else venueFilter = ' AND m.venue_id = ?';
            if (isNaN(venue)) {
                return res.status(400).json({ error: 'Invalid venue id' });
            }
            values.push(venue);
        }

        const sql = baseQuery + teamFilter + venueFilter;

        db.query(sql, values, (err, results) => {
            if (err) {
                console.error('Error fetching matches: ' + err.message);
                return res.status(500).json({ error: 'Internal server error' });
            }

            res.status(200).json(results);
        });
    },
};

module.exports = mainController;
