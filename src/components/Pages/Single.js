import React, { useRef } from "react";
import { useState } from "react";
import HomeService from "../../service/HomeService";
import "../../css/NavBar.css"
import "../../css/Single.css"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export const Single = () => {

  const percentage = 66;

  const [defaultImg, setDefaultImg] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
  const inputRef = useRef();
  const [img, setImg] = useState([]);
  const [status, setStatus] = useState("Human")
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
  // formData.append('name', 'abhijit')

  const uploadImage = () => {
    HomeService.uploadImage(formData).then(Response => {

      console.log(Response.data);
      setStatus(Response.data.class_label)
    })
      .catch(error => {
        // Handle error
        console.log("Error uploading image:", error);
      });
  }
  const result = () => {

  }

  return (
    <div onDragOver={handleDragOver}
      onDrop={handleDrop} className="container">
      <div className="row row-cols-auto">
        <div className="col"></div>
        <div className="col">
          <img src={defaultImg} alt="Cinque Terre" className="rounded-circle image" />
        </div>
        <div className="box outerbox" style={{ textAlign: "center" }}>
          {/* <CircularProgressbar className="percentage" value={percentage} text={`${percentage}%`} />
          <h4>Human Probability</h4> */}
          <h3>{status}</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="file" className=" btn btn-dark show col-6" onClick={() => inputRef.current.click()}>Upload Image</button>
          </div>
          <button type="button" className="btn btn-primary show" onClick={uploadImage}>Submit </button>
        </div>
      </div>
      <div>
        &nbsp;
        <label className="">
          <input type="file"
            name="image"
            onChange={(e) => {
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
