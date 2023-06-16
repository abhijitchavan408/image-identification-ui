import React, { useRef } from "react";
import { useState, useEffect } from "react";
import SingleService from "../../service/SingleService";
import "../../css/NavBar.css"
import "../../css/Single.css"
import 'react-circular-progressbar/dist/styles.css';

import { ImCheckmark, ImCross } from "react-icons/im";
import { LoadingBar } from "../LoadingBar";
import Swal from 'sweetalert2'


export const SingleAdharCard = () => {


  const [defaultImg, setDefaultImg] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
  const inputRef = useRef();
  const [img, setImg] = useState([]);
  const [previewImages, setPreviewImages] = useState(defaultImg);
  const [status, setStatus] = useState(false)
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [feedbackStatus, setFeedbackStatus] = useState(" ")
  const [fileName, setFileName] = useState("")



  const handleDragOver = (event) => {
    event.preventDefault();
  }

  const handleDrop = (event) => {
    event.preventDefault();
    setImg(URL.createObjectURL(event.dataTransfer.files[0]));
  }
  const formData = new FormData();
  formData.append('image', img);


  useEffect(() => {
    if (img !== undefined && img.length !== 0) {
      setPreviewImages(URL.createObjectURL(img))
    }
  }, [img])



  const clear = (e) => {
    setStatus(false);
    setFeedbackStatus(" ");
    setImg([]);
    setPreviewImages(defaultImg)
  }



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
        setFileName(Response.data.filename);
        setResponse(Response.data.identity);

      }).catch(error => {
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

  const feedbackObj = {
    feedbackStatus,
    fileName
  }

  // const feedbackFun = (e) => {

  useEffect(() => {

    if (feedbackStatus !== " ") {
      setLoading(true);
      SingleService.feedback(feedbackObj).then(Response => {
        setLoading(false);
        console.log(Response.data);
        Swal.fire({
          icon: "success",
          title: 'Success',
          text: "Your response has recorded!!",
        })

        setFeedbackStatus(" ");
        setStatus(false);

      }).catch(error => {
        // Handle error
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: 'Error',
          text: "Some thing went wrong",
        })
        console.log("Error uploading image:", error);
        setFeedbackStatus(" ");
        setStatus(false);
      })
    }
  }, [feedbackStatus])



  return (
    <div onDragOver={handleDragOver}
      onDrop={handleDrop} className="container-fluid">

      <div className="row">
        <h4 className="col heading">Single AdharCard</h4>
        <div className="col button">
          <div class="btn-group" role="group" aria-label="Basic example" >
            <button type="button" className="btn btn-danger show" onClick={clear}>Clear </button>
            {/* <button type="file" className=" btn btn-primary show" onClick={() => inputRef.current.click()}>Upload Image</button> */}
            <button type="button" className="btn btn-success show" onClick={submit}>Submit </button>
          </div>
        </div>
      </div>

      <div className="row row-cols-auto">
        <div className="col"></div>
        {/* <div className="col-3">
          <img src={previewImages} alt="image" className="rounded-circle image" />
        </div> */}

        {loading && <LoadingBar></LoadingBar>}

        {status &&
          <div className="box outerbox" style={{ textAlign: "center" }}>
            {/* <CircularProgressbar className="percentage" value={percentage} text={`${percentage}%`} />
          <h4>Human Probability</h4> */}
            <h3>{response}</h3>
            <p> <span onClick={(e) => {
              setFeedbackStatus("correct");
            }}><ImCheckmark style={{ height: "30px" }} /></span>

              <span onClick={(e) => {
                setFeedbackStatus("Wrong");
              }}><ImCross style={{ height: "25px" }} /></span>
            </p>
          </div>
        }
      </div>

      <div className="row">
        <div className="col-2">
          &nbsp;
          <label >
            <input type="file"
              className="form-control"
              name="image"
              accept=".png, .pdf, .jpeg, .jpg"
              onChange={(e) => {
                setStatus(false);
                setImg(e.target.files[0]);

              }}
            // hidden
            // ref={inputRef} 
            />

          </label>
          {/* <button type="file" className=" btn btn-dark show" onClick={() => inputRef.current.click()}>Upload Image</button> */}
        </div>
      </div>
    </div >
  );
};
