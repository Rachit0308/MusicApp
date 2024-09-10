import { useParams } from 'react-router-dom';
import AlbumDetail from '../components/albumDetail';

const AlbumDetails = () => {
  const { id } = useParams();
  return <AlbumDetail musicId={id} />;
};

export default AlbumDetails;
