import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Container, Card, Row, Col, ListGroup } from "react-bootstrap";
import { BsThermometerHalf, BsWind, BsDroplet, BsSun } from "react-icons/bs";
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
      <Container fluid className="p-3">
        <Row>
          <Col xs={12} md={4} lg={3} className="mb-3 d-none d-md-block">
            <Card
              className={
                isDarkTheme ? "bg-secondary text-light" : "bg-light text-dark"
              }
            >
              <Card.Body className="text-center">
                {datiMeteo && (
                  <>
                    <img
                      src={`http://openweathermap.org/img/wn/${datiMeteo.weather[0].icon}@4x.png`}
                      alt={datiMeteo.weather[0].description}
                      className="weather-icon mb-3"
                      style={{ width: "200px", height: "200px" }}
                    />
                    <Card.Title className="fs-4">
                      {new Date().toLocaleDateString("it-IT", {
                        weekday: "long",
                      })}
                    </Card.Title>
                    <Card.Text className="fs-5">
                      {new Date().toLocaleTimeString("it-IT", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Card.Text>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={8} lg={9}>
            <Card
              className={
                isDarkTheme ? "bg-secondary text-light" : "bg-light text-dark"
              }
            >
              <Card.Body>
                {datiMeteo && (
                  <Card
                    className={
                      isDarkTheme ? "bg-dark text-light" : "bg-white text-dark"
                    }
                  >
                    <Card.Body>
                      <Card.Title className="text-center mb-4">
                        <h2>
                          {datiMeteo.name}, {datiMeteo.sys.country}
                        </h2>
                      </Card.Title>
                      <ListGroup variant="flush">
                        <ListGroup.Item
                          className={
                            isDarkTheme
                              ? "bg-dark text-light"
                              : "bg-white text-dark"
                          }
                        >
                          <BsThermometerHalf className="me-2" />
                          <strong>Temperatura:</strong>{" "}
                          {Math.round(datiMeteo.main.temp)}°C
                        </ListGroup.Item>
                        <ListGroup.Item
                          className={
                            isDarkTheme
                              ? "bg-dark text-light"
                              : "bg-white text-dark"
                          }
                        >
                          <BsWind className="me-2" />
                          <strong>Vento:</strong> {datiMeteo.wind.speed} m/s
                        </ListGroup.Item>
                        <ListGroup.Item
                          className={
                            isDarkTheme
                              ? "bg-dark text-light"
                              : "bg-white text-dark"
                          }
                        >
                          <BsDroplet className="me-2" />
                          <strong>Umidità:</strong> {datiMeteo.main.humidity}%
                        </ListGroup.Item>
                        <ListGroup.Item
                          className={
                            isDarkTheme
                              ? "bg-dark text-light"
                              : "bg-white text-dark"
                          }
                        >
                          <BsSun className="me-2" />
                          <strong>Condizioni:</strong>{" "}
                          {datiMeteo.weather[0].description}
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                )}
              </Card.Body>
            </Card>
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
