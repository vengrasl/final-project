import UserContext from "../context/UserContext";
import QuestionContext from "../context/QuestionContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import thumbsDown from '../images/thumbs-down.png'
import thumbsUp from '../images/thumbs-up.png'

const Question = ({data}) => {

  const { users, loggedInUser } = useContext(UserContext);

  const { deleteQuestion, handleLikes, handleDislike, showMessageQuestion, setShowMessageQuestion } = useContext(QuestionContext);

  const questionOwner = users.find(user => user.id === data.userId);

  const QuestionVote = data.likedBy.length - data.disLikedBy.length;



  return ( 
    <div className="questionContainer">
      <div className="questionPostInfo">
        {questionOwner && 
        <div className="questionInfo">
          <img src={questionOwner.avatar} alt="user avatar"/>
          <h4>{questionOwner.username}</h4>
        </div>
        }
        <p>Question was posted: <span>{data.questionPostDate}</span></p>
      </div>
      <div className="theQuestion">
        <h1>{data.title}</h1>
      </div>
      <div className="question">
        <p>{data.question}</p>
      </div>
      <div className="editMessageAndButtons">
        <div className="editedMessage">
          {data.wasEdited && <p>*Note. This question was edited*</p>}
        </div>
        <div className="buttonDiv">
          {loggedInUser && loggedInUser.id === questionOwner.id &&
          <>
          <button onClick={()=> deleteQuestion(data.id)}>Delete question</button>
          <Link to={`/editQuestion/${data.id}`}><button>Edit question</button></Link>
          </>
          }
        </div>
      </div>
      <div className="likeDislikeDiv">
          <img className="thumbsUp"
            src={thumbsUp} alt="thumbsUp" 
            onClick={loggedInUser ?
            () => handleLikes(data.id)
            : 
            () => setShowMessageQuestion(true)} />
          <span>{QuestionVote}</span>
          <img className="thumbsDown"
            src={thumbsDown} alt="dislike" 
            onClick={loggedInUser ? 
            () => handleDislike(data.id) 
            :
            () => setShowMessageQuestion(true)} />
      </div>
      { showMessageQuestion && <p className="loginToLike">You need to log in to like/dislike this question</p> }
    </div>
   );
}
 
export default Question;