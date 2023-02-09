import UserContext from "../context/UserContext";
import { useContext } from "react";



const Answer = ({data}) => {

  const { users } = useContext(UserContext);

  const answerOwner = users.find(user => user.id === data.userId);
  
  return ( 
    <>
    <div className="questionContainer">
      <div className="questionPostInfo">
          {answerOwner && 
          <div className="questionInfo">
            <img src={answerOwner.avatar} alt="user avatar"/>
            <h4>{answerOwner.username}</h4>
          </div>
          }
          <p>Answer was posted: <span>{data.questionPostDate}</span></p>
      </div>
      <div className="question">
        <p>{data.answer}</p>
      </div>
    </div>
    </>
   );
}
 
export default Answer;