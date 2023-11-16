import EmptyBoxIcon from '@assets/icons/empty-box.png';
import Icon from '../Icon/Icon';
import './styles.scss';

const defaultSize = 50;
const Empty = ({
  label,
  customSize,
  customFontSize,
}: {
  label: string;
  customSize?: number;
  customFontSize?: string;
}) => {
  return (
    <div className="empty">
      <Icon
        media={EmptyBoxIcon}
        alt="empty"
        customWidth={customSize || defaultSize}
        customHeight={customSize || defaultSize}
      />
      <p style={{ fontSize: customFontSize }}>{label}</p>
    </div>
  );
};

export default Empty;
