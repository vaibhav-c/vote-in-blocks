import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const Vote = (props) => {
    const [values, setValues] = useState({
        confirm: false
    });

    const VoteGivenFinalNo = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            confirm: false
        })
    }

    const VoteGivenFinalYes = (event) => {
        event.preventDefault();
        alert('You have voted for ' + props.name);
        window.location.href = "http://localhost:1234/vote";
        //smart
    }

    const VoteGiven = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            confirm: true
        })
    }
    return (
        <Card style={{ width: '100%' }}>
            <Card.Body style = {{display: 'flex', width: '100%'}}>
                {values.confirm? (
                    <>
                        <Button variant="success" style = {{marginRight: '20px'}} onClick = {VoteGivenFinalYes}>✓</Button>
                        <Button variant="danger" style = {{marginRight: '20px'}} onClick = {VoteGivenFinalNo}>✕</Button>
                    </>):(
                    <div>
                        <Button variant="success" style = {{marginRight: '20px'}} onClick = {VoteGiven}>VOTE</Button>
                    </div>)}
                <Card.Img variant="top" style = {{float: 'right', height: '50px', width: '50px'}} src={props.url} />
                <Card.Title style = {{marginLeft: '20px'}}>{props.name}</Card.Title>
            </Card.Body>
        </Card>
    );
}

export default Vote;