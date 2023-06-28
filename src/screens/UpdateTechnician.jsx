import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ImageComponent from '../components/ImageComponent';

const UpdateTechnician = ({ onLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [technician, setTechnician] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [price, setPrice] = useState(0);
  const [available, setAvailable] = useState(false);
  const [popular, setPopular] = useState(false);
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTechnician();
    fetchCategories();
  }, []);

  const fetchTechnician = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://technicians.onrender.com/technicians/${id}`);
      const technicianData = response.data;
      setTechnician(technicianData);
      setName(technicianData.name);
      setEmail(technicianData.email);
      setPhone(technicianData.phone);
      setLocation(technicianData.location);
      setCategoryId(technicianData.category._id);
      setFrom(technicianData.from);
      setTo(technicianData.to);
      setPrice(technicianData.price);
      setAvailable(technicianData.available);
      setPopular(technicianData.popular);
      setImage(technicianData.image);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching technician:', error);
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://technicians.onrender.com/categories');
      setCategories(response.data);
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };

  const handleUpdateTechnician = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('location', location);
      formData.append('category', categoryId);
      formData.append('from', from);
      formData.append('to', to);
      formData.append('price', price);
      formData.append('available', available);
      formData.append('popular', popular);
      formData.append('image', image);

      await axios.put(`https://technicians.onrender.com0/technicians/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/technicians');
    } catch (error) {
      console.log('Error updating technician:', error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(file);
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Navbar onLogout={onLogout} />

      <div className="container">
        <h2 className="mt-3">Update Technician</h2>

        {isLoading ? (
          <p>Loading technician data...</p>
        ) : (
          <form onSubmit={handleUpdateTechnician}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                className="form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                className="form-control"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>From</label>
              <input
                type="number"
                className="form-control"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>To</label>
              <input
                type="number"
                className="form-control"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Available</label>
              <div className="form-check">
                <input
                  type="radio"
                  id="available-yes"
                  className="form-check-input"
                  value={true}
                  checked={available}
                  onChange={() => setAvailable(true)}
                />
                <label className="form-check-label" htmlFor="available-yes">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="available-no"
                  className="form-check-input"
                  value={false}
                  checked={!available}
                  onChange={() => setAvailable(false)}
                />
                <label className="form-check-label" htmlFor="available-no">
                  No
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Popular</label>
              <div className="form-check">
                <input
                  type="radio"
                  id="popular-yes"
                  className="form-check-input"
                  value={true}
                  checked={popular}
                  onChange={() => setPopular(true)}
                />
                <label className="form-check-label" htmlFor="popular-yes">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="popular-no"
                  className="form-check-input"
                  value={false}
                  checked={!popular}
                  onChange={() => setPopular(false)}
                />
                <label className="form-check-label" htmlFor="popular-no">
                  No
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="form-control-file"
                onChange={handleImageUpload}
              />
              {previewImage == '' ? (<ImageComponent base64Image={technician.image}/>) : (
                <img src={previewImage} alt="Preview" style={{ width: '200px', marginTop: '10px' }} />
              )}
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button type="submit" className="btn btn-primary">
                Update Technician
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default UpdateTechnician;
