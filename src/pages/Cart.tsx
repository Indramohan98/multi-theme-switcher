import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { removeFromCart } from '../store/cartSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 6rem 2rem 2rem;
  max-width: 900px;
  margin: 0 auto;

  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #222;
  }

  p {
    font-size: 1.2rem;
    color: #666;
  }
`;

const Item = styled(motion.div)`
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-sizing: border-box;
  width: 100%;  /* Make sure it takes full width */

  input[type='checkbox'] {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  img {
    width: 100px;
    height: auto;
    object-fit: contain;
    flex-shrink: 0;
  }

  div {
    flex: 1;
    min-width: 0; /* Important for text truncation / wrapping */
    h4 {
      margin: 0 0 0.4rem;
      font-size: 1.1rem;
      color: #222;
      word-break: break-word; /* Prevent overflow from long words */
    }
    p {
      margin: 0;
      font-weight: bold;
      font-size: 1rem;
      color: #0070f3;
    }
  }

  button {
    background-color: #e76f51;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.25s ease;
    flex-shrink: 0; /* Prevent button from shrinking */

    &:hover {
      background-color: #c65b3f;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    img {
      width: 80px;
      margin-bottom: 0.75rem;
    }

    button {
      width: 100%;
      margin-top: 0.5rem;
    }
  }
`;


const BuyButton = styled(motion.button)`
  margin-top: 1.5rem;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  align-self: flex-start;

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const [selectedItems, setSelectedItems] = useState<number[]>(
    cartItems.map((item) => item.id)
  );

  const toggleSelect = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleBuy = () => {
    if (selectedItems.length === 0) {
      toast.info('Please select at least one item to buy.');
      return;
    }

    selectedItems.forEach((id) => dispatch(removeFromCart(id)));
    toast.success('Purchase successful!');
    setSelectedItems([]);
  };

  return (
    <Wrapper>
      <ToastContainer />
      <h2>Cart Items</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <AnimatePresence>
            {cartItems.map((item) => (
              <Item
                key={item.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleSelect(item.id)}
                  aria-label={`Select ${item.title}`}
                />
                <img src={item.image} alt={item.title} />
                <div>
                  <h4>{item.title}</h4>
                  <p>${item.price}</p>
                </div>
                <button onClick={() => dispatch(removeFromCart(item.id))}>
                  Remove
                </button>
              </Item>
            ))}
          </AnimatePresence>

          <BuyButton
            onClick={handleBuy}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={selectedItems.length === 0}
            aria-disabled={selectedItems.length === 0}
          >
            Buy Selected
          </BuyButton>
        </>
      )}
    </Wrapper>
  );
};

export default Cart;
