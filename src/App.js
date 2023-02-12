import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import TimeZone from './components/TimeZone/TimeZone';
import LocationAstronomy from './components/LocationAstronomy/LocationAstronomy';
import WeatherForecast from './components/WeatherForecast/WeatherForecast';
import Home from './components/Home/Home';
import styles from './App.module.css'
// import './utils/api_calls'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      locationAstronomy : [],
      timeZone : [],
      currentWeather : []
    }
  }

  getLinks(){
    const links = [
      {
        label : 'Home'
      },
      {
        label : 'Weather Forecast'
      },
      {
        label : 'Location Astronomy'
      },
      {
        label : 'Find Time Zone'
      }
    ]
    return links;
  }


  getChildRoutes(){
    const childernRoutes =[
        {
          path: `/Home`,
          element: (
            <Home />
          ),
        },
        {
          path: `/Weather Forecast`,
          element: <WeatherForecast /> ,
        },
        {
          path: `/Location Astronomy`,
          element: <LocationAstronomy />,
        },
        {
          path: `/Find Time Zone`,
          element: <TimeZone /> ,
        }
    ];
    return childernRoutes;
  }

  getBaseRoute(){
    const baseRouter = createBrowserRouter(
      [
        {
          path: '/',
          element: (
            <>
              <Navbar navLinks={this.getLinks()}/>
              {/* <Navigate to={'/Home'} /> */}

              <Outlet />
            </>
            ),
          children: this.getChildRoutes()
        }
      ]
    );
    return baseRouter;
  }

  componentDidMount(){
  }

  render(){
    return (
      <div className={styles.App}>
        <RouterProvider router={this.getBaseRoute()} />
      </div>
  );}
}

export default App;
