import AnswerContext from "../context/AnswerContext";
import UserContext from "../context/UserContext";
import { useContext } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const AddAnswer = ({ id }) => {

  const { addNewQuestion } = useContext(AnswerContext);
  const { loggedInUser } = useContext(UserContext);

  const handleSubmit = (values) => {
    const newAnswer = {
      ...values,
      userId: loggedInUser.id,
      id: Date.now(),
      answerPostDate: new Date().toLocaleString(),
      questionId: Number(id),
      wasEdited: false,
      likedBy: [],
      disLikedBy: []
    }
    addNewQuestion(newAnswer);
  }

  const validationSchema = Yup.object().shape({
    answer: Yup.string()
      .min(5, 'Answer must be at least 5 characters length.')
      .required('This field must be filled.'),
  });

  return (
    <>
      <Formik
        initialValues={{
          answer: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          resetForm({ values: '' })
          handleSubmit(values);
        }}
      >
        {({ errors, touched, values, setValues }) => (
          <>
            <Form className="addAnswerForm">
              <label className="answerLabel">{loggedInUser.username}, leave an answer to this question</label>
              <div className="addAnswer">
              <Field
                className="answerTextarrea"
                as="textarea"
                name='answer'
                value={values.answer}
                onChange={(e) => setValues({ ...values, answer: e.target.value })}
              />
              {errors.answer && touched.answer ? <span>{errors.answer}</span> : null}
              </div>
              <button className="PostButton" type='submit'>Post answer</button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}

export default AddAnswer;