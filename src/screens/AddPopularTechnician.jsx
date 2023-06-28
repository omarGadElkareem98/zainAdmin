import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../components/Navbar';

const AddPopularTechnicianPage = () => {
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    fetchTechnicians();
  }, []);

  const fetchTechnicians = async () => {
    try {
      const response = await axios.get('https://technicians.onrender.com/technicians');

      setTechnicians(response.data.filter((v) => {
        return v.popular === false;
      }));
    } catch (error) {
      console.error('Failed to fetch technicians:', error);
    }
  };

  const handleAddPopularTechnician = async (technicianId) => {
    try {
      await axios.post('https://technicians.onrender.com/popularTechnicians', { technicianId });
      // Handle successful addition, e.g., show a success message
    } catch (error) {
      console.error('Failed to add popular technician:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div>
      <Navbar />

      {technicians.length === 0 ? (
        <Row className="justify-content-center mt-3">
          <Col xs={6} className="text-center">
            <p>No technicians available to be added as popular technicians.</p>
          </Col>
        </Row>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Technician ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {technicians.map((technician) => (
              <tr key={technician._id}>
                <td>{technician._id}</td>
                <td>{technician.name}</td>
                <td>{technician.category.name}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleAddPopularTechnician(technician._id)}
                  >
                    Add
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AddPopularTechnicianPage;
