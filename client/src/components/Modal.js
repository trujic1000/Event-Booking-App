import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import Backdrop from './Backdrop';

const Modal = ({
  title,
  canCancel,
  canConfirm,
  onCancel,
  onConfirm,
  confirmText,
  children
}) => {
  return (
    <>
      <Backdrop />
      <ModalWrapper>
        <header>
          <h1>{title}</h1>
        </header>
        <section className="content">{children}</section>
        <section className="actions">
          {canCancel && <Button onClick={onCancel}>Cancel</Button>}
          {canConfirm && <Button onClick={onConfirm}>{confirmText}</Button>}
        </section>
      </ModalWrapper>
    </>
  );
};

const ModalWrapper = styled.div`
  width: 90%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 20vh;
  left: 5%;
  z-index: 99;

  @media (min-width: 768px) {
    width: 30rem;
    left: calc((100% - 30rem) / 2);
  }

  header {
    padding: 1rem;
    background: #01a7a7;
    color: #fff;
  }

  header h1 {
    margin: 0;
    font-size: 1.2rem;
  }

  .content {
    padding: 1rem;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
  }
`;

export default Modal;
