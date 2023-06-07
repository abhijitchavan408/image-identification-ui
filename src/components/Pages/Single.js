import React, { useRef } from "react";
import { useState, useEffect } from "react";
import SingleService from "../../service/SingleService";
import "../../css/NavBar.css"
import "../../css/Single.css"
import 'react-circular-progressbar/dist/styles.css';

import { ImCheckmark, ImCross } from "react-icons/im";
import { LoadingBar } from "../LoadingBar";
import Swal from 'sweetalert2'


export const Single = () => {



  const [defaultImg, setDefaultImg] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
  const inputRef = useRef();
  const [img, setImg] = useState([]);
  const [status, setStatus] = useState(false)
  const [response, setResponse] = useState(" ")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)



  const handleDragOver = (event) => {
    event.preventDefault();
  }

  const handleDrop = (event) => {
    event.preventDefault();
    setImg(event.dataTransfer.files[0]);
    setDefaultImg(URL.createObjectURL(event.dataTransfer.files[0]))

  }
  const formData = new FormData();
  formData.append('image', img);


  const submit = () => {

    if (img.length === 0) {
      Swal.fire({
        icon: "warning",
        title: 'Warning',
        text: "select image!!",
      })


    } else {
      setLoading(true);
      SingleService.uploadImage(formData).then(Response => {
        setLoading(false);
        setStatus(true);
        console.log(Response.data);
        setResponse(Response.data.identity);
      })
        .catch(error => {
          // Handle error
          setLoading(false);
          setError(true)
          Swal.fire({
            icon: "error",
            title: 'Error',
            text: "Some thing went wrong",
          })
          console.log("Error uploading image:", error);
        });
    }
  }
  const correct = () => {
    SingleService.feedback("correct")
  }

  const wrong = () => {
    SingleService.feedback("wrong")
  }

  const result = () => {

  }

  return (
    <div onDragOver={handleDragOver}
      onDrop={handleDrop} className="container-fluid">

      <div className="row">
        <div className="col button">
          <div class="btn-group" role="group" aria-label="Basic example" >
            <button type="file" className=" btn btn-dark show" onClick={() => inputRef.current.click()}>Upload Image</button>
            <button type="button" className="btn btn-primary show" onClick={submit}>Submit </button>
          </div>
        </div>
      </div>

      <div className="row row-cols-auto">
        <div className="col"></div>
        <div className="col-3">
          <img src={defaultImg} alt="Cinque Terre" className="rounded-circle image" />
        </div>

        {loading && <LoadingBar></LoadingBar>}

        {status &&
          <div className="box outerbox" style={{ textAlign: "center" }}>
            {/* <CircularProgressbar className="percentage" value={percentage} text={`${percentage}%`} />
          <h4>Human Probability</h4> */}
            <h3>{response}</h3>
            <p> <span onClick={correct}><ImCheckmark style={{ height: "30px" }} /></span>
              <span onClick={wrong}><ImCross style={{ height: "25px" }} /></span>
            </p>
          </div>
        }
      </div>

      <div>
        &nbsp;
        <label className="">
          <input type="file"
            name="image"
            accept=".png"
            onChange={(e) => {
              setStatus(false);
              setImg(e.target.files[0]);
              setDefaultImg(URL.createObjectURL(e.target.files[0]))
            }}
            hidden
            ref={inputRef} />

        </label>
        {/* <button type="file" className=" btn btn-dark show" onClick={() => inputRef.current.click()}>Upload Image</button> */}

      </div>
    </div >
  );
};
