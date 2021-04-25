
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Image, Card, Form, ToggleButtonGroup, ListGroup, Navbar, InputGroup, FormControl, ToggleButton } from 'react-bootstrap'
import lebron from './assets/lebron-james.jpg';




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
        <Image style={{ margin: '15px', alignSelf: 'center', width: '25%' }} src={lebron} roundedCircle />
        <Card.Body>
          <Card.Text style={{ color: '#000' }}>
            Name : {card.first_name}  {card.last_name}
          </Card.Text>
          <Card.Text style={{ color: '#000' }}>
            Height : {card.height_feet}'  {card.height_inches}"
          </Card.Text>
          <Card.Text style={{ color: '#000' }}>
            Position : {card.position}
          </Card.Text>  
          <Card.Text style={{ color: '#000' }}>
            Team : {card.team.name}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }

  const renderList = (list, index) => {
    return (

      <ListGroup.Item disabled>Name : {list.first_name}  {list.last_name}  Height : {list.height_feet}'  {list.height_inches}" Position : {list.position}  Team : {list.team.name}</ListGroup.Item>
    )
  }





  return (
    <div>

      <Navbar className="bg-light justify-content-between">
        
        <Form inline>
          <InputGroup>
          <Navbar.Brand href="#home">Takehome Alkira</Navbar.Brand>
            <FormControl onChange={searchChange} type="text" placeholder="Search" className=" mr-sm-2" />
          </InputGroup>
        </Form>
        <ToggleButtonGroup type="radio" name="options" defaultValue={2}>
          <ToggleButton onClick={() => setList(true)} value={1}>list</ToggleButton>
          <ToggleButton onClick={() => setList(false)} value={2}>grid</ToggleButton>

        </ToggleButtonGroup>
      </Navbar>

      <div className="grid">

        {isList ? <div></div> : data.data && data.data.map(renderCard

        )}

      </div>

      <ListGroup>
        {!isList ? <div></div> : data.data && data.data.map(renderList

        )}
      </ListGroup>


    </div>


  );
}


export default App;
