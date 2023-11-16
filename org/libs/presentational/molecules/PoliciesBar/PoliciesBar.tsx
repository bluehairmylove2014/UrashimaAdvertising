import './styles.scss';
import Icon from '@presentational/atoms/Icon/Icon';
import policyIcon1 from '@assets/icons/return.png';
import policyIcon2 from '@assets/icons/guarantee.png';
import policyIcon3 from '@assets/icons/card-payment.png';

const ICON_FULL_SIZE = 40;
const ICON_MINIMIZE_SIZE = 28;

type styleList = 'full' | 'minimize';
const PoliciesBar = ({ style }: { style: styleList }) => {
  const iconCustomWidth =
    style === 'full' ? ICON_FULL_SIZE : ICON_MINIMIZE_SIZE;
  return (
    <div className={`policies__wrapper ${style}`}>
      <div className="policies container">
        <div className="policy">
          <Icon
            media={policyIcon1}
            alt="return policy"
            customWidth={iconCustomWidth}
            customHeight={iconCustomWidth}
          />
          <div className="policy__content">
            <h5>7 ngày đổi trả</h5>
            <p>Yên tâm mua sắm với chính sách đổi trả trong vòng 7 ngày</p>
          </div>
        </div>
        <div className="policy">
          <Icon
            media={policyIcon2}
            alt="return policy"
            customWidth={iconCustomWidth}
            customHeight={iconCustomWidth}
          />
          <div className="policy__content">
            <h5>6 tháng bảo hành</h5>
            <p>6 tháng bảo hành miễn phí nếu có lỗi từ nhà sản xuất</p>
          </div>
        </div>
        <div className="policy">
          <Icon
            media={policyIcon3}
            alt="return policy"
            customWidth={iconCustomWidth}
            customHeight={iconCustomWidth}
          />
          <div className="policy__content">
            <h5>Thanh toán dễ dàng</h5>
            <p>
              Đa dạng phương thức như COD, chuyển khoản (nội địa và quốc tế)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliciesBar;
