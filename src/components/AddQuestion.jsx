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
      questionPostDate: new Date().toLocaleString()
    }
    addNewQuestion(newQuestion);
    navigate('/');
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(5, "title must be 5 characters or more.")
      .max(100, 'title must be 100 characters or less.')
      .required('This field must be filled.')
  }); 

  return ( 
    <>
      <Formik
      initialValues={{
        title: '',
      }} 

      validationSchema={validationSchema}
  
      onSubmit= {(values, {resetForm} )=> {
        console.log(values);
        resetForm({values: ''})
        handleSubmit(values);
      }}
    >
          
      {({ errors, touched, values, setValues }) => (

        <Form >
          <label>Your question:
            <Field 
              type="textarea"
              name='title'
              value={values.title} 
              onChange={(e)=>setValues({...values, title:e.target.value})}
            />
             {
              errors.title && touched.title ? 
              <span>{errors.title}</span> : null     
              }
          </label>

          <button className="PostButton" type='submit'>Post question</button>
        </Form>
      )}
    </Formik>  
    </>
   );
}
 
export default AddQuestion;