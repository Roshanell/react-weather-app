const WeatherCard = (props) => {
    console.log(props)
	return (
		<div className="weather-card">
			<p>Card will go here</p>

			 <div className="result">
				<p>
					City:{" "}
					<span className="data">
						{props.data.data.name}, {props.data.data.sys.country}
					</span>
				</p>
				<p>
					Description:{" "}
					<span className="data">{props.data.data.weather[0].description}</span>
				</p>
				<img
					src={`http://openweathermap.org/img/wn/${props.data.data.weather[0].icon}@4x.png`}
					alt={"Icon from Open Weather Api"}
				/>
				<p>
					Temperature:{" "}
					<span className="data">
						{props.data.data.main.temp} <sup>o</sup>C
					</span>
				</p>
				<p>
					Feels Like:{" "}
					<span className="data">
						{props.data.data.main.feels_like} <sup>o</sup>C
					</span>
				</p>
			</div>
		</div>
	);
};

export default WeatherCard;
