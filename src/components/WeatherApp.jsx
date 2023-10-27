import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card } from 'react-bootstrap';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = 'dcc9e9a92d677a341b2da283dfa5ac01';

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError('An error occurred. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      fetchWeatherData();
    }
  };

  return (
    <Container className='mt-4'>
      <h1>Weather App</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Enter city name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Button className='button' variant="primary" type="submit">
          Get Weather
        </Button>
      </Form>
      {error && <p className="text-danger mt-2">{error}</p>}
      {weatherData && (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>City: {weatherData.name}</Card.Title>
            <Card.Text>Temperature: {weatherData.main.temp}°F</Card.Text>
            <Card.Text>Humidity: {weatherData.main.humidity}%</Card.Text>
            <Card.Text>Feels Like: {weatherData.main.feels_like}°F</Card.Text>
            <Card.Text>Conditions: {weatherData.weather[0].description}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default WeatherApp;