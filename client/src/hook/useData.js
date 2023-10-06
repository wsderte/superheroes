import {useEffect, useState} from 'react'

const apiEndpoint = `http://localhost:8080/api/superhero/all/`

export const useData = (currentPage) => {
    const [data, setData] = useState();
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const callBackendAPI = async () => {
        try {
          setLoading(true);
          setError(null);
          const response = await fetch(apiEndpoint + `${currentPage}`);
          const body = await response.json();
      
          if (response.status !== 200) throw new Error(body.message)

          setData(body.superhero)
          setTotalPages(body.totalPages)
        } catch (error) {
            setError(error.message || 'An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
      };

      callBackendAPI()
  }, [currentPage])


    return { data, totalPages, loading, error };
  };