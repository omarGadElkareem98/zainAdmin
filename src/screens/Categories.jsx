import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImageComponent from '../components/ImageComponent';
import axios from 'axios';
import * as MyNavbar from '../components/Navbar';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Fetch categories from API and update the state
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://technicians.onrender.com/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };

  const handleDeleteCategory = async () => {
    if (selectedCategory) {
      try {
        const response = await axios.delete(`https://technicians.onrender.com/categories/${selectedCategory._id}`);
        if (response.status === 200) {
          console.log('Category deleted successfully');
          // Perform any additional actions after successful deletion
          fetchCategories(); // Refresh the category list
        } else {
          console.log('Error deleting category');
          // Handle error case
        }
      } catch (error) {
        console.log('Error deleting category:', error);
        // Handle error case
      } finally {
        // Reset selectedCategory and close the delete dialog
        setSelectedCategory(null);
        setShowDeleteDialog(false);
      }
    }
  };

  const handleConfirmDelete = (category) => {
    setSelectedCategory(category);
    setShowDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedCategory(null);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <MyNavbar.default />
      
      <Container>
        <div className="d-flex justify-content-end mt-4">
        <Link to="/categories/create">
              <Button variant="primary">Create Category</Button>
            </Link>  
        </div> 
        <Row className='mt-4'>
          {categories.map((category) => (
            <Col key={category._id} md={4} className="mb-4">
              <Card className='p-4'>
                <ImageComponent base64Image={category.image} />
                <Card.Body>
                  <Card.Title style={{ textAlign:'right' }}>{category.name}</Card.Title>
                  <Button variant="danger" onClick={() => handleConfirmDelete(category)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

    

        {/* Delete Confirmation Dialog */}
        <Modal show={showDeleteDialog} onHide={handleCloseDeleteDialog}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteDialog}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteCategory}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default CategoriesPage;
