import React, { useState, useEffect } from 'react';
import {Tab, Row, Col, Card} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import VoteCard from '../Vote Card/Vote Card';
import axios from 'axios';

const Election = (props) => {

    const [values, setValues] = useState({
        show: false
    })

    useEffect(() =>{
        window.contract.getParticipation({electionId: props.election._id, userId: localStorage.getItem("id")})
            .then((res) => {
                console.log(res);
                setValues({
                    ...values,
                    show: !res
                })
            })
    }, [props.election._id])

    return (
        <>
        
            {
                !values.show? (
                    <Card style={{ width: '100%' }}>
                        <Card.Body style = {{display: 'flex', width: '100%'}}>
                        <Card.Title style = {{marginRight: '20px'}}>You have voted</Card.Title>
                        </Card.Body>
                    </Card>
                ):
                (props.election.candidateDetails.map((candidate) => {
                    return (<VoteCard key = {candidate._id} name = {candidate.name} url = {candidate.url} userId = {localStorage.getItem("id")} electionId = {props.election._id} candidateId = {candidate._id}/>);
                }))
            } 
            
        </>
    );
}

export default Election;