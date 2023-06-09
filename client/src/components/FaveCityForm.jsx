import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const FaveCityForm = ({ onSaveCity, editingCity, onUpdateCity }) => {
	// This is the original State with not initial city
	const [city, setCity] = useState(
		// editingCity || {
		{
			cityname: "",
			state: "",
			iscurrentfavorite: false,
		}
	);

	//create functions that handle the event of the user typing into the form
	const handlecitynameChange = (event) => {
		const cityname = event.target.value;
		setCity((city) => ({ ...city, cityname }));
	};

	const handleStateNameChange = (event) => {
		const state = event.target.value;
		setCity((city) => ({ ...city, state }));
	};

	const handleCheckChange = (event) => {
		const iscurrentfavorite = event.target.checked;
		//console.log(iscurrent);
		setCity((city) => ({ ...city, iscurrentfavorite }));
	};

	const clearForm = () => {
		setCity({ cityname: "", state: "", iscurrentfavorite: false });
	};

	//A function to handle the post request
	const postCity = (newCity) => {
		return fetch("http://localhost:8080/api/cities", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newCity),
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log("From the post ", data);
				//I'm sending data to the List of cities (the parent) for updating the list
				onSaveCity(data);
				//this line just for cleaning the form
				clearForm();
			});
	};

	//A function to handle the post request
	const putCity = (toEditCity) => {
		return fetch(`http://localhost:8080/api/cities/${toEditCity.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(toEditCity),
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				onUpdateCity(data);
				//this line just for cleaning the form
				clearForm();
			});
	};

	//A function to handle the submit in both cases - Post and Put request!
	const handleSubmit = (e) => {
		e.preventDefault();
		if (city.id) {
			putCity(city);
		} else {
			postCity(city);
		}
	};

	return (
		<Form className="form-cities" onSubmit={handleSubmit}>
			<Form.Group>
				<Form.Label>City</Form.Label>
				<input
					type="text"
					id="add-city-name"
					placeholder="City Name"
					required
					value={city.cityname}
					onChange={handlecitynameChange}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>State</Form.Label>
				<input
					type="text"
					id="add-user-lastname"
					placeholder="Last Name"
					required
					value={city.state}
					onChange={handleStateNameChange}
				/>
			</Form.Group>
			<Form.Check
				type={"checkbox"}
				id={`isCurrent`}
				checked={city.iscurrentfavorite}
				onChange={handleCheckChange}
				label={`Is it a favorite city?`}
			/>
			<Form.Group>
				<Button type="submit" variant="outline-success">
					{city.id ? "Edit city" : "Add city"}
				</Button>
				{city.id ? (
					<Button type="button" variant="outline-warning" onClick={clearForm}>
						Cancel
					</Button>
				) : null}
			</Form.Group>
		</Form>
	);
};

export default FaveCityForm;
