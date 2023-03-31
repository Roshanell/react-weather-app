import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import MyNavBar from "./components/Navbar";
import ListCity from "./components/ListCity";
import WeatherForm from "./components/WeatherForm";
import WeatherCard from "./components/WeatherCards";

function App() {
	const [city, setCity] = useState("");
	const [result, setResult] = useState(null);

	//A function to do the get request and set the state from the data
	const loadCity = (city) => {
		const params = new URLSearchParams({ cityname: city });
		//console.log(params);
		///api/cityWeather/
		fetch(`http://localhost:8080/api/cityWeather?${params}`)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				setCity(city);
				setResult(result);
			});
	};

	const handleSubmit = (city) => {
		console.log(city);
		loadCity(city);
	};
	return (
		<div className="App">
			<MyNavBar />
			<WeatherForm city={city} handleSubmit={handleSubmit} />
			{!city ? null : <WeatherCard data={result} />}
			<ListCity />
		</div>
	);
}

export default App;
