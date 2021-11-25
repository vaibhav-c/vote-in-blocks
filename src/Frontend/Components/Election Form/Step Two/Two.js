import React, { useState } from "react";
import Carousel from 'react-elastic-carousel';

const Two = (props) => {

    const numberOfCandidates = localStorage.getItem('candidates');
    let candidates = [];
    for(let i = 0; i < numberOfCandidates; i++) {
        candidates.push({'name': '', 'url': ''});
    }
    const [values, setValues] = useState({
        candidateDetails : candidates
    });
    let val = 0;

    const onChange = (event) => {
        candidates = values.candidateDetails;
        let name = event.target.name.split(" ")
        candidates[parseInt(name[1]) - 1][name[0]] = event.target.value;
        setValues({
            ...values,
            candidateDetails: candidates
        });
        localStorage.setItem("candidateDetails", JSON.stringify(values));
    }
    return (
        <>
            <h5 className="card-title text-center mb-5 fw-light fs-5"><b>Candidate Information</b></h5>
            <form>
                <Carousel style = {{marginTop: '40px', height: '380px', width: '100%'}}>
                    {
                        values.candidateDetails.map((candidate) => {
                            val = val + 1;
                            return (
                                <div>
                                    <h5 className="card-title text-center mb-5 fw-light fs-5">Candidate {val}</h5>
                                    <div className="form-floating mb-3">
                                        <input type="text" name = {"name " + val} className="form-control" id="floatingInput" placeholder="Name of Election" onChange = {onChange}></input>
                                        <label for="floatingInput">Candidate Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" name = {"url " + val} className="form-control" id="floatingInput" placeholder="Description" onChange = {onChange}></input>
                                        <label for="floatingInput">Election Symbol URL</label>
                                    </div>
                                </div>
                            );
                        })
                    }
                </Carousel>
            </form>
        </>
    );
}

export default Two;