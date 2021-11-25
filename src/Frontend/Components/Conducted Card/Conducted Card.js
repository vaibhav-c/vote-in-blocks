import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const Conducted = (props) => {
    const [values, setValues] = useState({
       showResult: false 
    });
    const showResult = (event) => {
        event.preventDefault();
        setValues({
            ...values, 
            showResult: !values.showResult
        })
        //window.location.href = "http://localhost:1234/vote";
    }
    const declareResult = (event) => {
        event.preventDefault();
        alert('Declared');
        //window.location.href = "http://localhost:1234/vote";
    }
    return (
        <Card style={{ width: '100%' }}>
            <Card.Body style = {{display: 'flex', width: '100%'}}>
                <Button variant="success" disabled = {(props.status === "Ongoing" || props.declared) ? true : false} style = {{marginRight: '20px'}} onClick = {showResult}>Show Results</Button>
                <Button variant="success" disabled = {(props.status === "Ongoing" || props.declared) ? true : false} style = {{marginRight: '20px'}} onClick = {declareResult}>Delcare Results</Button>
                <Button variant={props.status === "Ongoing"? "warning": "danger"} style = {{marginRight: '20px', width: '100px'}}>{props.status}</Button>
                <Button variant="outline-primary" style = {{marginRight: '20px',  width: '200px'}}>Start Time</Button>
                <Button variant="outline-primary" style = {{marginRight: '20px',  width: '200px'}}>End Time</Button>
                <Card.Title style = {{marginLeft: '20px'}}>{props.name}</Card.Title>
            </Card.Body>
            {
                    values.showResult? 
                    (<Card.Body style = {{display: 'flex', width: '100%'}}>
                        Party and Vote
                        Voted
                    </Card.Body>) : <div/>
            }
        </Card>
    );
}

export default Conducted;