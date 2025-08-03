import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 6rem 2rem 2rem;
  max-width: 700px;
  margin: 0 auto;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #222;
  }

  p {
    font-size: 1.1rem;
    color: #444;
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    padding: 4rem 1.5rem 1.5rem;

    h2 {
      font-size: 1.75rem;
    }

    p {
      font-size: 1rem;
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
  }
`;

const Contact: React.FC = () => (
  <Wrapper>
    <h2>Contact Page</h2>
    <p>Reach us at: indramohanlal143@gmail.com</p>
  </Wrapper>
);

export default Contact;
