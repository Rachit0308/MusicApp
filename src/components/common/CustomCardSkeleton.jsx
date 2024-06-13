import './CardSkeleton.css'

const CardSkeleton = () => {
    return (
      <div className="card skeleton">
        <div className="skeleton-image"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-button"></div>
      </div>
    );
  };

  export default CardSkeleton;