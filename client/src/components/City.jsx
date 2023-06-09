import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import * as ioicons from "react-icons/io5";

const City = ({ city, toUpdate, toDelete }) => {
	const onUpdate = (toUpdateCity) => {
		toUpdate(toUpdateCity);
	};

	const onDelete = (toDeleteCity) => {
		toDelete(toDeleteCity);
	};

	return (
		<Card>
			<Card.Body>
				<Card.Title>
					{city.cityname}, {city.state}
				</Card.Title>

				<Button
					variant="outline-danger"
					onClick={() => {
						onDelete(city);
					}}
					style={{ padding: "0.6em", marginRight: "0.9em" }}
				>
					<ioicons.IoTrash />
				</Button>
				<Button
					variant="outline-info"
					onClick={() => {
						onUpdate(city);
					}}
					style={{ padding: "0.6em" }}
				>
					{" "}
					<ioicons.IoSync />
				</Button>
			</Card.Body>
		</Card>
	);
};

export default City;
