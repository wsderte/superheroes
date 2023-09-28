import { useState } from 'react'
import axios from 'axios';
import { SelectedImages } from './../../components/selectedImages/selectedImages';
import { Form } from '../../components/form/Form';
import Upload from './../../components/upload/upload';
import { NavigateButton } from './../../components/navigateButton/navigateButton';
import { generateForm } from './../../utils/createForm';
import { checkData } from './../../utils/checkData';
import { useNavigate } from "react-router-dom";
import "./create.css"

export const Create = () => {
    const [state, setState] = useState({
        id: "111",
        nickname:"",
        real_name:"",
        origin_description:"",
        superpowers:"",
        catch_phrase:"",
        images: []
    });
    const [selectedImages, setSelectedImages] = useState([]);
    const [fieldsError, setFieldsError] = useState("");
    
    let imagesLength = selectedImages.length || 0;

    if(state?.images.length){
      imagesLength += state.images.length
    }

    const navigate = useNavigate()

    const deleteStateHandler = (image) => {
      setState({...state, "images": state.images.filter((elem) => elem !== image)});
    }

    const deleteHandler = (image) => {
      setSelectedImages(selectedImages.filter((elem) => elem[0] !== image));
      URL.revokeObjectURL(image);
    }

    const sendFile = async (e) => {
      e.preventDefault();
      if(checkData(state, selectedImages)){
        let formData = generateForm(state, selectedImages)
        console.log(formData, "form with util")
        setFieldsError("")

        axios.post(`http://localhost:8080/api/superhero/`, formData,  {
            headers:{
              'content-Type': 'multipart/form-data'
            }  
        }).then(res => {
          navigate("/")
          // console.log(res.data, "RESULT")
        }).catch(err => {
          console.log(err.massage)
          setFieldsError(err.massage)
        })
      } else {
        setFieldsError("Please, fill all fields")
      }
    }
  
    return (
        <div className="edit-wrap">
        {state ? 
            <div className="edit-container" key={state.id + "1"}>
              <div className="edit-left"> 
                <div className="form-group">
                  <Form  state={state} set={setState} />
                  {fieldsError ? <div className="form-error">{fieldsError}</div> : null}
                  <div className="edit-button-container">
                    <button className="hero-button edit" onClick={(e)=>sendFile(e)}>SUBMIT</button> 
                    <NavigateButton link={"/"} text={"CANCEL"}/>
                  </div>
                </div>
              </div>

              <div className="edit-right">
                <Upload setSelectedImages={setSelectedImages}/>
                {imagesLength > 8 ?
                 <div className="aw">Can handle only 8 images</div> 
                  : imagesLength}
                <div className="images">
                  <SelectedImages images={state.images} doWithState={deleteStateHandler} isSub={false}/>
                  <SelectedImages images={selectedImages} doWithState={deleteHandler} isSub={true}/>
                </div>
              </div>
            </div>
         : null}
    </div>
    )
}
