import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledBackToTopButton = styled.button`
  position: fixed;
  bottom: 50px;
  right: 20px;
  background-color:skyblue;
  color: #fff;
  width: 50px; /* Set the width and height to make the button circular */
  height: 50px;
  border: none;
  border-radius: 50%; /* Use border-radius to make it circular */
  cursor: pointer;
  display: ${({ show }) => (show ? 'block' : 'none')};
  font-size: 18px; /* Adjust font size as needed */
  line-height: 50px;
  font-weight: 700; /* Increase the font weight for a bolder arrow */
  outline: none; /* Remove focus outline for better aesthetics */
   z-index:999;
  &:hover {
    background-color: #D085D0E9;
  }
`;

function BackToTopButton() {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 70) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <StyledBackToTopButton show={showButton} onClick={scrollToTop}>
      ↑
    </StyledBackToTopButton>
  );
}

export default BackToTopButton;
