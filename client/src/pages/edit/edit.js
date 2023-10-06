import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import "./edit.css"
import { SelectedImages } from './../../components/selectedImages/selectedImages';
import { Form } from '../../components/form/Form';
import Upload from './../../components/upload/upload';
import { NavigateButton } from './../../components/navigateButton/navigateButton';
import { useNavigate } from "react-router-dom";
import { generateForm } from './../../utils/createForm';
import { checkData } from './../../utils/checkData';

export const Edit = () => {
    const [state, setState] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [fieldsError, setFieldsError] = useState("");
    
    const {id} = useParams();
    const navigate = useNavigate()

    let imagesLength = selectedImages.length || 0;

    if(state?.images.length){
      imagesLength += state.images.length
    }

    useEffect(() => {
      const callBackendAPI = async () => {
        const response = await fetch(`http://localhost:8080/api/superhero/${id}`);
        const body = await response.json();
          
        if (response.status !== 200) throw Error(body.message)
        return body;
      };

      callBackendAPI()
      .then(res => setState(res))
      .catch(err => console.log(err));
    }, [id])

    const deleteStateHandler = (image) => {
      setState({...state, "images": state.images.filter((elem) => elem !== image)});
    }

    const deleteHandler = (image) => {
      setSelectedImages(selectedImages.filter((elem) => elem[0] !== image));
      URL.revokeObjectURL(image);
    }

    const changeFile = async () => {
      if(checkData(state, selectedImages)){
        setFieldsError("")
        let formData = generateForm(state, selectedImages)

        axios.put(`http://localhost:8080/api/superhero/${id}`, formData,  {
            headers:{
              'content-Type': 'multipart/form-data'
            }  
        }).then(res => {
          setState(res.data)
          setSelectedImages([])
          navigate("/")
        }).catch(err => {
          console.log(err.massage)
        })
      } else {
          setFieldsError("Please, Fill all fields")
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
                    <button className="hero-button edit" onClick={(e)=>changeFile(e)}>SUBMIT</button> 
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
