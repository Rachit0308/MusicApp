import { useLocation } from "react-router-dom";
import UserDetailMain from "../components/userDetail";

const UserDetailPage = () => {
  const location = useLocation();
  const { price, musicId } = location?.state;
  console.log(price, musicId, "price-musicId");
  return (
    <>
      <UserDetailMain price={price} musicId={musicId} />
    </>
  );
};

export default UserDetailPage;
