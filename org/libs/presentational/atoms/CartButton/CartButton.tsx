import { IProduct } from '@modules/services/entities';
import './styles.scss';

type cartButtonType = {
  product: IProduct;
  onClick: (product: IProduct) => void;
};

const CartButton = ({ product, onClick }: cartButtonType) => {
  return (
    <button className="cart-button" onClick={() => onClick && onClick(product)}>
      <i className="fi fi-ss-shopping-cart-add"></i>
    </button>
  );
};

export default CartButton;
