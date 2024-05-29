import React, { useState } from "react";
import "./NewClass.css"; // Import your CSS file
import ClassImage from "./../../../assets/logo.png"; // Predetermined image

const NewClass = ({ onSubmit }) => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseNumber, setCourseNumber] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Generate a unique ID (replace with your preferred method)
    const id = Math.random().toString(36).substring(2, 15);

    const backgroundImage = coverImage ? URL.createObjectURL(coverImage) : ClassImage;

    const newItem = {
      id,
      title: courseTitle,
      backgroundImage,
    };
    onSubmit(newItem); // Call the prop function with the new class data
    setCourseTitle("");
    setCourseNumber("");
    setCoverImage(null); // Reset form after submission
  };

  return (
    <div className="new-class-container">
      <h1>Create Classroom</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="course-title">Course Title:</label>
        <input type="text" id="course-title" name="courseTitle" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} required />

        <label htmlFor="course-number">Course Number:</label>
        <input type="text" id="course-number" name="courseNumber" value={courseNumber} onChange={(e) => setCourseNumber(e.target.value)} required />

        <label htmlFor="cover-image">Cover Image:</label>
        <input
          type="file"
          id="cover-image"
          name="coverImage"
          onChange={(e) => setCoverImage(e.target.files[0])} // Access the first selected file
        />

        <button type="submit">Create Classroom</button>
      </form>
    </div>
  );
};

export default NewClass;
