import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import "./main.css"

export const Main = () => {
    const [state, setState] = useState(null);
    
    useEffect(() => {
        const callBackendAPI = async () => {
          const response = await fetch('http://localhost:8080/api/superhero');
          const body = await response.json();
        
          if (response.status !== 200) {
            throw Error(body.message)
          }
          return body;
        };

        callBackendAPI()
        .then(res => setState(res))
        .catch(err => console.log(err));
    }, [])

  return (
    <div className="main-wrap">
        {state ? 
          state.map(hero => (
            <div className="main-container" key={hero.id + hero.nickname}>
              <img className="main-image" height="220" width="280" src={hero.images[0]} alt="img"/>
              <div className="main-card">
                <div className="main-nickname">{hero.nickname}</div> 
                <div className="main-btn-container">
                  <Link to={`/hero/${hero._id}`}>
                    <button className="main-button more">MORE </button>
                  </Link>
                  <Link to={`/edit/${hero._id}`}>
                    <button className="main-button edit">EDIT</button> 
                  </Link>
                </div>
              </div>
            </div>
          ))
         : null}
    </div>
  )
}

