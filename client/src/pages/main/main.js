import React, {useEffect, useState} from 'react'
// import { Link } from 'react-router-dom';
import "./main.css"
import { Pagination } from '../../components/pagination/pagination';
import { HeroList } from '../../components/heroList/heroList';

export const Main = () => {
    const [state, setState] = useState(null);
    const [currentPage, setCurrentPage] = useState("1");
    const [totalPages, setTotalPages] = useState(1);

    const newArray = []
    for(let i=1; i<= totalPages; i++) {
      newArray.push(i)
    }

    useEffect(() => {
        const callBackendAPI = async () => {
          const response = await fetch(`http://localhost:8080/api/superhero/all/${currentPage}`);
          const body = await response.json();
        
          if (response.status !== 200) throw Error(body.message)

          return body;
        };

        callBackendAPI()
          .then(res => {
            setState(res.superhero)
            setTotalPages(res.totalPages)
          })
          .catch(err => console.log(err));
    }, [currentPage])

  return (
    <>
      <div className="main-wrap">
        <HeroList state={state}/>
      </div>
        <Pagination array={newArray} handler={setCurrentPage} />
    </>
  )
}

