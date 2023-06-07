
import React, { useRef } from "react";
import { useState } from "react";
import DoubleService from "../../service/DoubleService";
import "../../css/NavBar.css"
import "../../css/Single.css"
import 'react-circular-progressbar/dist/styles.css';
import { ImCheckmark, ImCross } from "react-icons/im";
import { LoadingBar } from "../LoadingBar";
import Swal from 'sweetalert2'

export const Double = () => {

  const inputRef = useRef();
  const [img, setImg] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [status, setStatus] = useState(false)
  const [response, setResponse] = useState([])
  const [loading, setLoading] = useState(false)


  const handleDragOver = (event) => {
    event.preventDefault();
  }

  const handleDrop = (event) => {
    event.preventDefault();
    setImg(event.dataTransfer.files[0]);
  }

  //selecting the multiple images
  const uploadImage = (e) => {
    setPreviewImages([]);  // clear the previous image from screen while selecting new images
    setStatus(false);
    const images = e.target.files;


    if (Array.from(images).length > 1) { // allowed only 2 or more than two images

      const allowedImages = Array.from(Array.from(images).slice(0, 2)).filter(
        (file) => file.type === 'image/png' && img.length < 2
      );

      setImg([...img, ...allowedImages]);

      const imagesArray = Array.from(allowedImages).map((file) => URL.createObjectURL(file));
      setPreviewImages([...previewImages, ...imagesArray]);

    } else {      // show the warning pop
      Swal.fire({
        icon: "warning",
        title: 'Warning',
        text: "select two images!!",
      })
    }
  }

  //formData object 
  const formData = new FormData();

  formData.append('image1', img[0]);
  formData.append('image2', img[1]);


  const submit = () => {

    if (img.length === 0) {
      Swal.fire({
        icon: "warning",
        title: 'Warning',
        text: "select image!!",
      })


    } else {
      setLoading(true);
      DoubleService.uploadImage(formData).then(Response => {
        setLoading(false); // off the loading bar
        setStatus(true);
        console.log(Response.data.image1.identity);
        console.log(Response.data.image2.identity);

        setResponse([Response.data.image1.identity, Response.data.image2.identity])
      })
        .catch(error => {

          setLoading(false); // off the loading bar
          // Handle error
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
    DoubleService.feedback("correct")
  }

  const wrong = () => {
    DoubleService.feedback("wrong")
  }




  return (
    <div onDragOver={handleDragOver}
      onDrop={handleDrop} className="container-fluid">

      <div className="row ">
        <div className="col button">
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="file" className=" btn btn-dark show" onClick={() => inputRef.current.click()}>Upload Image</button>
            <button type="button" className="btn btn-primary show" onClick={submit}>Submit </button>
          </div>
        </div>
      </div>


      <div className="row row-cols-auto">
        {/* <div className="col"></div> */}

        {previewImages.map((image, index) => (
          <div>
            <div className="col">
              {/* <img src={defaultImg} alt="Cinque Terre" className="rounded-circle image" /> */}
              <img key={index} src={image} alt={`Preview ${index}`} className="rounded-circle image" />
            </div>

            {loading && <LoadingBar></LoadingBar>}

            {status &&
              <div className="box outerbox col">
                <h3>{response[index]}</h3>
                <p> <span onClick={correct}><ImCheckmark style={{ height: "30px" }} /></span>
                  <span onClick={wrong}><ImCross style={{ height: "25px" }} /></span>
                </p>
              </div>}
          </div>
        ))}

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

          {/* (e) => {
              
              uploadImage(e.target.files);
            } */}
        </label>

      </div>
    </div >
  );
};
