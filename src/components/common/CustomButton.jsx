import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const CustomButton = ({
  title,
  id = "",
  type = "button",
  className = "",
  clickHandler,
  disabled = false,
  style,
}) => {
  return (
    <Button
      id={id}
      style={style}
      type={type}
      className={className}
      onClick={clickHandler}
      disabled={disabled}
    >
      {title}
    </Button>
  );
};

CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  clickHandler: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
  style: PropTypes.object,
  id: PropTypes.string.isRequired,
};

export default CustomButton;
