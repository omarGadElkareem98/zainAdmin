import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CustomNavbar from '../components/Navbar';

const CreateCategoryPage = () => {
    const navigate = useNavigate();
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    try {
      const response = await fetch('https://technicians.onrender.com/categories', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Category created successfully, handle the response as needed
        console.log('Category created successfully');
        navigate('/categories')
      } else {
        // Error creating category
        console.log('Error creating category');
      }
    } catch (error) {
      console.log('Error creating category:', error);
    }
  };

  return (
    <>
      <CustomNavbar />

      <Container className='mt-4'>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name='name'
            placeholder="Enter category name"
            value={name}
            onChange={handleNameChange}
          />
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" name='image' onChange={handleImageChange} />
        </Form.Group>
        <div className="d-flex justify-content-end mt-4">
        <Button variant="primary" type="submit">
          Create
        </Button>
        </div>
      </Form>
    </Container>
    </>
  );
};

export default CreateCategoryPage;
