import React from 'react'
import { useNavigate } from "react-router-dom";
import "./navigateButton.css"

export const NavigateButton = ({link, text}) => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(link)
    }

  return (
    <>
        <button className="hero-button edit" onClick={()=>handleNavigate()}>{text}</button>
    </>
  )
}
