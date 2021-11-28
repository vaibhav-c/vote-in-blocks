import React, {useState} from 'react';
import axios from 'axios';
import './Register.css';
import CustomModal from '../../Modal/Modal';


const Register = (props) => {
    const [values, setValues] = useState({
        formData: {
            name: '',
            email: '',
            password: '',
            dateOfBirth: '',
            aadhar: '',
            image: null,
        }, 
        showModal:false
    })
    const {name,email,password,dateOfBirth,aadhar} = values.formData;
    const onChange = (event) => {
        event.preventDefault();
        let temp = values.formData;
        if(event.target.name === 'image') {
            temp[event.target.name] = event.target.files[0];
            setValues({
                ...values,
                formData: temp
            });
        } else {
            setValues({
                ...values,
                formData: temp
            });
            temp[event.target.name] = event.target.value;
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            showModal: true
        })
        console.log(values);
        const formData = new FormData();
        formData.append("file", values.formData.image);
        //formData.append("url", "URL-of-Image-or-PDF-file");
        formData.append("language"   , "eng");
        formData.append("apikey"  , "cd608cfbce88957");
        formData.append("isOverlayRequired", true);
        jQuery.ajax({
            url: 'https://api.ocr.space/parse/image',
            data: formData,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function (ocrParsedResult) {
                console.log(ocrParsedResult)
                try {
                    let cnt = 1;
                    let message = "Can't go further because of following errors : \n";
                    if(values.formData.name.trim() === '') {
                        message += "" + cnt + ". Name cannot be empty\n";
                        cnt++;
                    }
                    if(values.formData.email.trim() === '') {
                        message += "" + cnt + ". Email cannot be empty\n";
                        cnt++;
                    }
                    if(values.formData.password.trim() === '') {
                        message += "" + cnt + ". Password cannot be empty\n";
                        cnt++;
                    }
                    if(values.formData.aadhar.trim() === '') {
                        message += "" + cnt + ". AADHAR Number cannot be empty\n";
                        cnt++;
                    }
                    if(values.formData.dateOfBirth.trim() === '') {
                        message += "" + cnt + ". Date of Birth cannot be empty\n";
                        cnt++;
                    }
                    if(values.formData.image === null) {
                        message += "" + cnt + ". Image cannot be empty\n";
                        cnt++;
                    } else {
                        let aNo = values.formData.aadhar;
                        let numbers = "";
                        let kL = 1;
                        for(let i = 0; i < aNo.length; i++) {
                            if(aNo[i] >= '0' && aNo[i] <= '9') {
                                if(kL % 4 == 1 && kL != 1) {
                                    numbers += " " + aNo[i];
                                } else {
                                    numbers += aNo[i];
                                }
                            }
                            kL++;
                        }
                        let allText = "";
                        for(let i = 0; i < Object.keys(ocrParsedResult.ParsedResults[0].TextOverlay.Lines).length; i++) {
                            allText += ocrParsedResult.ParsedResults[0].TextOverlay.Lines[i].LineText + " ";
                        }
                        console.log(numbers);
                        console.log(allText);
                        if(allText.toUpperCase().indexOf(values.formData.name.toUpperCase()) === -1 || allText.toUpperCase().indexOf(numbers.toUpperCase()) === -1) {
                            alert("Details mismatch from AADHAR");
                            setValues({
                                ...values,
                                showModal: false
                            });
                            return;
                        }
                    }
                    if(cnt === 1) {
                        /*axios.post(`http://localhost:5000/api/register`,{
                            name,
                            password,
                            dateOfBirth,
                            aadhar
                        }).then((res)=>{
                            setValues({
                                formData: {
                                    name: '',
                                    password: '',
                                    dateOfBirth: '',
                                    aadhar: '',
                                    image: null
                                }, 
                                showModal: false,
                            })
                        }).catch((err)=>{
                            alert(err.response);
                            setValues({
                                ...values, 
                                showModal: false
                            });
                        })*/
                        alert("Good");
                    } else {
                        alert(message);
                        setValues({
                            ...values,
                            showModal: false
                        });
                    }
                } catch(err) {
                    setValues({
                        ...values,
                        showModal: false
                    });
                    alert("Cannot Verify Details. Try in sometime");
                }
            }
        });
    }

    return (
        <>
        <CustomModal show={values.showModal}/>
        <div className="containerx">
        <div className="row">
            <div className="col-sm-2 col-md-7 col-lg-10 mx-auto">
                <div className="card border-0 shadow rounded-3 my-5">
                <div className="card-body p-4 p-sm-1">
                    <h5 className="card-title text-center mb-5 fw-light fs-5"><b>Register</b></h5>
                    <form>
                    <div className="form-floating mb-3">
                        <input type="text" name = 'name' className="form-control" id="floatingInput" placeholder="Name" onChange = {onChange}></input>
                        <label htmlFor="floatingInput">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" name = 'email' className="form-control" id="floatingInput" placeholder="Email" onChange = {onChange}></input>
                        <label htmlFor="floatingInput">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" name = 'aadhar' className="form-control" id="floatingInput" placeholder="AADHAR" onChange = {onChange}></input>
                        <label htmlFor="floatingInput">AADHAR Number</label> 
                    </div>
                    <div className="form-floating mb-3">
                        <input type="date" name = 'dateOfBirth' className="form-control" id="floatingInput" placeholder="Date of Birth" onChange = {onChange}></input>
                        <label htmlFor="floatingInput">Date Of Birth</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" name = 'password' className="form-control" id="floatingPassword" placeholder="Password" onChange = {onChange}></input>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div style = {{marginBottom: '8px'}}>
                        <label htmlFor="floatingPassword">AADHAR Image</label>
                        <br/>
                        <input type="file" name = 'image' onChange = {onChange}></input>
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-primary btn-login text-uppercase fw-bold" onClick = {onSubmit}>Sign Up</button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    </div>
    </>			                            
    )
}

export default Register;