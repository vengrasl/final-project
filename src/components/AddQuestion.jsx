import QuestionContext from "../context/QuestionContext";
import UserContext from "../context/UserContext";
import { useContext } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

const AddQuestion = () => {

  const { addNewQuestion } = useContext(QuestionContext)
  const { loggedInUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const newQuestion = {
      ...values,
      userId: loggedInUser.id,
      id: Date.now(),
      questionPostDate: new Date().toLocaleString(),
      wasEdited: false,
      likedBy: [],
      disLikedBy: []
    }
    addNewQuestion(newQuestion);
    navigate('/');
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(5, "Title must be 5 characters or more.")
      .max(30, 'Title must be 30 characters or less.')
      .required('This field must be filled.'),
    question: Yup.string()
      .min(5, 'Question must be at least 5 characters length.')
      .required('This field must be filled.'),
  }); 

  return ( 
    <>
      <Formik
      initialValues={{
        title: '',
        question: ''
      }} 

      validationSchema={validationSchema}
  
      onSubmit= {(values, {resetForm} )=> {
        resetForm({values: ''})
        handleSubmit(values);
      }}
    >
          
      {({ errors, touched, values, setValues }) => (
        <div className="addQuestionContainer">
          <Form className="addQuestionForm">
          <div className="form-column">
            <label>Your question title:</label>
            <Field
              className= "questionTitle"
              name='title'
              value={values.title} 
              onChange={(e)=>setValues({...values, title:e.target.value})}
            />
            {errors.title && touched.title ? <span>{errors.title}</span> : null}
          </div>
          <div className="form-column">
            <label>Your question:</label>
            <Field
              className="questionItself"
              as="textarea"
              name='question'
              value={values.question} 
              onChange={(e)=>setValues({...values, question:e.target.value})}
            />
            {errors.question && touched.question ? <span>{errors.question}</span> : null}
          </div>
          <button className="PostButton" type='submit'>Post question</button>
        </Form>
      </div>
      )}
    </Formik>  
    </>
   );
}
 
export default AddQuestion;