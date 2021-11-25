import React, { createContext, useReducer } from 'react';

const initialState = {
    loggedInEmail: '',
    
}

const authReducer = (state, action) => {
    switch(action.type) {
        case 'SET':
            localStorage.setItem("day", action.payload.day);
            return {
                ...state,
                day: action.payload.day
            }
        case 'SET_CITY':
            localStorage.setItem("city", action.payload.city);
            localStorage.setItem("longitude", action.payload.longitude);
            localStorage.setItem("latitude", action.payload.latitude);
            localStorage.setItem("country", action.payload.country);
            return {
                ...state,
                city: action.payload.city,
                country: action.payload.country,
                latitude: action.payload.latitude,
                longitude: action.payload.longitude
            }
        case 'SET_TIMEZONE':
            localStorage.setItem("timezone", action.payload.timezone);
            return {
                ...state,
                timezone : action.payload.timezone
            }
        default:
            return state;
    }
}

const Context = createContext({
    day: true,
    city: '',
    latitude: '',
    longitude: '',
    country: '',
    timezone: '',
    setTimeZone: (data) =>{},
    setWeatherCity: (data) => {},
    setWeather: (data) => {}
});

const Provider = (props) => {
    
    const [state, dispatch] = useReducer(authReducer, initialState);

    const setWeather = (data) => {
        dispatch({
            type: 'SET',
            payload: data
        });
    }

    const setWeatherCity = (data) => {
        dispatch({
            type: 'SET_CITY',
            payload: data
        });
    }

    const setTimeZone = (data) => {
        dispatch({
            type: 'SET_TIMEZONE',
            payload: data
        });
    }

    return (
        <Context.Provider
            value = {{ day: state.day, country: state.country, city: state.city, latitude: state.latitude, longitude: state.longitude, timezone: state.timezone, setTimeZone, setWeatherCity, setWeather }}
            {...props}
        />
    );
}

export { Context, Provider};