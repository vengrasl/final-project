import UserContext from "../context/UserContext";
import QuestionContext from "../context/QuestionContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

const Question = ({data}) => {

  const { users, loggedInUser } = useContext(UserContext);
  const { deleteQuestion, likeQuestion, dislikeQuestion } = useContext(QuestionContext);

  const questionOwner = users.find(user => user.id === data.userId);

  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  const handleLike = () => {
    if (!hasLiked) {
      likeQuestion(data.id);
      setHasLiked(true);
    }
  };

  const handleDislike = () => {
    if (!hasDisliked) {
      dislikeQuestion(data.id);
      setHasDisliked(true);
    }
  };


  return ( 
    <div className="questionContainer">
      <div className="questionPostInfo">
        {
        questionOwner && 
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

      <div className="likeDislike">

        <button onClick={handleLike}>Like</button>

        <p>{data.likes} likes</p>

        <button onClick={handleDislike}>Dislike</button>

        <p>{data.dislikes} dislikes</p>

      </div>

      
    </div>
   );
}
 
export default Question;