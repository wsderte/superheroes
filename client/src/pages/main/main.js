import { useState} from 'react'
import { Pagination } from '../../components/pagination/pagination';
import { HeroList } from '../../components/heroList/heroList';
import { useData } from './../../hook/useData';
import "./main.css"

export const Main = () => {
  const [currentPage, setCurrentPage] = useState("1");
  const { data, totalPages, loading, error } = useData(currentPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="main-wrap">
        <HeroList state={data}/>
      </div>
        <Pagination totalPages={totalPages} handler={setCurrentPage} />
    </>
  )
}

