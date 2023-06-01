
import React, { useRef } from "react";
import { useState } from "react";
import DoubleService from "../../service/DoubleService";
import "../../css/NavBar.css"
import "../../css/Single.css"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ImCheckmark, ImCross } from "react-icons/im";


export const Double = () => {

  const percentage = 66;

  const [defaultImg, setDefaultImg] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
  const inputRef = useRef();
  const [img, setImg] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [status, setStatus] = useState(false)
  const [response, setResponse] = useState(" ")
  const handleDragOver = (event) => {
    event.preventDefault();
  }

  const handleDrop = (event) => {
    event.preventDefault();
    setImg(event.dataTransfer.files[0]);
    setDefaultImg(URL.createObjectURL(event.dataTransfer.files[0]))

  }

  //selecting the multiple images
  const uploadImage = (e) => {
    const images = e.target.files;

    const allowedImages = Array.from(images).slice(0, 2);

    setImg([...img, ...allowedImages]);

    //setImg(...img, ...Images); ---- for multiple images

    setDefaultImg(URL.createObjectURL(e.target.files[0]))


    const imagesArray = Array.from(allowedImages).map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...imagesArray]);
  }

  //formData object 
  const formData = new FormData();

  formData.append('image1', img[0]);
  formData.append('image2', img[1]);


  const submit = () => {

    DoubleService.uploadImage(formData).then(Response => {
      setStatus(true);
      console.log(Response.data.image1.identity);
      setResponse(Response.data.identity)
    })
      .catch(error => {
        // Handle error
        console.log("Error uploading image:", error);
      });
  }

  const correct = () => {
    DoubleService.feedback("correct")
  }

  const wrong = () => {
    DoubleService.feedback("wrong")
  }




  return (
    <div onDragOver={handleDragOver}
      onDrop={handleDrop} className="container">
      <div className="row">
        {/* <div className="col"></div> */}

        {previewImages.map((image, index) => (
          <img key={index} src={image} alt={`Preview ${index}`} className="rounded-circle image" />
        ))}

        {/* <div className="col-3">
          <img src={defaultImg} alt="Cinque Terre" className="rounded-circle image" />
        </div>
        {status &&
          <div className="box outerbox col-3">
            <h3>{response}</h3>
            <p> <span onClick={correct}><ImCheckmark style={{ height: "30px" }} /></span>
              <span onClick={wrong}><ImCross style={{ height: "25px" }} /></span>
            </p>
          </div>
        } */}

        {/* <div className="col-3">
          <img src={defaultImg} alt="Cinque Terre" className="rounded-circle image" />
        </div>

        {status &&
          //conditional rendering after response come
          <div className="box outerbox col-3">
            <h3>{response}</h3>
            <p> <span onClick={correct}><ImCheckmark style={{ height: "30px" }} /></span>
              <span onClick={wrong}><ImCross style={{ height: "25px" }} /></span>
            </p>
          </div>
        } */}
      </div>
      <div className="row">
        <div className="col-5">
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="file" className=" btn btn-dark show col-6" onClick={() => inputRef.current.click()}>Upload Image</button>
          </div>
          <button type="button" className="btn btn-primary show" onClick={submit}>Submit </button>
        </div>
      </div>
      <div>
        &nbsp;
        <label className="">
          <input type="file"
            name="image"
            accept=".png"
            onChange={uploadImage}
            hidden
            multiple
            ref={inputRef} />

        </label>
        {/* <button type="file" className=" btn btn-dark show" onClick={() => inputRef.current.click()}>Upload Image</button> */}

      </div>
    </div >
  );
};
