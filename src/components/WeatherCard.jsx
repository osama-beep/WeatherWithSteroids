import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

function WeatherCard({ data }) {
  // ...
  return (
    <Card>
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>
          Temperature: {data.main.temp}°C
          <br />
          Feels like: {data.main.feels_like}°C
          <br />
          Weather: {data.weather[0].main} - {data.weather[0].description}
          <br />
          Humidity: {data.main.humidity}%
          <br />
          Wind Speed: {data.wind.speed} m/s
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

WeatherCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      feels_like: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
    }).isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        main: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
export default WeatherCard;
