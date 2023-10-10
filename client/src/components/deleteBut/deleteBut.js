import React from 'react'
import { useNavigate } from "react-router-dom";
import { useFetch } from './../../hook/useFetch';

export const DeleteBut = ({id}) => {
    const navigate = useNavigate()
    const {del} = useFetch();

    const deleteHandler = async () => {
        await del(`http://localhost:8080/api/superhero/${id}`);
        navigate("/")
    }

  return (
    <button 
        className="hero-button more" 
        onClick={()=>{deleteHandler()}}
        >
        DELETE 
    </button>
  )
}
