import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import "./edit.css"

export const Edit = () => {
    const [state, setState] = useState(null);
    // const [data, setData] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    
    const {id} = useParams();
    const navigate = useNavigate()
    
    useEffect(() => {
      const callBackendAPI = async () => {
        const response = await fetch(`http://localhost:8080/api/superhero/${id}`);
        const body = await response.json();
          
        if (response.status !== 200) {
          throw Error(body.message)
        }
        return body;
      };

      callBackendAPI()
      .then(res => setState([res]))
      .catch(err => console.log(err));
  }, [id])



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

    const handleCancel = () => {
        navigate("/")
    }

    const handleChange = (e) => {
      setState([{ ...state, [e.target.name]: e.target.value }]);
    }

    function deleteHandler(image) {
      setSelectedImages(selectedImages.filter((e) => e !== image));
      URL.revokeObjectURL(image);
    }

    return (
        <div className="edit-wrap">
        {state ? 
          state.map(hero => (
            <div className="edit-container" key={hero.id + "1"}>
              <div className="edit-left"> 
                <div className="form-group">
                <div className="edit-inputs-container">
                  <input
                    className="edit-input"
                    type="text"
                    name="nickname"
                    value={ hero.nickname }
                    onChange={handleChange}
                  />
                  <input
                    className="edit-input"
                    type="text"
                    name="real_name"
                    value={ hero.real_name }
                    onChange={handleChange}
                  />
                  <textarea
                    className="edit-input"
                    type="text"
                    name="origin_description"
                    value={ hero.origin_description}
                    onChange={handleChange}
                  />
                  <input
                    className="edit-input"
                    type="text"
                    name="superpowers"
                    value={ hero.superpowers }
                     onChange={handleChange}
                  />
                  <textarea
                    className="edit-input "
                    type="text"
                    name="catch_phrase"
                    value={ hero.catch_phrase}
                    onChange={handleChange}
                  />
                </div>

                  <div className="edit-button-container">
                    <button className="hero-button edit">SUBMIT</button> 
                    <button className="hero-button edit" onClick={()=>{handleCancel()}}>CANCEL</button>
                  </div>

                </div>
              </div>
              <div className="edit-right">
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
              </div>
            </div>
          ))
         : null}
    </div>
    )
}
