import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import ResultsCard from '../Result Card/Result Card';
import axios from 'axios';

const Conducted = (props) => {
    const [values, setValues] = useState({
       showResult: false,
       candidateResults: []
    });


    useEffect(() => {
        let arr = [];
        props.election.candidateDetails.forEach(element => {
            let c = {
                name: element.name,
                votes: 0,
                url: element.url,
                id: element._id
            }
            window.contract.getResults({candidateId: c.id})
                .then((res) => {
                    c.votes = res;
                    arr.push(c);
                });                     
        });
        arr.sort(function(a, b) {
            var x = a.votes;
            var y = b.votes;
            return ((x < y) ? -1: ((x > y) ? 1: 0));
        });
        console.log(arr);
        setValues({
            ...values,
            candidateResults: arr
        })
    }, [])

    const showResult = (event) => {
        event.preventDefault();
        let result = values.showResult;    
        setValues({
            ...values,
            showResult: !result
        })
    }
    const declareResult = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:5000/api/update`, {
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
    let val = 0;
    let stA = new Date(props.election.startTime).toString().split(" ");
    let startTime = stA[0] + ", " + stA[1] + " " + stA[2] + " " + stA[3] + " " + stA[4];
    let etA = new Date(props.election.endTime).toString().split(" ")
    let endTime = etA[0] + ", " + etA[1] + " " + etA[2] + " " + etA[3] + " " + etA[4];
    return (
        <Card style={{ width: '100%' }}>
            <Card.Body style = {{display: 'flex', width: '100%'}}>
                <Button variant="success" disabled = {(props.status === "Ongoing" || props.status === "Future") ? true : false} style = {{marginRight: '20px'}} onClick = {showResult}>Show Results</Button>
                <Button variant="success" disabled = {(props.status === "Ongoing" || props.status === "Future" || props.election.resultsDeclared) ? true : false} style = {{marginRight: '20px'}} onClick = {declareResult}>Delcare Results</Button>
                <Button variant={props.status === "Ongoing"? "warning": props.status === "Future"? "secondary":"danger"} style = {{marginRight: '20px', width: '100px', fontWeight: '500'}}>{props.status}</Button>
                <Button variant="outline-primary" style = {{marginRight: '20px',  width: '200px'}}>{startTime}</Button>
                To
                <Button variant="outline-primary" style = {{marginRight: '20px', marginLeft: '20px', width: '200px'}}>{endTime}</Button>
                <Card.Title style = {{marginLeft: '20px'}}>{props.election.name}</Card.Title>
            </Card.Body>
            {
                    values.showResult? 
                    (<Card.Body style = {{display: 'block', width: '100%'}}>
                        {
                            Object.keys(values.candidateResults).length !== 0 ? (
                                values.candidateResults.map((candidate) => {
                                    val++;
                                    return (<ResultsCard position = {val} id = {candidate.id} votes = {candidate.votes} name = {candidate.name} url = {candidate.url}/>);
                                })
                            ):(
                                <div>No Data Available</div>
                            )

                        }
                    </Card.Body>) : <div/>
            }
        </Card>
    );
}

export default Conducted;