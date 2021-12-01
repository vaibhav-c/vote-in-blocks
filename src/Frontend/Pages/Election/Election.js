import React, { useContext, useState } from 'react';
import { Container, Card, ProgressBar, Button } from 'react-bootstrap';
import Menubar from '../../Components/Menubar/Menubar';
import Carousel from 'react-elastic-carousel';
import ReactFileReader from 'react-file-reader';
import axios from 'axios';
import { getMaxListeners } from '../../../../Server/models/auth_models';
import { Context } from '../../../Context/context';


const Election = (props) => {
    const context = useContext(Context);
    
    if(localStorage.getItem("email") === undefined) {
        window.location.pathname = "/";
    } else {
        if(window.accountId === '') {
            console.log("login");
            login()
        }
    }

    const [values, setValues] = useState({
        position: 1,
        election: {
            name: '',
            desc: '',
            startTime: '',
            endTime: '',
            candidates: 0,
            candidateDetails: [],
            invites: [],
            resultsDeclared: false,
            adminEmail: localStorage.getItem("email")
        }
    });

    const nextPage = (event) => {
        event.preventDefault();
        let pos = values.position;
        if(pos === 1) {
            let cnt = 1;
            let message = "Can't go further because of following errors : \n";
            if(values.election.name.trim() === '') {
                message += "" + cnt + ". Name cannot be empty\n";
                cnt++;
            }
            if(values.election.desc.trim() === '') {
                message += "" + cnt + ". Description cannot be empty\n";
                cnt++;
            }
            if(values.election.startTime === '') {
                message += "" + cnt + ". Start Time cannot be empty\n";
                cnt++;
            }
            if(values.election.endTime === '') {
                message += "" + cnt + ". End Time cannot be empty\n";
                cnt++;
            }
            if(values.election.candidates === 0) {
                message += "" + cnt + ". Candidates cannot be zero\n";
                cnt++;
            }
            if(values.election.startTime >= values.election.endTime) {
                message += "" + cnt + ". Start time must be less than end time\n";
                cnt++;
            }
            if(cnt === 1) {
                setValues({
                    ...values,
                    position: pos + 1
                });
            } else {
                alert(message);
            }
        } else if(pos === 2) {
            let cnt = 1;
            let message = "Can't go further because of following errors : \n";
            for(let i = 0; i < Object.keys(values.election.candidateDetails).length; i++) {
                if(values.election.candidateDetails[i].name.trim() === '') {
                    message += "" + cnt + ". Candidate Name for Candidate " + (i + 1) + " is empty\n"
                    cnt++;
                }
                if(values.election.candidateDetails[i].url.trim() === '') {
                    message += "" + cnt + ". Candidate Symbol for Candidate " + (i + 1 ) + " is empty\n"
                    cnt++
                }
            }
            if(values.election.name.trim() === '') {
                message += "" + cnt + ". Name cannot be empty\n";
                cnt++;
            }
            if(cnt === 1) {
                setValues({
                    ...values,
                    position: pos + 1
                });
            } else {
                alert(message);
            }
        }
    }

    const prevPage = (event) => {
        event.preventDefault();
        let pos = values.position;
        setValues({
            ...values,
            position: pos - 1
        });
    }

    const onChange = (event) => {
        event.preventDefault();
        let temp = values.election;
        temp[event.target.name] = event.target.value
        temp.candidateDetails = [];
        for(let i = 0; i < temp.candidates; i++) {
            temp.candidateDetails.push({'name': '', 'url': ''});
        }
        setValues({
            ...values,
            election: temp
        });
    }

    const onChangeCandidate = (event) => {
        let temp = values.election;
        let candidates = values.election.candidateDetails;
        let name = event.target.name.split(" ")
        candidates[parseInt(name[1]) - 1][name[0]] = event.target.value;
        temp.candidateDetails = candidates;
        setValues({
            ...values,
            election: temp
        });
    }

    const handleFiles = (files) => {
        var reader = new FileReader();
        reader.onload = function(e) {
            let arr = reader.result.split("\r\n");
            let email = [];
            let temp = values.election;
            for(let i = 1; i < Object.keys(arr).length - 1; i++) {
                email.push(arr[i]);
            }
            temp.invites = email;
            setValues({
                ...values,
                election: temp
            })
        }
        reader.readAsText(files[0]);
    }

    const submitForm = (event) => {
        event.preventDefault();
        if(Object.keys(values.election.invites).length === 0) {
            alert("Voter List cannot be empty");
        } else {
            const {election} = values;
            axios.post(`http://localhost:5000/api/voting`,{
                   election
                }).then((res)=>{
                    console.log(res);
                    let candidateIds = []
                    for(let i = 0; i < Object.keys(res.data.candidateDetails).length; i++) {
                        candidateIds.push(res.data.candidateDetails[i]._id);
                    }
                    console.log(candidateIds)
                    window.contract.setUpElection({electionId: res.data.id, candidateIds: candidateIds})
                    setValues({
                        ...values,
                        position: 1,
                        election: {
                            name: '',
                            desc: '',
                            startTime: '',
                            endTime: '',
                            candidates: 0,
                            candidateDetails: [],
                            invites: [],
                            resultsDeclared: false,
                            adminEmail: localStorage.getItem("email")
                        }
                    }); 
                    //window.location.reload();
                    //setFormData({})
                    //    console.log(res);
                    //    console.log('Logged in');

                }).catch((err)=>{
                    //setFormData({})
                    //window.location.reload();
                    console.log(err);
                })
            
            console.log(values);
        }
    }

    let val = 0;
    let today = new Date();
    let dt = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0') + "T" + today.getHours() + ":" + today.getMinutes();

    return (
        <>
            <Menubar/>
            <div className="containerx">
                <div className="row">
                    <div className="col-sm-2 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-1">
                                <ProgressBar now={values.position / 3 * 100} style = {{marginBottom: '20px'}}/>
                                {values.position === 1? (
                                    <>
                                        <h5 className="card-title text-center mb-5 fw-light fs-5"><b>Election Information</b></h5>
                                        <form>
                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" id="floatingInput" placeholder="Name of Election" name = "name" onChange = {onChange} value = {values.election.name}></input>
                                                <label htmlFor="floatingInput">Name</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" id="floatingInput" placeholder="Description" name = "desc" onChange = {onChange} value = {values.election.desc}></input>
                                                <label htmlFor="floatingInput">Description</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input type="number" className="form-control" id="floatingInput" placeholder="Number of Candidates" name = "candidates" min = "1" max = "10"  onChange = {onChange} value = {values.election.candidates}></input>
                                                <label htmlFor="floatingInput">Number of Candidates</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input type="datetime-local" className="form-control" id="floatingInput" placeholder="Start Time" name = "startTime" onChange = {onChange} min = {dt} max = {values.election.endTime} value = {values.election.startTime}></input>
                                                <label htmlFor="floatingInput">Start Time</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input type="datetime-local" className="form-control" id="floatingInput" placeholder="End Time" name = "endTime" onChange = {onChange} min = {values.election.startTime} value = {values.election.endTime}></input>
                                                <label htmlFor="floatingInput">End Time</label>
                                            </div>
                                        </form>
                                    </>
                                ) : values.position === 2? (
                                    <>
                                        <h5 className="card-title text-center mb-5 fw-light fs-5"><b>Candidate Information</b></h5>
                                        <form>
                                            <Carousel style = {{marginTop: '40px', height: '380px', width: '100%'}}>
                                                {
                                                    values.election.candidateDetails.map((candidate) => {
                                                        val = val + 1;
                                                        return (
                                                            <div>
                                                                <h5 className="card-title text-center mb-5 fw-light fs-5">Candidate {val}</h5>
                                                                <div className="form-floating mb-3">
                                                                    <input type="text" name = {"name " + val} className="form-control" id="floatingInput" placeholder="Name of Election" onChange = {onChangeCandidate} value = {values.election.candidateDetails[val - 1].name}></input>
                                                                    <label for="floatingInput">Candidate Name</label>
                                                                </div>
                                                                <div className="form-floating mb-3">
                                                                    <input type="text" name = {"url " + val} className="form-control" id="floatingInput" placeholder="Description" onChange = {onChangeCandidate} value = {values.election.candidateDetails[val - 1].url}></input>
                                                                    <label for="floatingInput">Election Symbol URL</label>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </Carousel>
                                        </form>
                                    </>
                                ): (
                                    <>
                                        <h5 className="card-title text-center mb-5 fw-light fs-5"><b>Confirm Details</b></h5>
                                        <Card style={{ width: '100%', marginBottom: '20px' }}>
                                            <Card.Body>
                                                <Card.Title>Name : {values.election.name}</Card.Title>
                                                <Card.Title>Start Time : {values.election.startTime.split("T")[0] + " " + values.election.startTime.split("T")[1]}</Card.Title>
                                                <Card.Title>End Time : {values.election.endTime.split("T")[0] + " " + values.election.endTime.split("T")[1]}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                        <Card style={{ width: '100%', marginBottom: '20px', textAlign: 'center' }}>
                                            <Card.Body>
                                                <Card.Title>Candidate Details</Card.Title>
                                            </Card.Body>
                                        </Card>
                                        <Carousel>
                                            {values.election.candidateDetails.map((candidate) => {
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
                                            <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit" style = {{marginBottom: '10px'}} onClick = {submitForm}>Set Up</button>
                                        </div>
                                    </>
                                )}
                                <Button variant="primary" disabled = {values.position === 1} style = {{marginRight: '10px', fontSize: '20px'}} onClick = {prevPage}>&#8592;</Button>
                                <Button variant="primary" disabled = {values.position === 3} style = {{fontSize: '20px'}} onClick = {nextPage}>&#8594;</Button>
                                {/*<Multistep 
                                    showNavigation={true} steps={steps} 
                                    prevStyle = {{marginLeft: '10px', marginRight: '10px', backgroundColor: 'blue', borderRadius: '10px', padding: '10px', paddingLeft: '20px', paddingRight: '20px', backgroundColor: 'white', color: '#2196F3', border: '2px solid #2196F3'}} 
                                nextStyle = {{marginLeft: '10px', marginRight: '10px', backgroundColor: 'blue', borderRadius: '10px', padding: '10px', paddingLeft: '20px', paddingRight: '20px', backgroundColor: 'white', color: '#2196F3', border: '2px solid #2196F3'}}/>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Election;