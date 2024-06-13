import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

const CustomCard = ({
  isImage = false,
  url,
  children,
  className = "",
  style,
}) => {
  return (
    <Card style={style} className={className}>
      {isImage && <Card.Img variant="top" src={url} />}
      {children}
    </Card>
  );
};

CustomCard.propTypes = {
  isImage: PropTypes.bool.isRequired,
  style: PropTypes.object,
  url: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomCard;
