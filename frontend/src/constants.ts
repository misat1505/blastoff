import logo from "./assets/logo.png";
import googleMapsLogo from "./assets/google-maps-logo.png";
import hubbleTelescope from "./assets/hubble_telescope.webp";
import landsat from "./assets/landsat.jpg";
import tvSatellite from "./assets/tv_satellite.jpg";
import wheatherSatellite from "./assets/wheather_satellite.jpeg";

export const LOGO_PATH = logo;

export const GOOGLE_MAPS_LOGO_PATH = googleMapsLogo;

export const GOOGLE_MAPS_URL = "https://www.google.com/maps";

export const SATTELITES_IMAGES = {
  HUBBLE: hubbleTelescope,
  LANDSAT: landsat,
  TV: tvSatellite,
  WHEATHER: wheatherSatellite,
};

export const API_URL = import.meta.env.VITE_API_URL;
