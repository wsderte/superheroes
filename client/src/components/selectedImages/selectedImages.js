import React from 'react'
import "./selectedImages.css"

export const SelectedImages = ({images, deleteState, isSub}) => {
    return (
    <>
        {images ?
            images.map((image, index) => (
                <div key={isSub? image[0] : image} className="image">
                    <img src={isSub? image[0] : image} height="120" width="120" alt="upload" />
                    <button onClick={() => deleteState(isSub? image[0] : image)}>
                        delete image
                    </button>
                    <p>{index + 1}</p>
                </div>
            )
        ): null}
    </>
  )
}
