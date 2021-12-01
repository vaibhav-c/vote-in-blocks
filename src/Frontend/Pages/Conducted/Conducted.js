import React, { useEffect, useState } from 'react';
import Menubar from '../../Components/Menubar/Menubar';
import {Tab, Row, Col, Form, Button, Container, Card} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import ConductedCard from '../../Components/Conducted Card/Conducted Card';

const Vote = (props) => {


    if(localStorage.getItem("email") === undefined) {
        window.location.pathname = "/";
    } else {
        if(window.accountId === '') {
            console.log("login");
            login()
        }
    }

    const [values, setValues] = useState({
        electionList: []
    });

    let email = localStorage.getItem("email");

    useEffect(() => {
        axios.get(`http://localhost:5000/api/conducted`,{
                params: {
                    email: email
                }
            }).then((res)=>{
                if(res.data.success) {
                    setValues({
                        ...values,
                        electionList: res.data.conducted
                    }) 
                } else {
                    alert('Some Error Occurred');
                }
                
            }).catch((err)=>{
                console.log(err.response);
            })
    }, []);

    let currentTime = new Date().toISOString();

    if(Object.keys(values.electionList).length > 0) {
        let startDate = values.electionList[0].startTime.split("T")[0] + " " + values.electionList[0].startTime.split("T")[1].substring(0, 5);
        let endDate = values.electionList[0].endTime.split("T")[0] + " " + values.electionList[0].endTime.split("T")[1].substring(0, 5);
        let current = currentTime.split("T")[0] + " " + currentTime.split("T")[1].substring(0, 5);
        console.log(startDate, " ", endDate, " ", current, " ", startDate > current);
    }

    let fetched;
    if(Object.keys(values.electionList).length !== 0) {
        console.log(values.electionList);
        fetched = values.electionList.map((election) => {
                        let status = (currentTime.localeCompare(election.startTime) === 1 && currentTime.localeCompare(election.endTime) === -1 ? "Ongoing" : (currentTime.localeCompare(election.startTime) === -1)? "Not Started" : "Finished");
                        return (
                            <Tab.Pane style = {{marginBottom: '15px'}} key = {election.id} eventKey="#">
                                <ConductedCard name = {election.name} declared = {election.declared} status = {status} startTime = {election.startTime} endTime = {election.endTime}/>
                            </Tab.Pane>
                        );
                    });
    } else {
        fetched = (<Card>No Elections Conducted</Card>);
    }

    return (
        <>
            <Menubar/>
            <Container>
                <Tab.Container id="list-group-tabs-example" defaultActiveKey = "#">
                    <Row style = {{marginTop: '20px'}}>
                        <Col sm={12}>
                        <Tab.Content>
                            {
                                fetched
                            }
                        </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </>
    );
}

export default Vote;