import Rating from "react-rating-stars-component";
function RatingDisplay({ rate }) {
  const rating = rate;

  return (
    <div>
      <Rating
        count={5}
        value={rating}
        size={24}
        isHalf={true}
        edit={false} // Set to true if you want the rating to be interactive
      />
    </div>
  );
}

export default RatingDisplay;
