import React, { createContext, useReducer } from 'react';

const initialState = {
    id: '',
    email: '',
    name: '',
    dateOfBirth: '',
    aadhar: ''
}

const authReducer = (state, action) => {
    switch(action.type) {
        case 'SET_USER':
            localStorage.setItem("id", action.payload.id);
            localStorage.setItem("email", action.payload.email);
            localStorage.setItem("dateOfBirth", action.payload.dateOfBirth);
            localStorage.setItem("name", action.payload.name);
            localStorage.setItem("aadhar", action.payload.aadhar);
            return {
                ...state,
                id: action.payload.id,
                email: action.payload.email,
                name: action.payload.name,
                dateOfBirth: action.payload.dateOfBirth,
                aadhar: action.payload.aadhar
            }
        default:
            return state;
    }
}

const Context = createContext({
    id: '',
    email: '',
    name: '',
    dateOfBirth: '',
    aadhar: '',
    setUser: (data) =>{}
});

const Provider = (props) => {
    
    const [state, dispatch] = useReducer(authReducer, initialState);

    const setUser = (data) => {
        dispatch({
            type: 'SET_USER',
            payload: data
        });
    }

    return (
        <Context.Provider
            value = {{ id: state.id, email: state.email, name: state.name, dateOfBirth: state.dateOfBirth, aadhar: state.aadhar, setUser }}
            {...props}
        />
    );
}

export { Context, Provider};