import React from 'react';
import styled from 'styled-components';

const Spinner = () => {
  return (
    <SpinnerWrapper>
      <SpinnerIcon />
    </SpinnerWrapper>
  );
};

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpinnerIcon = styled.div`
  display: inline-block;
  width: 64px;
  height: 64px;
  margin-top: 2rem;

  &:after {
    content: ' ';
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #01a7a7;
    border-color: #01a7a7 transparent #01a7a7 transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
