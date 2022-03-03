import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../Context/Modal';
import { clearErrors } from '../../store/session';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    dispatch(clearErrors());
  };

  return (
    <>
      <button
        type="button"
        className="navbar__link"
        onClick={() => setShowModal(true)}
      >
        Log In
      </button>
      {showModal && (
        <Modal onClose={() => handleClose()}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
