import React, { useState, useEffect } from 'react';
import {Card} from 'react-bootstrap';
import VoteCard from '../Vote Card/Vote Card';
import ResultsCard from '../Result Card/Result Card';

const Election = (props) => {

    const [values, setValues] = useState({
        candidateResults: []
    })

    useEffect(() =>{
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
        setValues({
            ...values,
            candidateResults: arr
        })
    }, [props.election._id])

    let val = 0;

    return (
        <>
        
            {
                
                values.candidateResults.map((candidate) => {
                    val++;
                    return (<ResultsCard key = {candidate._id} name = {candidate.name} url = {candidate.url} votes = {candidate.votes} position = {val} candidateId = {candidate._id}/>);
                })
            } 
            
        </>
    );
}

export default Election;