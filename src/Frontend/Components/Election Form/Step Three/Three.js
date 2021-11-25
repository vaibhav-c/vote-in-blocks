import React, { useState } from "react";
import {Card, Button} from 'react-bootstrap';
import Carousel from "react-elastic-carousel";
import ReactFileReader from 'react-file-reader';

const Three = (props) => {

    const candidateDetails = JSON.parse(localStorage.getItem("candidateDetails"));
    const electionDetails = localStorage.getItem("electionDetails");
    //console.log(candidateDetails.candidateDetails);
    
    const handleFiles = (files) => {
        var reader = new FileReader();
        reader.onload = function(e) {
            let arr = reader.result.split("\r\n");
            let email = [];
            for(let i = 1; i < Object.keys(arr).length - 1; i++) {
                email.push(arr[i]);
            }
            console.log(email);
        }
        reader.readAsText(files[0]);
    }

    return (
        <>
            <h5 className="card-title text-center mb-5 fw-light fs-5"><b>Confirm Details</b></h5>
            <Carousel>
                {candidateDetails.candidateDetails.map((candidate) => {
                    return (
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={candidate.url} />
                            <Card.Body>
                                <Card.Title>{candidate.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    );
                })}
            </Carousel>
            <div style = {{marginBottom: '8px'}}>
                <label for="floatingPassword">Voter List</label>
                <br/>
                <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'}>
                    <Button>Upload</Button>
                </ReactFileReader>
            </div>
            <div className="d-grid">
                <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit" style = {{marginBottom: '10px'}}>Sign Up</button>
            </div>
        </>
    );
}

export default Three;