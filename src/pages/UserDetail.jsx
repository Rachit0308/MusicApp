import { useLocation } from "react-router-dom";
import UserDetailMain from "../components/userDetail";

const UserDetailPage = () => {
  const location = useLocation();
  const { price, musicId, albumId, userId } = location?.state;
  console.log(price, musicId, albumId, "price-musicId");
  return (
    <>
      <UserDetailMain price={price} musicId={musicId} albumId={albumId} userId={userId} />
    </>
  );
};

export default UserDetailPage;
