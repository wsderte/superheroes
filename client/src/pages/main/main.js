import React, {useEffect, useState} from 'react'

export const Main = () => {
     const [state, setState] = useState(null);
      
      // useEffect(() => {
      //   const callBackendAPI = async () => {
      //     const response = await fetch('http://localhost:8080/api/superhero');
      //     const body = await response.json();
          
      //     console.log(body);

      //     if (response.status !== 200) {
      //       throw Error(body.message)
      //     }
      //     return body;
      //   };

      //   callBackendAPI()
      //   .then(res => setState(res.express))
      //   .catch(err => console.log(err));
      // }, [])

  return (
    <div>
        <div> MAIN </div>
        {state}
    </div>

  )
}
