
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import DoubleService from "../../service/DoubleService";
import "../../css/NavBar.css"
import "../../css/Single.css"
import 'react-circular-progressbar/dist/styles.css';
import { ImCheckmark, ImCross } from "react-icons/im";
import { LoadingBar } from "../LoadingBar";
import Swal from 'sweetalert2'

export const TwoImages = () => {

  const inputRef = useRef();
  const [img, setImg] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [status, setStatus] = useState(false)
  const [response, setResponse] = useState([])
  const [loading, setLoading] = useState(false)
  const [feedbackStatus, setFeedbackStatus] = useState(" ")
  const [fileName, setFileName] = useState("")


  const handleDragOver = (event) => {
    event.preventDefault();
  }

  const handleDrop = (event) => {
    event.preventDefault();
    // setImg(URL.createObjectURL(event.dataTransfer.files[0]));

    const allowedImages = event.dataTransfer.files;
    setImg([...img, ...allowedImages]);

    const imagesArray = Array.from(img).map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...imagesArray]);
    //uploadImage(event);
  }


  // useEffect(() => {
  //   if (img !== undefined && img.length !== 0) {
  //     setPreviewImages(URL.createObjectURL(img))
  //   }
  // }, [img])

  const clear = (e) => {
    setPreviewImages(" ")
    setImg([]);
    setPreviewImages([]);
  }


  //selecting the multiple images
  const uploadImage = (e) => {
    setStatus(false);
    const images = e.target.files;
    //const images = e;
    console.log("image number: " + images.length)

    if (Array.from(images).length > 1) { // allowed only 2 or more than two images
      console.log("in side image number: " + images.length)

      const allowedImages = Array.from(Array.from(images).slice(0, 2))
      // .filter((file) => file.type === 'image/png' && img.length < 2);

      console.log("allowed image number: " + allowedImages.length)
      setImg([...allowedImages]);

      const imagesArray = Array.from(allowedImages).map((file) => URL.createObjectURL(file));
      setPreviewImages([...imagesArray]);

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

  const feedbackObj = {
    feedbackStatus,
    fileName
  }


  useEffect(() => {
    if (feedbackStatus !== " ") {
      setLoading(true);
      DoubleService.feedback(feedbackObj).then(Response => {
        setLoading(false);
        console.log(Response.data);
        Swal.fire({
          icon: "success",
          title: 'success',
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

      <div className="row ">
        <h4 className="col heading">Double</h4>
        <div className="col button">
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-danger show" onClick={clear}>Clear </button>
            <button type="file" className=" btn btn-primary show" onClick={() => inputRef.current.click()}>Upload Image</button>
            <button type="button" className="btn btn-success show" onClick={submit}>Submit </button>
          </div>
        </div>
      </div>


      <div className="row row-cols-auto">
        {/* <div className="col"></div> */}

        {previewImages.map((image, index) => (
          <div>
            <div className="col">
              <img key={index} src={image} alt={`Preview ${index}`} className="rounded-circle image" />
            </div>

            {loading && <LoadingBar></LoadingBar>}

            {status &&
              <div className="box outerbox col">
                <h3>{response[index]}</h3>
                <p> <span onClick={(e) => {
                  setFeedbackStatus("correct");
                }}><ImCheckmark style={{ height: "30px" }} /></span>
                  <span onClick={(e) => {
                    setFeedbackStatus("Wrong");
                  }}><ImCross style={{ height: "25px" }} /></span>
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
            onChange={
              uploadImage
            }
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
