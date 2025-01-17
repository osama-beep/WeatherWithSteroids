import React from "react";
import { Card, ListGroup } from "react-bootstrap";

function ForecastList({ data }) {
  const groupedForecast = data.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title className="text-center">5-Day Forecast</Card.Title>
        <ListGroup variant="flush">
          {Object.entries(groupedForecast).map(([date, forecasts]) => (
            <ListGroup.Item key={date}>
              <h5 className="text-center">{date}</h5>
              <p className="text-center">
                Min:{" "}
                {Math.min(...forecasts.map((f) => f.main.temp_min)).toFixed(1)}
                °C
                <br />
                Max:{" "}
                {Math.max(...forecasts.map((f) => f.main.temp_max)).toFixed(1)}
                °C
                <br />
                Weather: {forecasts[0].weather[0].main}
              </p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default ForecastList;
