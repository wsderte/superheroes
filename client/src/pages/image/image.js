import React, {useEffect, useState} from 'react'
import "./image.css"
import axios from 'axios';

export const Image = () => {
  const [state, setState] = useState(null);
  const [image, setImage] = useState([]); 

  const onSelectFile = (event) => {
    event.preventDefault();
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return file;
    });

    setImage((previousImages) => previousImages.concat(imagesArray));
    console.log(image)
    // FOR BUG IN CHROME
    event.target.value = "";
  };

  const sendFile = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("nickname", "nickname")
    formData.append("real_name", "real_name")
    formData.append("origin_description", "origin_description")
    formData.append("superpowers", "superpowers")
    formData.append("catch_phrase", "catch_phrase")
    // formData.append("image", image)
    image.forEach((images, index) => {
      formData.append(`image`, images);
    });
    console.log(formData)

    // try {
    //   const res = await axios.get(`http://localhost:8080/api/superhero`);
    // } catch (error) {
    //   console.log(err.massage)
    // }

    axios.post("http://localhost:8080/api/superhero", formData,  {
          headers:{
            'content-Type': 'multipart/form-data'
          }  
    }).then(res => {
      setState(res.data)
      console.log(res.data)
      // setImage(res.data?.images[0])
     }).catch(err => {
      console.log(err.massage)
     })


    // setImage(response)
    // const body = await response.json();
    // console.log(response)
  }

  const changeFile = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("nickname", "123")
    formData.append("real_name", "real_name")
    formData.append("origin_description", "origin_description")
    formData.append("superpowers", "superpowers")
    formData.append("catch_phrase", "catch_phrase")
    // formData.append("image", image)
    image.forEach((images, index) => {
      formData.append(`image`, images);
    });
    console.log(formData)

    axios.put("http://localhost:8080/api/superhero", formData,  {
          headers:{
            'content-Type': 'multipart/form-data'
          }  
    }).then(res => {
        setState(res.data)
        console.log(res.data)
      // setImage(res.data?.images[0])
     }).catch(err => {
      console.log(err.massage)
     })


    // setImage(response)
    // const body = await response.json();
    // console.log(response)
  }



  return (
    <div className="image-container">
        <div>
          {image[0] ? 
            <img className="image" height="120" width="120" src={image[0]} alt="avatar"/>
          : null}
        </div>
        <span>up to 4 images</span>
        <input 
          className="image-input" 
          type="file" 
          multiple 
          onChange={e=> onSelectFile(e)} 
          accept="image/png , image/jpeg" 
        />

      {/* <label>
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
      */}

        <button className="btn" onClick={(e)=>sendFile(e)}> POST</button>
        <button className="btn" onClick={(e)=>changeFile(e)}> PUT</button>
    </div>

  )
}
