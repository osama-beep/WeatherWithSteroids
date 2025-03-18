import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Container, Card, Row, Col, ListGroup, Badge } from "react-bootstrap";
import {
  BsThermometerHalf,
  BsWind,
  BsDroplet,
  BsSun,
  BsGeoAlt,
} from "react-icons/bs";
import NavbarComponent from "./components/Navbar";
import WeekWeather from "./components/WeekWeather";

function App() {
  const [citta, setCitta] = useState(null);
  const [datiMeteo, setDatiMeteo] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const CHIAVE_API = "3ddd97179f37c05cd34a0f398c421083";

  const fetchWeatherData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${CHIAVE_API}&units=metric&lang=it`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${CHIAVE_API}&units=metric&lang=it`;
    try {
      const risposta = await axios.get(url);
      setDatiMeteo(risposta.data);

      const forecastRisposta = await axios.get(forecastUrl);
      const dailyForecast = forecastRisposta.data.list
        .filter((item, index) => index % 8 === 0)
        .slice(0, 7)
        .map((item) => ({
          date: new Date(item.dt * 1000).toLocaleDateString("it-IT", {
            weekday: "short",
          }),
          temperature: Math.round(item.main.temp),
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        }));
      setForecast(dailyForecast);
    } catch (errore) {
      console.error("Errore nel recupero dei dati meteo:", errore);
      setDatiMeteo(null);
      setForecast(null);
    }
  };

  useEffect(() => {
    fetchWeatherData("London");
  }, []);

  const gestisciInvio = async (e) => {
    if (e) e.preventDefault();
    fetchWeatherData(citta);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div
      className={`min-vh-100 ${
        isDarkTheme ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <NavbarComponent
        citta={citta}
        setCitta={setCitta}
        gestisciInvio={gestisciInvio}
        isDarkTheme={isDarkTheme}
        toggleTheme={toggleTheme}
      />
      <Container fluid className="py-4">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            {datiMeteo && (
              <Card
                className={`mb-4 shadow ${
                  isDarkTheme ? "bg-secondary text-light" : "bg-white"
                }`}
              >
                <Card.Body>
                  <Row>
                    <Col xs={12} md={6} className="text-center mb-3 mb-md-0">
                      <img
                        src={`http://openweathermap.org/img/wn/${datiMeteo.weather[0].icon}@4x.png`}
                        alt={datiMeteo.weather[0].description}
                        className="weather-icon mb-3"
                        style={{ width: "150px", height: "150px" }}
                      />
                      <h2 className="display-4 mb-0">
                        {Math.round(datiMeteo.main.temp)}°C
                      </h2>
                      <p className="lead">{datiMeteo.weather[0].description}</p>
                    </Col>
                    <Col xs={12} md={6}>
                      <h3 className="mb-3">
                        <BsGeoAlt className="me-2" />
                        {datiMeteo.name}, {datiMeteo.sys.country}
                      </h3>
                      <ListGroup variant="flush">
                        <ListGroup.Item
                          className={
                            isDarkTheme ? "bg-secondary text-light" : ""
                          }
                        >
                          <BsThermometerHalf className="me-2" />
                          <strong>Percepita:</strong>{" "}
                          {Math.round(datiMeteo.main.feels_like)}°C
                        </ListGroup.Item>
                        <ListGroup.Item
                          className={
                            isDarkTheme ? "bg-secondary text-light" : ""
                          }
                        >
                          <BsWind className="me-2" />
                          <strong>Vento:</strong> {datiMeteo.wind.speed} m/s
                        </ListGroup.Item>
                        <ListGroup.Item
                          className={
                            isDarkTheme ? "bg-secondary text-light" : ""
                          }
                        >
                          <BsDroplet className="me-2" />
                          <strong>Umidità:</strong> {datiMeteo.main.humidity}%
                        </ListGroup.Item>
                        <ListGroup.Item
                          className={
                            isDarkTheme ? "bg-secondary text-light" : ""
                          }
                        >
                          <BsSun className="me-2" />
                          <strong>Indice UV:</strong>{" "}
                          <Badge bg="warning" text="dark">
                            Moderato
                          </Badge>
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}
            {forecast && (
              <WeekWeather forecast={forecast} isDarkTheme={isDarkTheme} />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
