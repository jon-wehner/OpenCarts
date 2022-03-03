import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../Context/Modal';
import { clearErrors } from '../../store/session';
import SignupForm from './SignupForm';

export default function SignupFormModal() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    dispatch(clearErrors());
  };

  return (
    <>
      <button type="button" className="navbar__link" onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => handleClose()}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}
