import React, { useState } from "react";
import "./hero.css";

export const Hero = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [formData, setFormData] = useState([]);
  

  const onSelectFile = (event) => {
    event.preventDefault();
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    console.log(selectedImages)
    // FOR BUG IN CHROME
    event.target.value = "";
  };

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  const postHandler = async () =>{
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ 
    //         nickname: "nicknamenew",
    //         real_name: "real_name",
    //         origin_description: "origin_description",
    //         superpowers: "superpowers",
    //         catch_phrase: "catch_phrase",
    //         images: selectedImages,
    //     })
    // };

    // const response = await fetch('http://localhost:8080/api/superhero', requestOptions)
  
    // const body = await response.json();
    // console.log(body);
    // // setSelectedImages((previousImages) => previousImages.concat(body.images[0]))

    // if (response.status !== 201) {
    //   // throw Error(body.message)
    //   console.log(body.message);
    // }
    // return body;
  }

  return (
    <section>
      <label>
        + Add Images
        <span>up to 10 images</span>
        <input
          type="file"
          name="images"
          onChange={onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp"
        />
      </label>
      <br />

        <input type="file" multiple />

        {selectedImages.length > 0 ?   
            <button
                className="upload-btn"
                onClick={() => {
                    console.log(selectedImages);
                }}
            >
                UPLOAD {selectedImages.length} IMAGE
                {selectedImages.length === 1 ? "" : "S"}
            </button> : null
        }

        <br />

        <button
                className="upload-btn"
                onClick={() => postHandler()}>
        POST
        </button>

        <input 
          onChange={(e) => setFormData({...formData, title: e.target.value})} 
          value={formData.title} 
          type="text"  
          className="title" 
        /> 

      <div className="images">
        {selectedImages &&
          selectedImages.map((image, index) => {
            return (
              <div key={image} className="image">
                <img src={image} height="120" width="120" alt="upload" />
                <button onClick={() => deleteHandler(image)}>
                  delete image
                </button>
                <p>{index + 1}</p>
              </div>
            );
          })}
      </div>
    </section>
  );
};

