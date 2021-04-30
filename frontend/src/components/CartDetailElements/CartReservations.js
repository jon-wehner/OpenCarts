import { useState } from "react";
import { useSelector } from "react-redux"
import { Modal } from "../../Context/Modal";
import ReservationForm from '../ReservationForm'
import './CartDetails.css'

export default function CartReservations({cart, userId, dateTime, partySize}) {
  const availableTimeslots = useSelector(state => state.reservations.availableTimeslots)

  const [showModal, setShowModal] = useState(false)

  if(!availableTimeslots) {
    return null
  }
  return (
    <div className="cartDetails__buttonContainer">
      {availableTimeslots.map(time => {
        time = new Date(time);
        const innerText = time.toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit'})
          return (
                  <>
                    <button className="reservation__btn"
                      key={innerText}
                      value={time}
                      onClick={()=> setShowModal(true)}>
                        {innerText}
                    </button>
                    {showModal && (
                      <Modal key={time} onClose={() => setShowModal(false)}>
                        <ReservationForm
                          cart={cart}
                          userId={userId}
                          initialDateTime={dateTime}
                          initialPartySize={partySize}
                          />

                      </Modal>
                    )}
                  </>
                  )
      })}
    </div>

  )
}
