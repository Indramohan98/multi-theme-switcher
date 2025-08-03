import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.main`
  padding: 6rem 2rem 2rem;

  @media (max-width: 768px) {
    padding-top: 7rem; // More space for mobile header stacking
  }

  @media (max-width: 480px) {
    padding-top: 8rem; // Even more space if mobile layout stacks more
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;
  background-color: ${(props: any) => props.theme.cardBackground};
  border: 1px solid ${(props: any) => props.theme.cardBorder};
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const ProductImage = styled.img`
  width: 180px;
  height: 180px;
  object-fit: contain;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
  }
`;

const ProductDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const ProductTitle = styled.h4`
  font-size: 1rem;
  margin: 0 0 0.5rem;
`;

const ProductDescription = styled.p`
  font-size: 0.875rem;
  color: #444;
  margin: 0 0 0.5rem;
`;

const ProductPrice = styled.p`
  font-weight: bold;
  margin: 0.5rem 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:first-child {
    background-color: #0070f3;
    color: white;
  }

  &:last-child {
    background-color: #e2e2e2;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleBuyNow = (product: any) => {
    dispatch(addToCart(product));
    navigate(`/order/${product.id}`);
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    toast.success("Product added to cart");
  };

  return (
    <Container>
      <ToastContainer />
      <h2>Welcome to the Home Page</h2>
      <p>Explore products below:</p>
      <CardGrid>
        {products.map((product) => (
          <Card key={product.id}>
            <ProductImage src={product.image} alt={product.title} />
            <ProductDetails>
              <ProductTitle>{product.title}</ProductTitle>
              <ProductDescription>
                {product.description.slice(0, 100)}...
              </ProductDescription>
              <ProductPrice>${product.price}</ProductPrice>
              <ButtonGroup>
                <Button onClick={() => handleBuyNow(product)}>Buy Now</Button>
                <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
              </ButtonGroup>
            </ProductDetails>
          </Card>
        ))}
      </CardGrid>
    </Container>
  );
};

export default Home;
