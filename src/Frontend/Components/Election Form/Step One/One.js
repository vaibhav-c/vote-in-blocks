import React, { useState } from "react";

const One = (props) => {

    const onChange = (event) => {
        localStorage.setItem(event.target.name, event.target.value);
    } 

    return (
        <>
            <h5 className="card-title text-center mb-5 fw-light fs-5"><b>Election Information</b></h5>
            <form>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Name of Election" name = "name" onChange = {onChange}></input>
                    <label for="floatingInput">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Description" name = "desc" onChange = {onChange}></input>
                    <label for="floatingInput">Description</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="number" className="form-control" id="floatingInput" placeholder="Number of Candidates" name = "candidates" min = "1" max = "10"  onChange = {onChange}></input>
                    <label for="floatingInput">Number of Candidates</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="datetime-local" className="form-control" id="floatingInput" placeholder="Number of Candidates" name = "candidates" min = "1" max = "10"  onChange = {onChange}></input>
                    <label for="floatingInput">Start Time</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="datetime-local" className="form-control" id="floatingInput" placeholder="Number of Candidates" name = "candidates" min = "1" max = "10"  onChange = {onChange}></input>
                    <label for="floatingInput">End Time</label>
                </div>
            </form>
        </>
    );
}

export default One;