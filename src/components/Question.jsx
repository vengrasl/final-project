import UserContext from "../context/UserContext";
import { useContext } from "react";

const Question = ({data}) => {

  const { users } = useContext(UserContext);

  const questionOwner = users.find(user => user.id === data.userId);


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
        
        






    </div>
   );
}
 
export default Question;