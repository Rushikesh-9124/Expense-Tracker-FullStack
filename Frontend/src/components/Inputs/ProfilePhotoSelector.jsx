import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6 ">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={inputRef}
        className="hidden"
      />
      {!image ? <div className="w-25 h-25  flex items-center justify-center bg-purple-100 rounded-full relative">
        <LuUser className="text-4xl text-primary"/>
        <button type="button" className="w-9 h-9 flex items-center justify-center bg-primary hover:bg-violet-600 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer" onClick={onChooseFile}>
            <LuUpload />
        </button>
      </div> : <div className="relative ">
        <img className="w-25 h-25 rounded-full object-cover" src={previewUrl} alt="Profile-Photo" />
        <button className="w-9 h-9 flex items-center justify-center absolute -bottom-1 -right-1 bg-red-500 hover:bg-red-600 rounded-full text-white drop-shadow-2xl cursor-pointer" type="button" onClick={handleRemoveImage}><LuTrash /></button>
        </div>}
    </div>
  );
};

export default ProfilePhotoSelector;
