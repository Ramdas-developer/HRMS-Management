import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import AddCandidate from "./AddCandidate";

const Candidate = () => {
  const BackendUrl = process.env.REACT_APP_BACKEND_URL;
  const [showModel, setShowModel] = useState();
  const [candidates, setCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState();
  const [FilteredCandidate, setFilteredCandidate] = useState([]);

  const AllCandidate = async (page = 1) => {
    try {
      const response = await axios.get(`${BackendUrl}/allcandidate?page=${page}&limit=10`);
      console.log("Response :", response);
      console.log("api Response :", response.data);

      if (Array.isArray(response.data.All_candidate)) {
        setCandidates(response.data.All_candidate);
        setFilteredCandidate(response.data.All_candidate);
      } else {
        console.error("Unexpected response format:", response.data);
        setCandidates([]);
        setFilteredCandidate([]);
      }
    } catch (error) {
      console.log("Error fetching candidate :", error);
      setCandidates([]);
      setFilteredCandidate([]);
    }
  };
  console.log("candidate:", candidates);

  useEffect(() => {
    AllCandidate();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    console.log("query:", query);

    const filtered = candidates.filter(
      (person) =>
        person.name.toLowerCase().includes(query) ||
        person.email.toLowerCase().includes(query) ||
        String(person.phone).includes(query) ||
        person.position.toLowerCase().includes(query)||
        person.experience.toLowerCase().includes(query)
    );
    setFilteredCandidate(filtered);
    console.log("filtered:", filtered);
  };

  const handleDownloadResume = async (candidateId) => {
    try {
      const response = await axios.get(
        `${BackendUrl}/download/${candidateId}`,
        { responseType: "blob" }
      );
      // Create a Blob URL for the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${candidateId}_resume.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading resume:", error);
    }
  };

  return (
    <div className="candidates">
      <div className="filters">
        <h2>Candidate</h2>
        <select>
          <option>All</option>
          <option>Fresher</option>
          <option>Experienced</option>
        </select>
        <div className="nav-end">
          <input
            className="candidate-search"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button
            className="button-addcandidate"
            onClick={() => setShowModel(true)}
          >
            Add New Candidate
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Sr. no.</th>
            <th>Candidate Name</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Profile</th>
            <th>Experience</th>
            <th>Resume</th>
          </tr>
        </thead>
        <tbody>
          {FilteredCandidate &&
            FilteredCandidate.map((candidate, index) => (
              <tr key={candidate._id || index}>
                <td>{index + 1}</td>
                <td>{candidate.name}</td>
                <td>{candidate.email}</td>
                <td>{candidate.phone}</td>
                <td>{candidate.position}</td>
                <td>{candidate.experience}</td>
                <td>
                  <button
                    className="download-btn"
                    onClick={() => handleDownloadResume(candidate._id)}
                  >
                    📥
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal
        show={showModel}
        onHide={() => setShowModel(false)}
        centered
        style={{}}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body
          style={{
            padding: "20px",
            maxHeight: "90%",
            height: "600px",
            maxWidth: "100%",
            width: "900px",
            borderRadius: "10px",
          }}
        >
          <AddCandidate />
        </Modal.Body>
      </Modal>
      <Outlet />
    </div>
  );
};

export default Candidate;
