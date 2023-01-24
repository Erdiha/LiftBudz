import React, { useState } from 'react';

const Settings = () => {
  const [profileData, setProfileData] = useState({
    id: '',
    name: '',
    mobile: '',
    age: '',
    bio: '',
    email: '',
    location: '',
    profileImage: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form>
      <label>
        ID:
        <input
          type="text"
          name="id"
          value={profileData.id}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={profileData.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Mobile:
        <input
          type="text"
          name="mobile"
          value={profileData.mobile}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Age:
        <input
          type="text"
          name="age"
          value={profileData.age}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Bio:
        <input
          type="text"
          name="bio"
          value={profileData.bio}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={profileData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={profileData.location}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Profile Image:
        <input
          type="text"
          name="profileImage"
          value={profileData.profileImage}
          onChange={handleChange}
        />
      </label>
      <br />
    </form>
  );
};

export default Settings;
