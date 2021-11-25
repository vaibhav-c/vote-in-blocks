import React from "react";
import {Navbar, Container, Nav} from 'react-bootstrap';

const Menubar = (props) => {

    const moveToGiven = (given) => {
        window.location.href = "http://localhost:1234/" + given;
    }

    const logout = () => {
        
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand onClick = {() => moveToGiven('home')}>Voting App</Navbar.Brand>
            <Nav>
                <Nav.Link active = {window.location.pathname === '/vote'? true : false} onClick = {() => moveToGiven('vote')}>Vote in an Election</Nav.Link>
                <Nav.Link active = {window.location.pathname === '/election'? true : false} onClick = {() => moveToGiven('election')}>Set Up an Election</Nav.Link>
                <Nav.Link active = {window.location.pathname === '/results'? true : false} onClick = {() => moveToGiven('results')}>Check Results</Nav.Link>
                <Nav.Link active = {window.location.pathname === '/conducted'? true : false} onClick = {() => moveToGiven('conducted')}>Conducted Elections</Nav.Link>
                <Nav.Link onClick = {logout}>Logout</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    );
}

export default Menubar;