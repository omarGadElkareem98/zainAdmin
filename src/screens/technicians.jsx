import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import ImageComponent from '../components/ImageComponent';
import { Modal, Button, Spinner, Table, Pagination } from 'react-bootstrap';

const Technicians = ({ onLogout }) => {
  const [technicians, setTechnicians] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTechnicianId, setSelectedTechnicianId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [techniciansPerPage] = useState(10);

  useEffect(() => {
    fetchTechnicians();
  }, []);

  const fetchTechnicians = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://technicians.onrender.com/technicians');
      setTechnicians(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching technicians:', error);
      setIsLoading(false);
    }
  };

  const handleDeleteTechnician = (id) => {
    setSelectedTechnicianId(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTechnicianId) {
      axios
        .delete(`https://technicians.onrender.com/technicians/${selectedTechnicianId}`)
        .then(() => {
          fetchTechnicians();
          handleCloseModal();
        })
        .catch((error) => {
          console.log('Error deleting technician:', error);
          handleCloseModal();
        });
    }
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
    setSelectedTechnicianId(null);
  };

  // Get current technicians
  const indexOfLastTechnician = currentPage * techniciansPerPage;
  const indexOfFirstTechnician = indexOfLastTechnician - techniciansPerPage;
  const currentTechnicians = technicians.slice(
    indexOfFirstTechnician,
    indexOfLastTechnician
  );

  // Change page
  const handlePaginationClick = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(technicians.length / techniciansPerPage);

  return (
    <>
      <Navbar onLogout={onLogout} />

      <div className="container">
        <div className="d-flex justify-content-end mb-3 mt-3">
          <Link to="/technicians/create" className="btn btn-primary">
            Create Technician
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p>Loading technicians...</p>
          </div>
        ) : (
          <>
            <Table striped bordered hover responsive style={{ textAlign:'center' }}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Completed</th>
                  <th>Rating</th>
                  <th>Category</th>
                  <th>Popular</th>
                  <th>Available</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentTechnicians.map((technician) => (
                  <tr key={technician._id}>
                    <td className="text-center">
                      {technician.image && (
                        <ImageComponent base64Image={technician.image} />
                      )}
                    </td>
                    <td className="text-center">{technician.name}</td>
                    <td className="text-center">{technician.email}</td>
                    <td className="text-center">{technician.phone}</td>
                    <td className="text-center">{technician.location}</td>
                    <td className="text-center">
                      {technician.numServicesDone}
                    </td>
                    <td className="text-center">{technician.rating}</td>
                    <td className="text-center">{technician.category.name}</td>
                    <td className="text-center">{technician.popular ? 'Yes' : 'No'}</td>
                    <td className="text-center">{technician.available ? 'Yes' : 'No'}</td>
                    
                    <td className="text-center">
                      <div className="d-flex justify-content-center">
                        <Link
                          to={`/updateTechnicians/${technician._id}`}
                          className="btn btn-info me-2"
                        >
                          Update
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteTechnician(technician._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Pagination>
              {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePaginationClick(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </>
        )}

        <Modal show={showConfirmModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this technician?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Technicians;
