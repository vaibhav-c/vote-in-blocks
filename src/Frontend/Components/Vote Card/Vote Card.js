import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import CustomModal from '../../Modal/Modal';

const Vote = (props) => {
    const [values, setValues] = useState({
        confirm: false,
        showModal: false
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
        setValues({
            ...values,
            showModal: true
        });
        window.contract.sendVote({electionId: props.electionId, candidateId: props.candidateId, userId: props.userId})
            .then((res) =>{
                setValues({
                    ...values, 
                    showModal: false
                })
                window.location.reload();
            });
        //alert('You have voted for ' + props.candidateId);
        //window.location.href = "http://localhost:1234/vote";
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
            <CustomModal show = {values.showModal} message = "Recording Vote...Please Wait" title = "Voting Process"/>
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