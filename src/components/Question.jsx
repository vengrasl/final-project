import UserContext from "../context/UserContext";
import QuestionContext from "../context/QuestionContext";
import AnswerContext from "../context/AnswerContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import thumbsDown from '../images/thumbs-down.png'
import thumbsUp from '../images/thumbs-up.png'
import { useLocation } from "react-router-dom";

const Question = ({ data }) => {

  const { users, loggedInUser } = useContext(UserContext);

  const { deleteQuestion, handleLikes, handleDislike } = useContext(QuestionContext);

  const { answers } = useContext(AnswerContext)

  const questionOwner = users.find(user => user.id === data.userId);

  const QuestionVote = data.likedBy.length - data.disLikedBy.length;

  const location = useLocation();

  const howManyAnswers = answers.filter(answer => answer.questionId === data.id);

  const howManyAnswersCount = howManyAnswers.length;

  return (
    <div className="questionContainer">
      <div className="questionPostInfo">
        {questionOwner &&
          <div className="questionInfo">
            <img src={questionOwner.avatar} alt="user avatar" />
            <h4>{questionOwner.username}</h4>
          </div>
        }
        <p>Question was posted: <span>{data.questionPostDate}</span></p>
      </div>
      <div className="theQuestion">
        {location.pathname === `/question/${data.id}` ?
          <div className="nonLink">
            <h2>{data.title} </h2>
          </div>
          :
          <Link to={`/questionAnswers/${data.id}`}>
            <h2>{data.title} ({howManyAnswersCount === 1 ? `${howManyAnswersCount} answer` : `${howManyAnswersCount} answers`})</h2>
          </Link>
        }
      </div>
      <div className="question">
        <p>{data.question}</p>
      </div>
      <div className="editMessageAndButtons">
        <div className="editedMessage">
          {data.wasEdited && <p className="editedText">Note. This question was edited</p>}
        </div>
        <div className="buttonDiv">
          {loggedInUser && loggedInUser.id === questionOwner.id &&
            <>
              <button onClick={() => deleteQuestion(data.id)}>Delete question</button>
              <Link to={`/editQuestion/${data.id}`}><button>Edit question</button></Link>
            </>
          }
        </div>
      </div>
      <div className="likeDislikeDiv">
        <img className="thumbsUp"
          src={thumbsUp} alt="thumbsUp"
          onClick={() => handleLikes(data.id)} 
          />
        <span>{QuestionVote}</span>
        <img className="thumbsDown"
          src={thumbsDown} alt="dislike"
          onClick={() => handleDislike(data.id)} 
          />
      </div>
    </div>
  );
}

export default Question;