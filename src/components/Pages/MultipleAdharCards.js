import React, { useRef } from "react";
import { useState } from "react";
import MultipleService from "../../service/MultipleService";
import "../../css/NavBar.css"
import "../../css/Single.css"
import { LoadingBar } from "../LoadingBar";
import 'react-circular-progressbar/dist/styles.css';
import { ImCheckmark, ImCross } from "react-icons/im";
import Swal from 'sweetalert2'

export const MultipleAdharCards = () => {

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

    const images = e.target.files;
    const uniqueFiles = Array.from([...img, ...images]).reduce((unique, file) => {
      const fileExists = unique.some((item) => item.name === file.name);
      return fileExists ? unique : [...unique, file];
    }, []);

    setImg(uniqueFiles);

    const imagesArray = Array.from(uniqueFiles).map((file) => URL.createObjectURL(file));
    setPreviewImages([...imagesArray]);
  }

  //formData object 
  const formData = new FormData();

  img.forEach((file) => {
    formData.append('images', file)
  })

  const clear = (e) => {
    setImg([]);
    setPreviewImages([]);
  }

  const submit = () => {

    if (img.length === 0) {
      Swal.fire({
        icon: "warning",
        title: 'Warning',
        text: "select image!!",
      })

    } else {
      setLoading(true);// on the loading bar

      MultipleService.uploadImage(formData).then(Response => {

        setLoading(false); // off the loading bar
        setStatus(true);
        console.log(Response.data[0].identity);
        // console.log(Response.data.image2.identity);

        setResponse(Response.data)
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
    MultipleService.feedback("correct")
  }

  const wrong = () => {
    MultipleService.feedback("wrong")
  }

  return (
    <div onDragOver={handleDragOver}
      onDrop={handleDrop} className="container-fluid">


      <div className="row">
        <h4 className="col heading">Multiple AdharCard</h4>
        <div className="col button">
          <div class="btn-group" role="group" aria-label="Basic example" >
            <button type="button" className="btn btn-danger show" onClick={clear}>Clear </button>
            <button type="file" className=" btn btn-primary show" onClick={() => inputRef.current.click()}>Upload Image</button>
            <button type="button" className="btn btn-success  show" onClick={submit}>Submit </button>
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
                <h3>{response[index].identity}</h3>
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
            onChange={(e) => {
              uploadImage(e);
            }}
            hidden
            multiple
            ref={inputRef} />

        </label>

      </div>
    </div >
  );
};
