import axios from 'axios';
import {LoadingButton} from "@mui/lab"
import {Container,Typography,Box,TextField} from "@mui/material";
import { useState } from "react";

const API_CLIMA = `http://api.weatherapi.com/v1/current.json?key=${
  import.meta.env.VITE_API_KEY
}&lang=es&q=`;

const API_BACKEND = 'http://localhost:3000/api/clima/save'

export default function App(){

  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const [clima, setClima] = useState({
    city: "",
    country: "",
    temperature: 0,
    condition: "",
    conditionText: "",
    icon: "",
  });

  const saveClimaData = async (climaData) => {
    try {
      const response = await axios.post(API_BACKEND, climaData);
      console.log('Clima data saved:', response.data);
    } catch (error) {
      console.error('Error saving clima data:', error);
    }
  };

  const onSubmit = async(e) => {
    e.preventDefault();
    console.log("submit");
    setLoading(true);
    setError({
      error: false,
      message:"",
    })
    try {
      if(!city.trim()) throw {message: "El campo ciudad es obligatorio!"};

       const res = await fetch(`${API_CLIMA}${city}`);
      const data = await res.json();

      if(data.error) throw {message: data.error.message};
      const climaData ={
        city: data.location.name,
        country: data.location.country,
        temperature: data.current.temp_c,
        condition: data.current.condition.code,
        conditionText: data.current.condition.text,
        icon: data.current.condition.icon,
      };
      setClima(climaData);
      saveClimaData(climaData);

    } catch (error) {
      setError({
        error: true,
        message: error.message,
      })
    } finally {
      setLoading(false);
    }
  }

  

  return(
    <>
        <Container
    maxWidth="xs"
    sx={{mt:2}}
>

    <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
    >
        Mi App de Clima
      </Typography>
      <Box
        sx={{ display: "grid", gap: 2 }}
        component="form"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField
         id="city"
         label="Ciudad"
         variant="outlined"
         size="small"
         required
         value={city}
         onChange={(e) => setCity(e.target.value)}
         error={error.error}
         helperText={error.message}
        />

        <LoadingButton
           type="submit"
           variant="contained"
           loading={loading}
           loadingIndicator="Buscando..."
        >
          Buscar
        </LoadingButton>
      </Box> 

      {clima.city && (
        <Box
          sx={{
            mt: 2,
            display: "grid",
            gap: 2,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
          >
            {clima.city}, {clima.country}
          </Typography>
          <Box
            component="img"
            alt={clima.conditionText}
            src={clima.icon}
            sx={{ margin: "0 auto" }}
          />
          <Typography
            variant="h5"
            component="h3"
          >
            {clima.temperature} °C
          </Typography>
          <Typography
            variant="h6"
            component="h4"
          >
            {clima.conditionText}
          </Typography>
        </Box>
      )}
</Container>

    </>
  );
}