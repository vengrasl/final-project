import UserContext from "../context/UserContext";
import { useContext } from "react";
import AnswerContext from "../context/AnswerContext";
import { Link } from "react-router-dom";
import thumbsDown from '../images/thumbs-down.png'
import thumbsUp from '../images/thumbs-up.png'

const Answer = ({ data }) => {

  const { users, loggedInUser } = useContext(UserContext);

  const answerOwner = users.find(user => user.id === data.userId);

  const { deleteAnswer, handleAnswerLikes, handleAnswerDislike} = useContext(AnswerContext)

  const answerVote = data.likedBy.length - data.disLikedBy.length;

  return (
    <>
      <div className="answerContainer">
        <div className="questionPostInfo">
          {answerOwner &&
            <div className="questionInfo">
              <img src={answerOwner.avatar} alt="user avatar" />
              <h4>{answerOwner.username}</h4>
            </div>
          }
          <p>Answer was posted: <span>{data.answerPostDate}</span></p>
        </div>
        <div className="question">
          <p>{data.answer}</p>
        </div>
        <div className="editMessageAndButtons">
          <div className="editedMessage">
            {data.wasEdited && <p className="editedText">Note. This answer was edited</p>}
          </div>
          <div className="buttonDiv">
            {loggedInUser && loggedInUser.id === answerOwner.id &&
              <>
                <button onClick={() => deleteAnswer(data.id)}>Delete answer</button>
                <Link to={`/editAnswer/${data.id}`}><button>Edit answer</button></Link>
              </>
            }
          </div>
        </div>
        <div className="likeDislikeDiv">
          <img className="thumbsUp"
            src={thumbsUp} alt="thumbsUp"
            onClick={() => handleAnswerLikes(data.id)} 
          />
          <span>{answerVote}</span>
          <img className="thumbsDown"
            src={thumbsDown} alt="dislike"
            onClick={() => handleAnswerDislike(data.id)}/>
        </div>
      </div>
    </>
  );
}

export default Answer;