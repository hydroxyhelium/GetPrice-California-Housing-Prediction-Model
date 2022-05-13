import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import {useState, useEffect} from 'react';

import MyComponent from './Component.js';
import axios from 'axios';

import { Box, Center } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button, 
  Heading
} from '@chakra-ui/react'

function App() {

  // useEffect(()=>{
  //   navigator.geolocation.getCurrentPosition((pos)=>{

  //     setLat(pos.coords.latitude)
  //     setLng(pos.coords.longitude)
  //   })
  // },[])

  const [marklat,setMarklat] = useState(0.0)
  const [marklong,setMarklong] = useState(0.0)
  const [total_bedroom, set_total_bedroom] = useState(0)
  const [median_income, set_median_income] = useState(0)

  const [displayed, set_displayed] = useState(false)
  const [price,setPrice] = useState(0)



  const handlechange_b = (e)=>{
    set_total_bedroom(e.target.value)
  }

  const handlechange_m = (e)=>{
    set_median_income(e.target.value)
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    axios
    .post('http://localhost:5000/predict', {
      'longitude': marklong,
      'latitude': marklat,
      'total_bedroom': parseInt(total_bedroom),
      'median_income': parseInt(median_income)
    })
    .then(response => {
      console.log(response.data)
      set_displayed(true)
      
      setPrice(Number(response.data.Value))
    })
  }

  const X = ()=>{

    console.log(displayed,price)

    if(displayed){
      let text = "The predicted price is: "+price
      return <h1>{text}</h1>
    }
    else{
      return <></>
    }
  
  
  }

  return (
    <Box m={2} color='red.50' >
      <Center> <Heading as='h1' size='2xl' noOfLines={1}> California Housing Prediction Model </Heading> </Center>
      <br/>
      <Center><MyComponent setMarklat={setMarklat} setMarkLong={setMarklong}/> </Center>
      <br/>

      {/* <form onSubmit={handleSubmit}>

        <label>
          Total Bedrooms:
          <input type="text" value={total_bedroom} onChange={handlechange_b}/>
          
        </label>

        <label>
          Median Income:
          <input type="text" value={median_income} onChange={handlechange_m}/>
        </label>
        <input type="submit" value="Submit"/>
      </form> */}

      <FormControl onSubmit={handleSubmit}>
  <Center><FormLabel htmlFor='text' >Total Rooms in locality</FormLabel> </Center> 
  <br/>
  <Center><Input id='number' type='text' value={total_bedroom} onChange={handlechange_b} /> </Center>
  <br/>
  <FormHelperText>Please Enter Total number of Rooms in your locality </FormHelperText>
  <br/>
  <Center><FormLabel htmlFor='number'>Median Income of Neighborhood</FormLabel> </Center>
  <br/>
  <Input id='text' type='text' value={median_income} onChange={handlechange_m} />
  <br/>
  <FormHelperText>Enter the Median Income of your locality </FormHelperText>
  <br/>

  <Center><Button> Get Price!</Button> </Center>
</FormControl>

      <X />
    

    </Box>
  );
}

export default App;
