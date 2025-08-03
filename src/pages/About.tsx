import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 6rem 2rem 2rem;
  max-width: 900px;
  margin: 0 auto;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    color: #333;
  }

  ul.tech-list {
    list-style-type: disc;
    padding-left: 1.5rem;
    font-size: 1rem;
    color: #444;

    li {
      margin-bottom: 0.75rem;
    }
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    padding: 4rem 1.5rem 1.5rem;

    h2 {
      font-size: 1.75rem;
    }

    p {
      font-size: 1rem;
    }

    ul.tech-list {
      font-size: 0.95rem;
      padding-left: 1.2rem;
    }
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem 1rem;

    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.9rem;
    }

    ul.tech-list {
      font-size: 0.9rem;
      padding-left: 1rem;
    }
  }
`;

const About: React.FC = () => (
  <Wrapper>
    <h2>About Page</h2>
    <p>This app demonstrates multiple themes using styled-components and context API.</p>
    <h3>Technologies Used:</h3>
    <ul className="tech-list">
      <li>React.js (with TypeScript)</li>
      <li>React Router DOM</li>
      <li>Styled-Components</li>
      <li>Context API for Theme Management</li>
      <li>Redux Toolkit for State Management</li>
      <li>React-Redux</li>
      <li>Fake Store API for product data</li>
      <li>React-Toastify for notifications</li>
      <li>Responsive Design with CSS Media Queries</li>
    </ul>
  </Wrapper>
);

export default About;
