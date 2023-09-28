import React from 'react'
import { Link } from 'react-router-dom';
import "./heroList.css"

export const HeroList = ({state}) => {
  return (
    <>
        {state ? 
          state.map(hero => (
            <div className="hero-list--container" key={hero._id}>
              <img className="hero-list--image" height="220" width="280" src={hero.images[0]} alt="img"/>
              <div className="hero-list--card">
                <div className="hero-list--nickname">{hero.nickname}</div> 
                <div className="hero-list--btn-container">
                  <Link to={`/hero/${hero._id}`}>
                    <button className="hero-list--button more">MORE </button>
                  </Link>
                  <Link to={`/edit/${hero._id}`}>
                    <button className="hero-list--button edit">EDIT</button> 
                  </Link>
                </div>
              </div>
            </div>
          ))
         : null}
    </>
  )
}
