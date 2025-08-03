import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store/store';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  padding: 6rem 2rem 2rem;
`;

const ProductSummary = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ProductImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  gap: 1rem;

  input {
    padding: 0.5rem;
    font-size: 1rem;
  }

  button {
    padding: 0.6rem;
    font-size: 1rem;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background-color: #0059c1;
    }
  }
`;

const Order: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = useSelector((state: RootState) =>
    state.cart.items.find((p) => p.id === Number(id))
  );

  const [isOrdered, setIsOrdered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Order placed successfully!');
    setIsOrdered(true);
  };

  return (
    <Container>
      <ToastContainer />
      <h2>Order Summary</h2>

      {!product || isOrdered ? (
        <p>No active order</p>
      ) : (
        <>
          <ProductSummary>
            <ProductImage src={product.image} alt={product.title} />
            <ProductInfo>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <strong>Price: ${product.price}</strong>
            </ProductInfo>
          </ProductSummary>

          <hr />
          <h4>Enter Address to Complete Order</h4>
          <Form onSubmit={handleSubmit}>
            <input type="text" placeholder="Full Name" required />
            <input type="text" placeholder="Street Address" required />
            <input type="text" placeholder="City" required />
            <input type="text" placeholder="Zip Code" required />
            <button type="submit">Place Order</button>
          </Form>
        </>
      )}
    </Container>
  );
};

export default Order;
