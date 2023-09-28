import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./edit.css"
import { SelectedImages } from './../../components/selectedImages/selectedImages';

export const Edit = () => {
    const [state, setState] = useState(null);
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
      .then(res => setState(res))
      .catch(err => console.log(err));
    }, [id])

    const onSelectFile = (e) => {
      e.preventDefault();
      const selectedFiles = e.target.files;
      const selectedFilesArray = Array.from(selectedFiles);
  
      const imagesArray = selectedFilesArray.map((file) => {
        return [URL.createObjectURL(file), file]
      });
  
      setSelectedImages((previousImages) => previousImages.concat(imagesArray));
      e.target.value = "";
    };

    const handleCancel = () => {
        navigate("/")
    }

    const handleChange = (e) => {
      e.preventDefault();
      setState({ ...state, [e.target.name]: e.target.value });
      // setImagesToUpdate([{ ...state, [e.target.name]: e.target.value }]);
    }

    const deleteStateHandler = (image) => {
      setState({...state, "images": state.images.filter((elem) => elem !== image)});
      // console.log(state)
    }

    const deleteHandler = (image) => {
      setSelectedImages(selectedImages.filter((elem) => elem[0] !== image));
      // setImagesToUpdate(imagesToUpdate.filter((elem) => elem !== image));
      URL.revokeObjectURL(image);
    }

    const changeFile = async (e) => {
      e.preventDefault();
      let formData = new FormData();

      formData.append("nickname", state.nickname)
      formData.append("real_name", state.real_name)
      formData.append("origin_description", state.origin_description)
      formData.append("superpowers", state.superpowers)
      formData.append("catch_phrase", state.catch_phrase)
      formData.append("images", state.images)
      // formData.append("image", image)
      selectedImages.forEach((image, index) => {
        formData.append(`image`, image[1]);
      });
      console.log(formData)
  
      axios.put(`http://localhost:8080/api/superhero/${id}`, formData,  {
            headers:{
              'content-Type': 'multipart/form-data'
            }  
      }).then(res => {
          setState(res.data)
          setSelectedImages([])
          console.log(res.data, "RESULT")
       }).catch(err => {
        console.log(err.massage)
       })
  
  
      // setImage(response)
      // const body = await response.json();
      // console.log(response)
    }
  

    return (
        <div className="edit-wrap">
        {state ? 
            <div className="edit-container" key={state.id + "1"}>
              <div className="edit-left"> 
                <div className="form-group">
                <div className="edit-inputs-container">
                  <input
                    className="edit-input"
                    type="text"
                    name="nickname"
                    value={ state.nickname }
                    onChange={(e) => handleChange(e)}
                  />
                  <input
                    className="edit-input"
                    type="text"
                    name="real_name"
                    value={ state.real_name }
                    onChange={(e) => handleChange(e)}
                  />
                  <textarea
                    className="edit-input"
                    type="text"
                    name="origin_description"
                    value={ state.origin_description}
                    onChange={(e) => handleChange(e)}
                  />
                  <textarea
                    className="edit-input"
                    type="text"
                    name="superpowers"
                    value={ state.superpowers }
                    onChange={(e) => handleChange(e)}
                  />
                  <textarea
                    className="edit-input "
                    type="text"
                    name="catch_phrase"
                    value={ state.catch_phrase}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                  <div className="edit-button-container">
                    <button className="hero-button edit" onClick={(e)=>changeFile(e)}>SUBMIT</button> 
                    <button className="hero-button edit" onClick={()=>handleCancel()}>CANCEL</button>
                  </div>
                </div>
              </div>

              <div className="edit-right">
                <label>
                  + Add Images
                  <span>up to 8 images</span>
                  <input
                  type="file"
                  name="images"
                  onChange={ onSelectFile}
                  multiple
                  accept="image/png , image/jpeg, image/webp"
                  />
                </label>

                <div className="images">
                  <SelectedImages images={state.images} deleteState={deleteStateHandler} isSub={false}/>
                  <SelectedImages images={selectedImages} deleteState={deleteHandler} isSub={true}/>
                </div>
              </div>

            </div>
         : null}
    </div>
    )
}
