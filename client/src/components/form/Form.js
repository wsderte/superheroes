import React from 'react'

export const Form = ({state, set}) => {
    const handleChange = (e) => {
        e.preventDefault();
        set({ ...state, [e.target.name]: e.target.value });
        // setImagesToUpdate([{ ...state, [e.target.name]: e.target.value }]);
      }

    return (
        <div className="edit-inputs-container">
                  <input
                    className="edit-input"
                    type="text"
                    name="nickname"
                    value={ state.nickname }
                    onChange={(e) => handleChange(e)}
                  />
                  <input
                    className="edit-input"
                    type="text"
                    name="real_name"
                    value={ state.real_name }
                    onChange={(e) => handleChange(e)}
                  />
                  <textarea
                    className="edit-input"
                    type="text"
                    name="origin_description"
                    value={ state.origin_description}
                    onChange={(e) => handleChange(e)}
                  />
                  <textarea
                    className="edit-input"
                    type="text"
                    name="superpowers"
                    value={ state.superpowers }
                    onChange={(e) => handleChange(e)}
                  />
                  <textarea
                    className="edit-input "
                    type="text"
                    name="catch_phrase"
                    value={ state.catch_phrase}
                    onChange={(e) => handleChange(e)}
                  />
         </div>

    )
}
