import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Modal, Spinner } from 'react-bootstrap';
import CustomNavbar from '../components/Navbar';

const ReservationPage = () => {
  const [reservations, setReservations] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deletingReservationId, setDeletingReservationId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('https://technicians.onrender.com/reservations');
      setReservations(response.data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching reservations:', error);
      setLoading(false);
    }
  };

  const deleteReservation = async (id) => {
    try {
      await axios.delete(`https://technicians.onrender.com/reservations/${id}`);
      fetchReservations(); // Refresh the reservations list after deletion
    } catch (error) {
      console.log('Error deleting reservation:', error);
    }
  };

  const completeReservation = async (id) => {
    try {
        const reservation = reservations.find((item) => item._id === id);

      await axios.post('https://technicians.onrender.com/completedReservations', {
        completeTime:Date.now().toString(),
        user:reservation.userId.name,
        technician:reservation.technicianId.name,
        category:reservation.technicianId.category.name,
        price:reservation.technicianId.price
      });
      await axios.delete(`https://technicians.onrender.com/reservations/${id}`);
      fetchReservations(); // Refresh the reservations list after completion
    } catch (error) {
      console.log('Error completing reservation:', error);
    }
  };

  const handleDeleteClick = (id) => {
    setDeletingReservationId(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    deleteReservation(deletingReservationId);
    setShowConfirmModal(false);
  };

  const handleCompleteClick = (id) => {
    completeReservation(id);
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      <CustomNavbar />

      <div className="container mt-4">
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
            </Spinner>
          </div>
        ) : (
          <>
            {reservations.map((reservation) => (
              <Card key={reservation._id} className="mb-3">
                <Card.Body>
                  <Card.Title>Reservation ID: {reservation._id}</Card.Title>
                  <Card.Text>
                    <strong>User:</strong> {reservation.userId.name}<br />
                    <strong>Technician:</strong> {reservation.technicianId?.name ?? 'Not Found'}<br />
                    <strong>Category:</strong> {reservation.technicianId?.category.name ?? 'Unknown'}<br />
                    <strong>Date:</strong> {reservation.date}<br />
                    <strong>Time:</strong> {reservation.time}<br />
                    <strong>Status:</strong> {reservation.status}
                  </Card.Text>
                  <Button className='me-2' variant="danger" onClick={() => handleDeleteClick(reservation._id)}>Delete</Button>
                  <Button variant="success" onClick={() => handleCompleteClick(reservation._id)}>Complete</Button>
                </Card.Body>
              </Card>
            ))}
          </>
        )}
      </div>

      <Modal show={showConfirmModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this reservation?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="danger" onClick={handleConfirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReservationPage;
