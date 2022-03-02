import React, { useState } from 'react';
import { Modal } from '../../Context/Modal';
import SignupForm from './SignupForm';

export default function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button type="button" className="navbar__link" onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}
