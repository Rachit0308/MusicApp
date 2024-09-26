import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import CustomButton from '../common/CustomButton';
import { useNavigate } from 'react-router-dom';
import CustomCard from '../common/CustomCard';

const cardDataShape = PropTypes.shape({
  Id: PropTypes.string.isRequired,
  AudioUrl: PropTypes.string.isRequired,
  Category: PropTypes.string.isRequired,
  Currency: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired,
  ImageUrl: PropTypes.string.isRequired,
  Price: PropTypes.number.isRequired,
  QrUrl: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
  UserId: PropTypes.string.isRequired,
  VideoUrl: PropTypes.string.isRequired,
});
const MusicCard = ({ btnTitle, cardData, musicId }) => {
  console.log("cardData>>>>>" + JSON.stringify(cardData));
  const navigate = useNavigate();
  if (cardData?.AudioUrl) {
    localStorage.setItem('fileUrl', cardData?.AudioUrl);
  } else if (cardData?.VideoUrl) {
    localStorage.setItem('fileUrl', cardData?.VideoUrl);
  }
  return (
    <CustomCard
      isImage={true}
      url={cardData?.ImageUrl}
      style={{
        maxWidth: '600px',
        borderRadius: '0.3rem',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        width: "100%"
      }}
      className='my-3 mx-auto d-flex justify-content-center align-items-center'
    >
      <Card.Body>
        <Card.Text className='song-title'>
          Song Title: <strong>{cardData?.Title}</strong>
        </Card.Text>
        <Card.Text>
          Artist Name: <strong>{cardData?.ArtistName}</strong>
        </Card.Text>
        <Card.Text className='music-category'>
          Music Category: <strong>{cardData?.Category}</strong>
        </Card.Text>
        <Card.Text className='music-price'>
          Description: <strong>{cardData?.Description}</strong>
        </Card.Text>
        <Card.Text className='music-price'>
          Music Price: <strong style={{ color: '#ff5722' }}>${cardData?.Price}</strong>
        </Card.Text>
      </Card.Body>
      <Card.Body>
        <CustomButton
          type='button'
          style={{
            paddingRight: '50px',
            paddingLeft: '50px',
            marginTop: '50px',
          }}
          clickHandler={() =>
            navigate('/user-detail', {
              state: {
                musicId: musicId,
                price: cardData?.Price,
              },
            })
          }
          title={btnTitle}
        />
      </Card.Body>
    </CustomCard>
  );
};

MusicCard.propTypes = {
  btnTitle: PropTypes.string.isRequired,
  cardData: cardDataShape.isRequired,
  musicId: PropTypes.string.isRequired,
};

export default MusicCard;
