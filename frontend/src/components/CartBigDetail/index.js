import CartImage from '../CartDetailElements/CartImage'
import CartTitle  from '../CartDetailElements/CartName'
import CartPrice from '../CartDetailElements/CartPrice'
export default function CartBigDetail ({cart}) {
  return (
    <>
      <CartImage name={cart.name} imageUrl={cart.imageUrl} />
      <CartTitle name={cart.name} />
      <CartPrice priceLevel={cart.priceLevel} />
    </>
  )
}
