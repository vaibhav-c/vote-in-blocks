import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const Conducted = (props) => {
    const [values, setValues] = useState({
       showResult: false,
       candidateResults: [] 
    });
    const showResult = (event) => {
        event.preventDefault();
        for(let i in props.election.candidateDetails) {
            let c = {
                name: '',
                votes: 0,
                url: ''
            }
            c.name = i.name;
            c.url = i.url;
            c.votes = window.contract.getResults({candidateId: i._id});
        }
    }
    const declareResult = (event) => {
        event.preventDefault();
        axios.post(`/update`, {
            id: props.election._id
        }).then((res) => {
            if(res.data.success) {
                alert('Results Declared');
                window.location.reload();
            } else {
                alert('Some error occured');
            }
        })
    }
    return (
        <Card style={{ width: '100%' }}>
            <Card.Body style = {{display: 'flex', width: '100%'}}>
                <Button variant="success" disabled = {(props.status === "Ongoing" || props.status === "Future" || props.election.resultsDeclared) ? true : false} style = {{marginRight: '20px'}} onClick = {showResult}>Show Results</Button>
                <Button variant="success" disabled = {(props.status === "Ongoing" || props.status === "Future" || props.election.resultsDeclared) ? true : false} style = {{marginRight: '20px'}} onClick = {declareResult}>Delcare Results</Button>
                <Button variant={props.status === "Ongoing"? "warning": props.status === "Future"? "secondary":"danger"} style = {{marginRight: '20px', width: '100px'}}>{props.status}</Button>
                <Button variant="outline-primary" style = {{marginRight: '20px',  width: '200px'}}>{props.election.startTime.split("T")[0] + " " + props.election.startTime.split("T")[1].substring(0, 5)}</Button>
                To
                <Button variant="outline-primary" style = {{marginRight: '20px', marginLeft: '20px', width: '200px'}}>{props.election.endTime.split("T")[0] + " " + props.election.endTime.split("T")[1].substring(0, 5)}</Button>
                <Card.Title style = {{marginLeft: '20px'}}>{props.election.name}</Card.Title>
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