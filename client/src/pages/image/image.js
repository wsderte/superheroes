import React, {useEffect, useState} from 'react'
import "./image.css"
import logo from "../../logo.svg"
import axios from 'axios';

export const Image = () => {
  const [state, setState] = useState(null);
  const [image, setImage] = useState(null); 

  const sendFile = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("nickname", "nicknamenewaaa")
    formData.append("real_name", "real_name")
    formData.append("origin_description", "origin_description")
    formData.append("superpowers", "superpowers")
    formData.append("catch_phrase", "catch_phrase")
    formData.append("image", image)

    axios.post("http://localhost:8080/api/superhero", formData,  {
          headers:{
            'content-Type': 'multipart/form-data'
          }  
    })
    .then(res => {
      setState(res.data)
      setImage(res.data?.images[0])
     })


    // setImage(response)
    // const body = await response.json();
    // console.log(response)
  }

  return (
    <div className="image-container">
        <div>
          {image ? 
            <img className="image" height="120" width="120" src={image} alt="avatar"/>
          : null}
        </div>
        <input className="image-input" type="file" onChange={(e=> setImage(e.target.files[0]))} />
        <button className="btn" onClick={(e)=>sendFile(e)}> POST</button>
    </div>

  )
}
