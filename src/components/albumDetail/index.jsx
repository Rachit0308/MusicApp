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

  useEffect(() => {
    if (response && response.data && response.data.allSongs) {
      let songs = [];
      for (const song of response.data.allSongs) {
        if (song?.AudioUrl) {
          songs.push(song?.AudioUrl);
        } else if (song?.VideoUrl) {
          songs.push(song?.VideoUrl);
        }
      }
      localStorage.setItem('fileUrls', JSON.stringify(songs));
    }
  }, [response]);

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
                  Album Price: <strong style={{ color: '#ff5722' }}>${response?.data?.Price}</strong>
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
                          price: response?.data?.Price,
                        },
                      })
                    }
                    title='Purchase'
                  />
                </Card.Body>
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
