import React, { useState, useEffect } from "react";
import * as ioicons from "react-icons/io5";
import MyForm from "./Form";
import Student from "./Student";

const ListStudents = () => {
	// this is my original state with an array of students
	const [cities, setCities] = useState([]);

	//this is the state needed for the UpdateRequest
	const [editingCity, setEditingCity] = useState(null);

	const loadCities = () => {
		// A function to fetch the list of students that will be load anytime that list change
		fetch("http://localhost:8080/api/cities")
			.then((response) => response.json())
			.then((cities) => {
				setCities(cities);
			});
	};

	useEffect(() => {
		loadCities();
	}, [cities]);

	const onSaveCity = (newCity) => {
		console.log(newCity, "From the parent - List of Cities");
		setCities((cities) => [...cities, newCity]);
	};

	// A function to control the update in the parent (city component)
	const updateCity = (savedCity) => {
		console.log("Line 29 savedCity", savedCity);
		// This function should update the whole list of cities -
		loadCities();
	};

	//A function to handle the Delete funtionality
	const onDelete = (city) => {
		console.log(city, "delete method");
		return fetch(`http://localhost:8080/api/cities/${city.id}`, {
			method: "DELETE",
		}).then((response) => {
			//console.log(response);
			if (response.ok) {
				loadCities();
			}
		});
	};

	//A function to handle the Update functionality
	const onUpdate = (toUpdateCity) => {
		console.log(toUpdateCity);
		setEditingCity(toUpdateCity);
	};

	return (
		<div className="mybody">
			<div className="list-cities">
				<h2>Your Favorite Cities </h2>
				<ul>
					{cities.map((city) => {
						return (
							<li key={city.id}>
								{" "}
								<Student city={city} toDelete={onDelete} toUpdate={onUpdate} />
							</li>
						);
					})}
				</ul>
			</div>
			<MyForm
				key={editingCity ? editingCity.id : null}
				onSaveCity={onSaveCity}
				editingCity={editingCity}
				onUpdateCity={updateCity}
			/>
		</div>
	);
};

export default ListStudents;
