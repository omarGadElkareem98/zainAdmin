import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import Navbar from '../components/Navbar';

const CreateTechnician = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: null,
    name: '',
    email: '',
    phone: '',
    location: '',
    numServicesDone: 0,
    rating: 0,
    category: '',
    from: '',
    to: '',
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://technicians.onrender.com/categories');
      setCategories(response.data);
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData_x = new FormData();
      formData_x.append('image', formData.image);
      formData_x.append('name', formData.name);
      formData_x.append('email', formData.email);
      formData_x.append('phone', formData.phone);
      formData_x.append('location', formData.location);
      formData_x.append('category', formData.category);
      formData_x.append('from', formData.from);
      formData_x.append('to', formData.to);

      const response = await axios.post('https://technicians.onrender.com0/technicians', formData_x);
      console.log(response);
      navigate('/technicians'); // Redirect to technicians screen after successful creation
    } catch (error) {
      console.log('Error creating technician:', error);
      setError(error.message);
      setShowErrorModal(true);
    }
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Create Technician</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              <label className="custom-file-label" htmlFor="image">
                {formData.image ? formData.image.name : 'Choose Image'}
              </label>
            </div>
            {formData.image && (
              <img src={URL.createObjectURL(formData.image)} alt="Uploaded" className="mt-2 img-thumbnail" style={{ maxWidth: '300px' }} />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              className="form-control"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="from">From</label>
            <input
              type="text"
              className="form-control"
              id="from"
              name="from"
              value={formData.from}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="to">To</label>
            <input
              type="text"
              className="form-control"
              id="to"
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Create Technician
          </button>
        </form>

        <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>An error occurred while creating the technician. Please try again later.</p>
            {error && <p>Error message: {error}</p>}
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleCloseErrorModal}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default CreateTechnician;
