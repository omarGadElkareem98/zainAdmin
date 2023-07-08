import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://technicians.onrender.com/users',{
        headers:{
          'token':localStorage.getItem('token')
        }
      });

      setUsers(response.data);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://technicians.onrender.com/users/${id}`);
      fetchUsers(); // Refresh the users list after deletion
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  };

  const handleDeleteClick = (id) => {
    setDeletingUserId(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    deleteUser(deletingUserId);
    setShowConfirmModal(false);
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      <Navbar />

      <div className="container">
        {users.length === 0 ? (
          <p>No users available.</p>
        ) : (
          <Table striped bordered hover responsive className="mt-4" style={{ textAlign: 'center' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDeleteClick(user._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <Modal show={showConfirmModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
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

export default Users;
