import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Result = (props) => {

    return (
        <Card style={{ width: '100%' }}>
            <Card.Body style = {{display: 'flex', width: '100%'}}>
            <Card.Title style = {{marginRight: '20px'}}>Position: {props.position}</Card.Title>
                <Card.Title style = {{marginRight: '20px'}}>Votes: {props.votes}</Card.Title>
                <Card.Img variant="top" style = {{float: 'right', height: '50px', width: '50px'}} src={props.url} />
                <Card.Title style = {{marginLeft: '20px'}}>{props.name}</Card.Title>
            </Card.Body>
        </Card>
    );
}

export default Result;