import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import "bootstrap/dist/css/bootstrap.min.css";

const API_KEY = "3ddd97179f37c05cd34a0f398c421083";
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const weatherResponse = await axios.get(
        `${API_BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(weatherResponse.data);

      const forecastResponse = await axios.get(
        `${API_BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      setForecastData(forecastResponse.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeatherData();
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <h1 className="text-center mb-4">Weather App</h1>
          <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Get Weather
            </Button>
          </Form>
          {weatherData && <WeatherCard data={weatherData} />}
          {forecastData && <ForecastList data={forecastData} />}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
