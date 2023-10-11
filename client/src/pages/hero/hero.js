import React, { useEffect } from 'react'
import {Link, useParams } from "react-router-dom";
import { SelectedImages } from './../../components/selectedImages/selectedImages';
import { useFetch } from './../../hook/useFetch';
import "./hero.css"
import { DeleteBut } from '../../components/deleteBut/deleteBut';

export const Hero = () => {
    const {id} = useParams();

    const {data: hero, get, loading, error } = useFetch();

    useEffect(() => {
      get(`http://localhost:8080/api/superhero/${id}`);
    }, [get, id]);

    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
        <div className="hero-wrap">
          {hero?.nickname ? 
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
                    <DeleteBut id ={id}/>
                </div>
              </div>

              <div className="hero-right">
                <img className="hero-image" height="320" width="380" src={hero.images[0]} alt="img"/>
                <div className="images">
                  <SelectedImages images={hero.images} doWithState={()=>{}} isSub={false} cantDelete={true}/>
                </div>
              </div>

            </div>
          
          : null}
      </div>
    )
}
