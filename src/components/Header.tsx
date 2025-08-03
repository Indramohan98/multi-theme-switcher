import { Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import { useTheme } from "../context/ThemeContext";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const isSidebar = (theme: string) => theme === "theme3";

const HeaderContainer = styled.header<{ isSidebar: boolean }>`
  position: fixed;
  top: ${({ isSidebar }) => (isSidebar? '0' : '2rem')};
  left: ${({ isSidebar }) => (isSidebar ? '0' : '50%')};
  transform: ${({ isSidebar }) => (isSidebar ? 'none' : 'translateX(-50%)')};
  width: ${({ isSidebar }) => (isSidebar ? '220px' : '80%')};
  height: ${({ isSidebar }) => (isSidebar ? '100vh' : 'auto')};
  z-index: 1000;
  backdrop-filter: blur(12px);
  background-color: rgba(255, 255, 255, 0.35);
  padding: ${({ isSidebar }) => (isSidebar ? '2rem 1.5rem' : '1rem 2rem')};
  display: flex;
  flex-direction: ${({ isSidebar }) => (isSidebar ? 'column' : 'row')};
  align-items: ${({ isSidebar }) => (isSidebar ? 'flex-start' : 'center')};
  justify-content: ${({ isSidebar }) => (isSidebar ? 'flex-start' : 'space-between')};
  border-radius: ${({ isSidebar }) => (isSidebar ? '0' : '1.5rem')};
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  border-right: ${({ isSidebar }) => (isSidebar ? '1px solid rgba(0, 0, 0, 0.1)' : 'none')};
  border-bottom: ${({ isSidebar }) => (isSidebar ? 'none' : '1px solid rgba(0, 0, 0, 0.1)')};
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: ${({ isSidebar }) => (isSidebar ? '180px' : '95%')};
  }
`;

const Logo = styled.h1<{ isSidebar: boolean }>`
  font-size: 1.5rem;
  font-weight: 700;
  color: #222;
  margin: 0 0 ${({ isSidebar }) => (isSidebar ? '2rem' : '0')} 0;
  user-select: none;
`;

const Nav = styled.nav<{ isSidebar: boolean }>`
  display: flex;
  gap: 2rem;
  flex-direction: ${({ isSidebar }) => (isSidebar ? 'column' : 'row')};
  align-items: ${({ isSidebar }) => (isSidebar ? 'flex-start' : 'center')};
  width: ${({ isSidebar }) => (isSidebar ? '100%' : 'auto')};
  margin-bottom: ${({ isSidebar }) => (isSidebar ? '2rem' : '0')};

  a {
    text-decoration: none;
    font-weight: 600;
    font-size: 1.05rem;
    color: #444;
    padding: 0.35rem 0.5rem;
    border-radius: 0.4rem;
    transition: all 0.25s ease;

    &:hover {
      color: #2a9d8f;
      background-color: ${({ isSidebar }) => (isSidebar ? 'rgba(42, 157, 143, 0.15)' : 'transparent')};
      box-shadow: ${({ isSidebar }) => (isSidebar ? '0 2px 6px rgba(42, 157, 143, 0.3)' : 'none')};
    }

    &.active {
      color: #e76f51;
      font-weight: 700;
    }
  }
`;

const Dropdown = styled.select<{ isSidebar: boolean }>`
  padding: 0.45rem 1rem;
  font-size: 1rem;
  border-radius: 0.6rem;
  border: 1.5px solid #ccc;
  background-color: white;
  color: #222;
  box-shadow: 0 1px 6px rgba(0,0,0,0.1);
  transition: border-color 0.25s ease;

  align-self: ${({ isSidebar }) => (isSidebar ? 'flex-start' : 'center')};

  &:focus {
    outline: none;
    border-color: #2a9d8f;
    box-shadow: 0 0 8px rgba(42, 157, 143, 0.5);
  }

  @media (max-width: 768px) {
    width: ${({ isSidebar }) => (isSidebar ? '100%' : 'auto')};
  }
`;

const CartBadge = styled.div`
  background: #e76f51;
  color: white;
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  margin-left: 0.4rem;
  font-weight: 700;
  user-select: none;
  display: inline-flex;
  align-items: center;
`;

const Header: React.FC = () => {
  const { currentTheme, setTheme } = useTheme();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const sidebar = isSidebar(currentTheme);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as any);
  };

  return (
    <HeaderContainer isSidebar={sidebar}>
      <Logo isSidebar={sidebar}>Multi Theme App</Logo>

      <Nav isSidebar={sidebar}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cart">
          Cart {cartItems.length > 0 && <CartBadge>{cartItems.length}</CartBadge>}
        </Link>
      </Nav>

      <Dropdown isSidebar={sidebar} value={currentTheme} onChange={handleThemeChange}>
        <option value="theme1">Theme 1</option>
        <option value="theme2">Theme 2</option>
        <option value="theme3">Theme 3</option>
      </Dropdown>
    </HeaderContainer>
  );
};

export default Header;
