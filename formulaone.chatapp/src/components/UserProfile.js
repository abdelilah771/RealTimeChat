import React, { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UserProfile = ({ user, setUser }) => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(user?.photoURL || "");

  const handleImageUpload = async () => {
    if (!image) return;

    const storageRef = ref(storage, `profileImages/${user.uid}`);
    await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef);

    // Update the user's profile (store this in your backend or Firebase)
    setImageURL(url);
    setUser({ ...user, photoURL: url });
  };

  return (
    <div className="profile-container">
      <h3>Update Profile</h3>
      <img src={imageURL || "/default-avatar.png"} alt="Profile" className="profile-image" />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleImageUpload}>Upload</button>
    </div>
  );
};

export default UserProfile;
