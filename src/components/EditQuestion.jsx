import QuestionContext from "../context/QuestionContext";
import { useContext } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from "react-router-dom";


const EditQuestion = () => {

  const {questions, updateQuestion } = useContext(QuestionContext)

  const { id } = useParams();

  const navigate = useNavigate();

  const currentQuestion = questions.find(question => question.id.toString() === id)

  const handleSubmit = (values) => {
  if (currentQuestion.question !== values.question) {
    updateQuestion(id, {...values, wasEdited: true});
  } else {
    updateQuestion(id, {...values, wasEdited: false});
  }
  navigate('/')
}

  const validationSchema = Yup.object().shape({
    question: Yup.string()
      .min(6, "question must be 6 characters or more.")
      .required('This field must be filled.')
  }); 

  return ( 
    <>
    <h1>Edit: {currentQuestion.title}</h1>
      <Formik
      initialValues={{
        question: currentQuestion.question,
      }} 

      validationSchema={validationSchema}
  
      onSubmit= {(values, {resetForm} )=> {
        resetForm({values: ''})
        handleSubmit(values);
      }}
    >
          
      {({ errors, touched, values, setValues }) => (

        <Form >
          <label>Your question:
          <Field 
              as="textarea"
              name='question'
              value={values.question} 
              onChange={(e)=>setValues({...values, question:e.target.value})}
            />
             {
              errors.question && touched.question ? 
              <span>{errors.question}</span> : null     
              }
          </label>

          <button className="PostButton" type='submit'>Post question</button>
        </Form>
      )}
    </Formik>  
    </>
   );
}
 
export default EditQuestion;