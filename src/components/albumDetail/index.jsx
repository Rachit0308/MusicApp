import useAxios from '../../hooks/useAxios';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomCard from '../common/CustomCard';
import { Card } from 'react-bootstrap';
import CustomButton from '../common/CustomButton';
import { useNavigate } from 'react-router-dom';

const AlbumDetail = ({ musicId }) => {
  const { response, fetchData } = useAxios();
  const navigate = useNavigate();

  const fetchMusicData = () => {
    fetchData({
      url: `getAlbumDetails?musicId=${musicId}`,
      method: 'GET',
    });
  };

  useEffect(() => {
    fetchMusicData();
    localStorage.setItem('isTip', '0');
  }, []);

  const getPrice = (data) => {
    console.log('data', data);
    if (data.allSongs) {
      let price = 0;
      for (const song of data.allSongs) {
        price = price + Number(song.Price);
      }
      return price;
    } else {
      return 0;
    }
  };

  return (
    <>
      <div className='d-flex justify-content-center align-items-center'>
        {response?.data && (
          <div className='my-3 mx-auto d-flex justify-content-center align-items-center'>
            <CustomCard
              isImage={true}
              url={response?.data?.ImageUrl}
              style={{
                borderRadius: '0.3rem',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
              className=''
            >
              <Card.Body>
                <Card.Text className='song-title'>
                  Album Title: <strong>{response?.data?.Title}</strong>
                </Card.Text>
                <Card.Text className='music-category'>
                  Songs: <strong>{response?.data?.songs}</strong>
                </Card.Text>
                <Card.Text className='music-price'>
                  Album Price: <strong style={{ color: '#ff5722' }}>${getPrice(response?.data)}</strong>
                </Card.Text>
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
                          albumId: response?.data?.AlbumId,
                          price: getPrice(response?.data),
                        },
                      })
                    }
                    title='Purchase'
                  />
                </Card.Body>
                {/* <Card.Text className='music-price'>Music List:</Card.Text>
                {response?.data?.allSongs.map((item) => (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Card.Img
                      variant='top'
                      src={item.ImageUrl}
                      style={{ width: '20%', padding: '0.3rem', borderRadius: '0.2rem' }}
                    />
                    <p style={{ textAlign: 'left', width: '30%' }}>
                      Title: <span style={{ paddingLeft: '5px' }}>{item?.Title}</span>
                    </p>
                    <p style={{ textAlign: 'left', width: '30%' }}>
                      Price:
                      <strong style={{ color: '#ff5722', paddingLeft: '5px' }}>${item.Price}</strong>
                    </p>
                  </div>
                ))} */}
              </Card.Body>
            </CustomCard>
          </div>
        )}
      </div>
    </>
  );
};

AlbumDetail.propTypes = {
  musicId: PropTypes.string.isRequired,
};

export default AlbumDetail;
