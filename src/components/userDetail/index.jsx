import "./UserDetailMain.css";
import UserDetailForm from "./UserDetailForm";
import CustomCard from "../common/CustomCard";
import PropTypes from "prop-types";

function UserDetailMain({ price, musicId }) {
  return (
    <CustomCard
      className="form-container"
      style={{
        maxWidth: "500px",
        borderRadius: "20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <UserDetailForm price={price} musicId={musicId}/>
    </CustomCard>
  );
}

UserDetailMain.propTypes = {
  price: PropTypes.number.isRequired,
  musicId: PropTypes.string.isRequired,
};

export default UserDetailMain;
