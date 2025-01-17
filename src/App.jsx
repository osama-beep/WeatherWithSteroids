import { useState } from "react";
import axios from "axios";
import "./App.css";
import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";
import {
  BsSearch,
  BsThermometerHalf,
  BsWind,
  BsDroplet,
  BsSun,
} from "react-icons/bs";

function App() {
  const [citta, setCitta] = useState("");
  const [datiMeteo, setDatiMeteo] = useState(null);

  const gestisciInvio = async (e) => {
    e.preventDefault();
    const CHIAVE_API = "3ddd97179f37c05cd34a0f398c421083";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${citta}&appid=${CHIAVE_API}&units=metric&lang=it`;

    try {
      const risposta = await axios.get(url);
      setDatiMeteo(risposta.data);
    } catch (errore) {
      console.error("Errore nel recupero dei dati meteo:", errore);
      setDatiMeteo(null);
    }
  };

  return (
    <Container
      fluid
      className="p-0 min-vh-100 d-flex align-items-center bg-dark text-light"
    >
      <Row className="w-100 m-0">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Card className="bg-secondary text-light">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                <h1>MeteoConSteroidi</h1>
              </Card.Title>

              <Form onSubmit={gestisciInvio} className="mb-4">
                <Form.Group controlId="inputCitta" className="mb-3">
                  <Form.Control
                    type="text"
                    value={citta}
                    onChange={(e) => setCitta(e.target.value)}
                    placeholder="Inserisci una città"
                    className="bg-dark text-light"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  <BsSearch /> Cerca
                </Button>
              </Form>

              {datiMeteo && (
                <Card className="bg-dark text-light">
                  <Card.Body>
                    <Card.Title className="text-center mb-4">
                      <h2>
                        {datiMeteo.name}, {datiMeteo.sys.country}
                      </h2>
                    </Card.Title>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="bg-dark text-light">
                        <BsThermometerHalf className="me-2" />
                        <strong>Temperatura:</strong> {datiMeteo.main.temp}°C
                      </ListGroup.Item>
                      <ListGroup.Item className="bg-dark text-light">
                        <BsWind className="me-2" />
                        <strong>Vento:</strong> {datiMeteo.wind.speed} m/s
                      </ListGroup.Item>
                      <ListGroup.Item className="bg-dark text-light">
                        <BsDroplet className="me-2" />
                        <strong>Umidità:</strong> {datiMeteo.main.humidity}%
                      </ListGroup.Item>
                      <ListGroup.Item className="bg-dark text-light">
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
        </Col>
      </Row>
    </Container>
  );
}

export default App;
