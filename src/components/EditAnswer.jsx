import AnswerContext from "../context/AnswerContext";
import { useContext } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from "react-router-dom";


const EditAnswer = () => {

  const { answers, updateAnswer } = useContext(AnswerContext)

  const { id } = useParams();

  const navigate = useNavigate();

  const currentAnswer = answers.find(answer => answer.id.toString() === id)

  const handleSubmit = (values) => {
    if (currentAnswer.answer !== values.answer) {
      updateAnswer(id, { ...values, wasEdited: true });
    } else {
      updateAnswer(id, { ...values, wasEdited: false });
    }
    navigate('/')
  }

  const validationSchema = Yup.object().shape({
    answer: Yup.string()
      .min(6, "answer must be 6 characters or more.")
      .required('This field must be filled.')
  });

  return (
    <div className="editAnswer">
      <h1>Edit your answer</h1>
      <Formik
        initialValues={{
          answer: currentAnswer.answer,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          resetForm({ values: '' })
          handleSubmit(values);
        }}
      >
        {({ errors, touched, values, setValues }) => (

          <Form className="editAnswerForm">
            <label>Your answer:</label>
            <div className="editQuestText">
              <Field
                className='editAnswerArea'
                as="textarea"
                name='answer'
                value={values.answer}
                onChange={(e) => setValues({ ...values, answer: e.target.value })}
              />
              {
                errors.answer && touched.answer ?
                  <span>{errors.answer}</span> : null
              }
            </div>
            <div className="editBtnDiv">
              <button className="PostButton" type='submit'>Post answer</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditAnswer;