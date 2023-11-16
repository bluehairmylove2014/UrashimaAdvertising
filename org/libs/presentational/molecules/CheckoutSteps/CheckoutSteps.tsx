import "./styles.scss";

const steps = [
  {
    name: "Giỏ hàng",
    id: "cart",
    icon: "fi fi-ss-shopping-bag",
  },
  {
    name: "Thông tin đặt hàng",
    id: "info",
    icon: "fi fi-ss-file-edit",
  },
  {
    name: "Thanh toán",
    id: "checkout",
    icon: "fi fi-sr-coins",
  },
  {
    name: "Hoàn tất",
    id: "success",
    icon: "fi fi-ss-shield-check",
  },
];

type checkoutStepsParamsType = {
  curStep: "cart" | "info" | "checkout" | "success";
};
const CheckoutSteps = ({ curStep }: checkoutStepsParamsType) => {
  return (
    <div className="checkout-steps__wrapper">
      <div className="checkout-steps">
        {steps.map((s) => (
          <div
            className={`step ${s.id === curStep ? "active" : ""}`}
            key={s.id}
          >
            <div className="step__icon">
              <i className={s.icon}></i>
            </div>
            <p>{s.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutSteps;
