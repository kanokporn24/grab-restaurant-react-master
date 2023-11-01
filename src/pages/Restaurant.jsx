import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const URL = import.meta.env.VITE_BASE_URL;
const USERNAME = import.meta.env.VITE_BASE_USERNAME;
const PASSWORD = import.meta.env.VITE_BASE_PASSWORD;
const config = {
    auth: {
        username: USERNAME,
        password: PASSWORD,
    },
};

const Restaurant = () => {
    const [restaurants, setRestaurants] = useState([]);
    useEffect(()=>{
        const fetchAllRestanurants = async () =>{
            try {
                const res = await axios.get(`${URL}/restanurants`, config);
                setRestaurants(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAllRestanurants();
    }, []);
  return  <div>Restaurant</div>;
};

export default Restaurant;
