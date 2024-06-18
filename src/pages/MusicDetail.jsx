import { useParams } from "react-router-dom";
import MusicDetailMain from "../components/musicDetail";


const MusicDetailPage = () => {
  const { id } = useParams();
  return <MusicDetailMain musicId={id} />;
};

export default MusicDetailPage;
