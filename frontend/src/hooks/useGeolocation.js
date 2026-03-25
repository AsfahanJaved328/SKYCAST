import { useEffect, useState } from "react";

const useGeolocation = () => {
  const [state, setState] = useState({
    location: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({ location: null, loading: false, error: "Geolocation is not supported." });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          location: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          loading: false,
          error: null,
        });
      },
      () => {
        setState({
          location: null,
          loading: false,
          error: "Location access denied. Showing default city weather.",
        });
      },
      { enableHighAccuracy: true, timeout: 12000 },
    );
  }, []);

  return state;
};

export default useGeolocation;
