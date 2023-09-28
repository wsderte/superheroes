import React from 'react'
import "./upload.css"

export default function Upload({ setSelectedImages }) {
  const onSelectFile = (e) => {
    e.preventDefault();
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return [URL.createObjectURL(file), file]
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    e.target.value = "";
  };

  return (
    <div>
        <label>
                + Add Images
                <span>up to 8 images</span>
                <input
                type="file"
                name="images"
                onChange={ onSelectFile}
                multiple
                accept="image/png , image/jpeg, image/webp"
                />
        </label>
    </div>
  )
}
