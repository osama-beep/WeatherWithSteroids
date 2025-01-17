import PropTypes from "prop-types";
import { Card, Row, Col, Container } from "react-bootstrap";

function WeekWeather({ forecast, isDarkTheme }) {
  return (
    <Container>
      <Row className="mt-4 justify-content-center">
        {forecast.slice(1, 6).map((day, index) => (
          <Col key={index} xs={7} sm={4} md={3} lg={2} className="mb-3 px-1">
            <Card
              className={`text-center ${
                isDarkTheme ? "bg-secondary text-light" : "bg-light text-dark"
              }`}
            >
              <Card.Body className="p-1">
                <Card.Title className="mb-0 fs-6">{day.date}</Card.Title>
                <img
                  src={`http://openweathermap.org/img/wn/${day.icon}.png`}
                  alt={day.description}
                  className="weather-icon"
                />
                <Card.Text className="mb-0">{day.temperature}°C</Card.Text>
                <Card.Text className="small">{day.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

WeekWeather.propTypes = {
  forecast: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      temperature: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  isDarkTheme: PropTypes.bool.isRequired,
};
export default WeekWeather;
