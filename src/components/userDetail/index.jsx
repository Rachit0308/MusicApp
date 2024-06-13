import "./UserDetailMain.css";
import UserDetailForm from "./UserDetailForm";
import CustomCard from "../common/CustomCard";

function UserDetailMain() {
  return (
    <CustomCard
      className="form-container"
      style={{
        maxWidth: "500px",
        borderRadius: "20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <UserDetailForm />
    </CustomCard>
  );
}

export default UserDetailMain;
