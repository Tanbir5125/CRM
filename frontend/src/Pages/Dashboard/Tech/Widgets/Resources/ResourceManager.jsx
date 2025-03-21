import React, { useState } from "react";
import { 
  FaFilePdf, FaVideo, FaBook, FaClipboardList, FaPlus, 
  FaPaperPlane, FaTimes, FaUpload, FaFileWord, FaFileAlt 
} from "react-icons/fa";

// Initial Resource Data
const resourcesData = {
  React: [
    { type: "Video", title: "React Crash Course", description: "Beginner's guide to React", link: "https://www.youtube.com/embed/Ke90Tje7VS0" },
    { type: "PDF", title: "React Documentation", description: "Official React docs", link: "#" },
    { type: "Word", title: "React Interview Questions", description: "Common React questions", link: "#" },
  ],
  Python: [
    { type: "Video", title: "Python for Beginners", description: "Learn Python from scratch", link: "https://www.youtube.com/embed/rfscVS0vtbw" },
    { type: "Tutorial", title: "Django Basics", description: "Getting started with Django", link: "#" },
    { type: "Text", title: "Python Cheatsheet", description: "Quick Python reference", link: "#" },
  ],
  Java: [
    { type: "PDF", title: "Java Fundamentals", description: "Core Java concepts", link: "#" },
    { type: "Video", title: "Spring Boot Guide", description: "Introduction to Spring Boot", link: "https://www.youtube.com/embed/9SGDpanrc8U" },
  ],
  "Full Stack": [
    { type: "Video", title: "MERN Stack Guide", description: "Complete MERN tutorial", link: "https://www.youtube.com/embed/7CqJlxBYj-M" },
    { type: "Quiz", title: "Full Stack Quiz", description: "Test your knowledge", link: "#" },
  ],
};

const ResourceManager = () => {
  const [selectedSubject, setSelectedSubject] = useState("React");
  const [resources, setResources] = useState(resourcesData[selectedSubject]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [newResource, setNewResource] = useState({
    type: "Video",
    title: "",
    description: "",
    link: "",
    file: null,
  });

  // Change Subject and Load Resources
  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
    setResources(resourcesData[subject] || []);
  };

  // Handle File Upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewResource({ ...newResource, file, link: URL.createObjectURL(file) });
    }
  };

  // Add New Resource
  const addResource = () => {
    if (!newResource.title || (!newResource.file && !newResource.link)) {
      alert("Please provide a title and either upload a file or add a link.");
      return;
    }

    // Update resources for the selected subject
    const updatedResources = [...resources, newResource];
    setResources(updatedResources);
    setIsModalOpen(false);

    // Reset new resource form
    setNewResource({ type: "Video", title: "", description: "", link: "", file: null });
  };

  // Open Video Modal
  const openVideoModal = (videoLink) => {
    setCurrentVideo(videoLink);
    setIsVideoModalOpen(true);
  };

  // Get Icon Based on Type
  const getIcon = (type) => {
    switch (type) {
      case "Video": return <FaVideo className="text-red-500 text-2xl" />;
      case "PDF": return <FaFilePdf className="text-blue-500 text-2xl" />;
      case "Word": return <FaFileWord className="text-green-500 text-2xl" />;
      case "Tutorial": return <FaBook className="text-yellow-500 text-2xl" />;
      case "Quiz": return <FaClipboardList className="text-purple-500 text-2xl" />;
      case "Text": return <FaFileAlt className="text-gray-500 text-2xl" />;
      default: return <FaFileAlt />;
    }
  };

  return (
    <div className="p-6 bg-background-default text-text-default min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Programming Learning Resources</h1>

      {/* Subject Selection Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {Object.keys(resourcesData).map((subject) => (
          <button
            key={subject}
            className={`px-4 py-2 rounded-md ${selectedSubject === subject ? "bg-primary-dark text-white" : "bg-background-card text-text-muted"} hover:bg-primary-light transition`}
            onClick={() => handleSubjectChange(subject)}
          >
            {subject}
          </button>
        ))}
      </div>

      {/* Add Resource Button */}
      <div className="flex justify-center mb-6">
        <button
          className="flex items-center gap-2 bg-primary-dark text-white px-4 py-2 rounded-md hover:bg-primary-light transition"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus /> Add Resource
        </button>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="bg-background-card p-4 rounded-lg shadow-card text-center cursor-pointer hover:bg-background-hover transition"
            onClick={() => resource.type === "Video" ? openVideoModal(resource.link) : window.open(resource.link, "_blank")}
          >
            <div className="mb-3">{getIcon(resource.type)}</div>
            <h3 className="text-lg font-semibold">{resource.title}</h3>
            <p className="text-text-muted">{resource.description}</p>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && currentVideo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-background-card p-6 rounded-lg shadow-lg w-96 relative">
            <button className="absolute top-2 right-2 text-text-muted hover:text-text-default" onClick={() => setIsVideoModalOpen(false)}>
              <FaTimes />
            </button>
            <h2 className="text-xl font-semibold mb-4">Video Player</h2>
            <iframe className="w-full h-64" src={currentVideo} title="Video Player" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      )}

      {/* Add Resource Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
         <div className="bg-background-card p-6 rounded-lg shadow-lg w-96">
  <h2 className="text-xl font-semibold mb-4">Add New Resource</h2>

  {/* Resource Type Dropdown */}
  <label className="block text-text-muted mb-2">Select Type</label>
  <select
    className="w-full p-2 rounded bg-background-hover text-text-default border border-border-dark mb-3"
    value={newResource.type}
    onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
  >
    <option value="Video">Video</option>
    <option value="PDF">PDF</option>
    <option value="Word">Word</option>
    <option value="Tutorial">Tutorial</option>
    <option value="Quiz">Quiz</option>
    <option value="Text">Text</option>
  </select>

  {/* Title Input */}
  <label className="block text-text-muted mb-2">Title</label>
  <input
    className="w-full p-2 rounded bg-background-hover text-text-default border border-border-dark mb-3"
    placeholder="Enter title"
    value={newResource.title}
    onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
  />

  {/* Description Input */}
  <label className="block text-text-muted mb-2">Description</label>
  <textarea
    className="w-full p-2 rounded bg-background-hover text-text-default border border-border-dark mb-3"
    placeholder="Enter description"
    value={newResource.description}
    onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
  />

  {/* Link Input */}
  <label className="block text-text-muted mb-2">Resource Link (if available)</label>
  <input
    type="url"
    className="w-full p-2 rounded bg-background-hover text-text-default border border-border-dark mb-3"
    placeholder="Paste the link here"
    value={newResource.link}
    onChange={(e) => setNewResource({ ...newResource, link: e.target.value, file: null })}
    disabled={newResource.file !== null} // Disable if file is uploaded
  />

  {/* File Upload */}
  <label className="block text-text-muted mb-2">Upload File (optional)</label>
  <input
    type="file"
    className="w-full p-2 rounded bg-background-hover text-text-default border border-border-dark mb-3"
    onChange={handleFileUpload}
    disabled={newResource.link !== ""} // Disable if link is provided
  />

  {/* Add Resource Button */}
  <button
    className="w-full bg-status-success text-white py-2 rounded-md hover:bg-status-success/90 transition"
    onClick={addResource}
  >
    Add Resource
  </button>
</div>

        </div>
      )}
    </div>
  );
};

export default ResourceManager;
