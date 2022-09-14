import React from 'react';
import {useNavigate} from "react-router-dom"
import Button from '@mui/material/Button';
  
const Home = () => {
  const navigate = useNavigate();
    
  return (
      <>
        <h1 style={{ display: "block", margin: "0 auto" }}>Schedule Below!</h1>
        <Button variant="contained" style={{ display: "block", margin: "0 auto" }} onClick={()=>navigate("/Scheduler")}>Book An Appointment!</Button>
      </>
  )
};
  
export default Home;
