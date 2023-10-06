import React from 'react'
import "./pagination.css"

export const Pagination = ({totalPages, handler}) => {
  const array = []
  for(let i=1; i<= totalPages; i++) {
    array.push(i)
  }

  return (
    <>
      <div className='pagination'>
        {array.length > 1 ? array.map(elem=>(
              <div className='pagination-elem' onClick={()=>handler(elem)} key={elem+""}>
                  <span className='pagination-num'>{elem}</span>
              </div> 
        ))
        : null}
      </div>
    </>
  )
}
