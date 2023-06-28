import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import CustomNavbar from '../components/Navbar';

const CompletedReservationsPage = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('https://technicians.onrender.com/completedReservations');
      setReservations(response.data);
    } catch (error) {
      console.log('Error fetching completed reservations:', error);
    }
  };

  const deleteReservation = async (id) => {
    try {
      await axios.delete(`https://technicians.onrender.com/completedReservations/${id}`);
      fetchReservations(); // Refresh the completed reservations list after deletion
    } catch (error) {
      console.log('Error deleting completed reservation:', error);
    }
  };

  return (
    <>
      <CustomNavbar />

      <div className="container mt-4">
        {reservations.length === 0 ? (
          <p className="text-center">No completed reservations yet.</p>
        ) : (
          <Table striped bordered hover style={{ textAlign: 'center' }}>
            <thead>
              <tr>
                <th>Complete Time</th>
                <th>User</th>
                <th>Technician</th>
                <th>Category</th>
                <th>Price</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation._id}>
                  <td>{new Date(+reservation.completeTime).toLocaleString()}</td>
                  <td>{reservation.user}</td>
                  <td>{reservation.technician}</td>
                  <td>{reservation.category}</td>
                  <td>{reservation.price}</td>
                  <td>
                    <Button variant="danger" onClick={() => deleteReservation(reservation._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
};

export default CompletedReservationsPage;
