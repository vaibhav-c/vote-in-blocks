import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Vote = (props) => {
    const VoteGiven = (event) => {
        event.preventDefault();
        alert('You have voted for ' + props.name);
        window.location.href = "http://localhost:1234/vote";
    }
    return (
        <Card style={{ width: '100%' }}>
            <Card.Body style = {{display: 'flex', width: '100%'}}>
                <Button variant="success" style = {{marginRight: '20px'}} onClick = {VoteGiven}>VOTE</Button>
                <Card.Img variant="top" style = {{float: 'right', height: '50px', width: '50px'}} src={props.url} />
                <Card.Title style = {{marginLeft: '20px'}}>{props.name}</Card.Title>
            </Card.Body>
        </Card>
    );
}

export default Vote;