import * as timeago from "timeago.js";
import Star from "@mui/icons-material/Star";

const Card = ({ pin, currentUser }) => {
  const { title, description, rating, username, createdAt } = pin;

  return (
    <div className="card">
      <label>Title</label>
      <h4 className="card__place">{title}</h4>
      <label>Description</label>
      <p className="card__review">{description}</p>
      <label>Rating</label>
      <div className="card__ratings">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <Star key={i} className="star" />
          ))}
      </div>
      <label>Description</label>
      <span className="card__username">
        Created by {currentUser === username ? <b>You!</b> : <b>{username}</b>}
      </span>
      <p>{timeago.format(createdAt)}</p>
    </div>
  );
};

export default Card;
