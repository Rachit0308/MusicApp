import useAxios from "../../hooks/useAxios";
import { useEffect } from "react";
import MusicCard from "./MusicCard";
import PropTypes from "prop-types";

const MusicDetail = ({ musicId }) => {
  const { response, fetchData } = useAxios();

  const fetchMusicData = () => {
    fetchData({
      url: `getMusicDetails?musicId=${musicId}`,
      method: "GET",
    });
  };

  useEffect(() => {
    fetchMusicData();
    localStorage.setItem('isTip', "0");
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <MusicCard
          cardData={response?.rows[0]}
          btnTitle="Purchase"
        />
      </div>
    </>
  );
};

MusicDetail.propTypes = {
  musicId: PropTypes.string.isRequired,
};

export default MusicDetail;
