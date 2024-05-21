import React, { useState } from "react";
import { Box } from "@mui/material";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from "@/shared/api/firebaseConfig";





export const Admin = () => {



  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");


  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress function...
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Complete function...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
            console.log('File available at', downloadURL);
          });
        }
      );
    }
  };

  return (
    <Box>
      <div>
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleUpload}>Upload</button>
        <br />
        {url && <img src={url} alt="Uploaded" />}
      </div>
    </Box>

  );
};
