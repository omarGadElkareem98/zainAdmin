import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomNavbar from '../components/Navbar';

const PopularTechniciansPage = () => {
  const [popularTechnicians, setPopularTechnicians] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPopularTechnicians();
  }, []);

  const fetchPopularTechnicians = async () => {
    try {
      const response = await axios.get('https://technicians.onrender.com/popularTechnicians');
      setPopularTechnicians(response.data);
    } catch (error) {
      console.error('Failed to fetch popular technicians:', error);
    }
  };

  const handleAddPopularTechnician = async () => {
    navigate('/popularTechnicians/create')
  };

  return (
    <>
            <CustomNavbar />

        <Container>

      <div className="d-flex justify-content-end m-4">
      <Button className="mb-3" variant="primary" onClick={handleAddPopularTechnician}>
        Add Popular Technician
      </Button>
      </div>

      <Table striped bordered hover className='m-4 text-center'>
        <thead>
          <tr>
            <th>Technician ID</th>
            <th>Name</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {popularTechnicians.map((technician) => (
            <tr key={technician._id}>
              <td>{technician._id}</td>
              <td>{technician.name}</td>
              <td>{technician.category.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    </>
  );
};

export default PopularTechniciansPage;
