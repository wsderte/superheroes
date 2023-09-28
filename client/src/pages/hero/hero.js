import React, { useEffect, useState } from 'react'
import {Link, useParams, useNavigate } from "react-router-dom";
import { SelectedImages } from './../../components/selectedImages/selectedImages';

import "./hero.css"

export const Hero = () => {
    const [state, setState] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate()

    const deleteHandler = async () => {
        const response = await fetch(`http://localhost:8080/api/superhero/${id}`, {
            method: 'DELETE',
        })
        const body = await response.json();
  
        if (response.status !== 200) throw Error(body.message)

        navigate("/")
    }

    useEffect(() => {
        const callBackendAPI = async () => {
          const response = await fetch(`http://localhost:8080/api/superhero/${id}`);
          const body = await response.json();
            
          if (response.status !== 200) throw Error(body.message)

          return body;
        };

        callBackendAPI()
        .then(res => setState([res]))
        .catch(err => console.log(err));
    }, [id])

    return (
        <div className="hero-wrap">
        {state ? 
          state.map(hero => (
            <div className="hero-container" key={hero.id + "0"}>
              <div className="hero-left">
                <h1><span className="hero-span">{"Nickname: "}</span>{hero.nickname}</h1>
                <h1><span className="hero-span"> {"Real name: "}</span>{hero.real_name}</h1>
                <h1><span className="hero-span">{"Origin description: "}</span>{hero.origin_description}</h1>
                <h1><span className="hero-span">{"Superpowers: "}</span>{hero.superpowers}</h1>
                <h1><span className="hero-span">{"Catch_phrase: "}</span>{hero.catch_phrase}</h1>
                <div className="hero-btn-container">
                    <Link to={`/edit/${hero._id}`}>
                        <button className="hero-button edit">EDIT</button> 
                    </Link>
                    <button 
                        className="hero-button more" 
                        onClick={()=>{deleteHandler()}}
                    >
                    DELETE 
                    </button>
                </div>
              </div>

              <div className="hero-right">
                <img className="hero-image" height="320" width="380" src={hero.images[0]} alt="img"/>
                <div className="images">
                  <SelectedImages images={hero.images} doWithState={()=>{}} isSub={false} cantDelete={true}/>
                </div>
              </div>

            </div>
          ))
         : null}
    </div>
    )
}
