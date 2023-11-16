'use client';
import { CommonButton } from '@presentational/atoms/CommonButton/CommonButton';
import './styles.scss';
import { useEffect, useState } from 'react';

const defaultQty = 1;
const Quantity = ({
  quantity,
  onChangeQuantity,
}: {
  quantity: number;
  onChangeQuantity: (quantity: number) => void;
}) => {
  const [qty, setQty] = useState<number>(
    quantity && quantity >= 0 ? quantity : defaultQty
  );

  useEffect(() => {
    typeof quantity === 'number' && setQty(quantity);
  }, [quantity]);

  return (
    <div className="quantity">
      <div
        className="quantity__decrease-btn"
        onClick={() => qty > 0 && onChangeQuantity(qty - 1)}
      >
        <CommonButton style="none" disabled={qty <= 0}>
          <i className="fi fi-rs-minus-small"></i>
        </CommonButton>
      </div>
      <span>{qty}</span>
      <div
        className="quantity__increase-btn"
        onClick={() => onChangeQuantity(qty + 1)}
      >
        <CommonButton style="none">
          <i className="fi fi-rs-plus-small"></i>
        </CommonButton>
      </div>
    </div>
  );
};

export default Quantity;
