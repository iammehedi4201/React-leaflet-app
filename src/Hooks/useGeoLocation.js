import axios from "axios";
import { useEffect, useState } from "react";

const useGeoLocation = () => {
  //user location
  const [location, setLocation] = useState({
    loaded: false,// The loaded property is initially set to false, indicating that the user's geolocation information has not been loaded yet;
    coordinates: { lat: "", lng: "" },//The coordinates property is an object with two empty strings for latitude and longitude, respectively.
  });
  const [placeName, setPlaceName] = useState(null);

  const onSuccess = (location) => {
    //The onSuccess function is called when the geolocation request is successful. It updates the location state variable by setting the loaded property to true and updating the coordinates property with the latitude and longitude values obtained from the geolocation API.
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    //The onError function is called when the geolocation request fails. It updates the location state variable by setting the loaded property to true and setting the error property to an error message indicating the reason for the failure.
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    //The useEffect hook is used to run the geolocation request when the component using the useGeoLocation hook mounts. The useEffect hook runs only once because an empty array is passed as the second argument, indicating that there are no dependencies that would require the hook to be rerun.Inside the useEffect hook, the code checks whether the browser supports geolocation using the navigator.geolocation object. If geolocation is not supported, the onError function is called with a custom error object that contains an error code and message.
    if (!("geolocation" in navigator)) {
      onError({
        error: {
          code: 0,
          message: "Geolocation is not supported",
        },
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);//If geolocation is supported, the navigator.geolocation.getCurrentPosition method is called with the onSuccess and onError callback functions as arguments. The getCurrentPosition method retrieves the user's current geolocation information from the browser's Geolocation API.
  }, []);

  //For the place name 
  useEffect(() => {
    if (location) {
      const API_KEY = 'e16171bb732c4d82b1bfe075d57ea900';
      const API_URL = `https://api.opencagedata.com/geocode/v1/json?key=${API_KEY}&q=${location.coordinates.lat}+${location.coordinates.lng}&pretty=1`;

      axios
        .get(API_URL)
        .then(response => {
          setPlaceName(response.data.results[0].formatted);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [location]);


  return [location,placeName];
};

export default useGeoLocation;
