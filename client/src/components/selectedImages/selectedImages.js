import React from 'react'
import "./selectedImages.css"

export const SelectedImages = ({images, doWithState, isSub, cantDelete}) => {
    return (
    <>
        {images ?
            images.map((image, index) => (
                <div key={isSub? image[0] : image} className="image">
                    <img src={isSub? image[0] : image} height="140" width="140" alt="upload" />
                    {cantDelete ? null :
                    <button onClick={() => doWithState(isSub? image[0] : image)}>
                        delete image
                    </button>
                    }
                    {/* <p>{index + 1}</p> */}
                </div>
            )
        ): null}
    </>
  )
}
