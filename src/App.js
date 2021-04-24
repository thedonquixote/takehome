import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Alert, Card, Form, Grid, Row, Col, Container, CardGroup, ListGroup, ButtonGroup } from 'react-bootstrap'
import GridList from '@material-ui/core/GridList';

//onchanged search func
//onchanged pagination func
//grid 




function App() {
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [data, setData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isList, setList] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setLoading(true);

      try {
        const response = await axios('https://www.balldontlie.io/api/v1/players/?per_page=9');

        setData(response.data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData()
  }, []);

  function searchChange(search) {
    const fetchData = async () => {
      setError(false);
      setLoading(true);

      try {
        const response = await axios('https://www.balldontlie.io/api/v1/players/?per_page=9&&search=' + search.target.value);

        setData(response.data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData()
  }

  const renderCard = (card, index) => {
    return (

      <Card style={{ width: '18rem' }} key={index} className="box">
        <Card.Img />
        <Card.Body>
          <Card.Title>
          </Card.Title>
          <Card.Text style={{ color: '#000' }}>
            {card.first_name}  {card.last_name}
          </Card.Text>
          <Button variant="primary">Read More</Button>
        </Card.Body>
      </Card>
    )
  }

  const renderList = (list, index) => {
    return (

      <ListGroup.Item disabled>Cras justo odio</ListGroup.Item>
    )
  }





  return (
    <div>
      <tr>
        <input type="text" placeholder="Search.." onChange={searchChange} />
        <Button variant="outline-primary" onClick={setList(false)}>grid</Button>{' '}
        <Button variant="outline-secondary" onClick={setList(true)}>list</Button>{' '}
      </tr>


      <div className="grid">

        {isLoading && isList ? <div>Loading...</div> : data.data && data.data.map(renderCard

        )}

      </div>


    </div>


  );
}


export default App;
