const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const db = require("./db/db-connection.js");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get("/", (req, res) => {
	res.json({ message: "Hola, from My template ExpressJS with React-Vite" });
});

// create the get request for cities in the endpoint '/api/cities'
app.get("/api/cities", async (req, res) => {
	try {
		const { rows: cities } = await db.query("SELECT * FROM locations");
		res.send(cities);
	} catch (e) {
		return res.status(400).json({ e });
	}
});

// create the POST request
app.post("/api/cities", async (req, res) => {
	try {
		const newCity = {
			cityname: req.body.cityname,
			state: req.body.state,
			iscurrentfavorite: req.body.iscurrentfavorite,
		};
		console.log([newCity.cityname, newCity.state, newCity.iscurrentfavorite]);
		const result = await db.query(
			"INSERT INTO locations(cityname, state, iscurrentfavorite) VALUES($1, $2, $3) RETURNING *",
			[newCity.cityname, newCity.state, newCity.iscurrentfavorite]
		);
		console.log(result.rows[0]);
		res.json(result.rows[0]);
	} catch (e) {
		console.log(e);
		return res.status(400).json({ e });
	}
});

//delete request for cities
app.delete("/api/city/:cityId", async (req, res) => {
	try {
		const cityId = req.params.cityId;
		await db.query("DELETE FROM locations WHERE id=$1", [cityId]);
		console.log("From the delete request-url", cityId);
		res.status(200).end();
	} catch (e) {
		console.log(e);
		return res.status(400).json({ e });
	}
});

//A put request - Update a city
app.put("/api/cities/:cityId", async (req, res) => {
	console.log(req.params);
	//This will be the id that I want to find in the DB - the city to be updated
	const cityId = req.params.cityId;
	const updatedCity = {
		id: req.body.id,
		cityname: req.body.cityname,
		state: req.body.state,
		iscurrentfavorite: req.body.iscurrentfavorite,
	};
	console.log("In the server from the url - the city id", cityId);
	console.log(
		"In the server, from the react - the city to be edited",
		updatedCity
	);
	// UPDATE city SET state = "something" WHERE id="16";
	const query = `UPDATE cities SET cityname=$1, state=$2, iscurrentfavorite=$3 WHERE id=${cityId} RETURNING *`;
	const values = [
		updatedCity.cityname,
		updatedCity.state,
		updatedCity.iscurrentfavorite,
	];
	try {
		const updated = await db.query(query, values);
		console.log(updated.rows[0]);
		res.send(updated.rows[0]);
	} catch (e) {
		console.log(e);
		return res.status(400).json({ e });
	}
});

// console.log that your server is up and running
app.listen(PORT, () => {
	console.log(`Hola, Server listening on ${PORT}`);
});
