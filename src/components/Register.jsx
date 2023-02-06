import UserContext from "../context/UserContext";
import { useContext } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

const Register = () => {

  const { addNewUser, setLoggedInUser, users } = useContext(UserContext);

  const navigation = useNavigate();

  const handleSubmit = (values) => {
    let newUser = {
      ...values,
      id: Date.now(),
    }
    addNewUser(newUser);
    setLoggedInUser(newUser);
    navigation('/')
  } 

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, "Username must be 5 characters or less.")
      .max(15, 'Username must be 15 characters or less.')
      .required('This field must be filled.')
      .matches(/^[a-zA-Z0-9]+$/, "Username can only contain alphanumeric characters.")
      .test('unique-username', 'Username already taken, please choose a different one', value => !users.find(user => user.username === value)),
    password: Yup.string()
      .min(8, 'Password must be at least 8 symbols length.')
      .max(20, 'Password must be 20 characters or less.')
      .required('This field must be filled.'),
    passwordRepeat: Yup.mixed()
      .oneOf([Yup.ref('password'), null], 'Passwords must match.')
      .required('This field must be filled.'),
    avatar: Yup.string()
      .required('This field must be filled.')
  });

  return ( 
    <div className="registerPage">
      <Formik
        initialValues={{
          username: '',
          password: '',
          passwordRepeat: '',
          avatar: ''
        }} 
        validationSchema={validationSchema}
          
        onSubmit= {(values, {resetForm}) => {
          console.log(values);
          resetForm({values: ''});
          handleSubmit(values);
        }}
      >
        {({ errors, touched, values, setValues }) => (
          <div className='formContainer'>
            <h1>Fill out the form to register</h1>
            <Form className='registerForm'>
              <label>Username:
                <Field
                  type="text"
                  name='username'
                  value={values.username} 
                  onChange={(e)=>setValues({...values, username:e.target.value})}
                />
                {
                  errors.username && touched.username ? 
                    <span>{errors.username}</span>
                    : null
                }
              </label>
              <label>Password (must be atleast 8 symbols):
                <Field 
                  type="password"
                  name='password'
                  value={values.password} 
                  onChange={(e)=>setValues({...values, password:e.target.value})}
                />
                {
                  errors.password && touched.password ? 
                    <span>{errors.password}</span>
                    : null
                }
              </label>
              <label>Confirm password:
                <Field 
                  type="password"
                  name='passwordRepeat'
                  value={values.passwordRepeat} 
                  onChange={(e)=>setValues({...values, passwordRepeat:e.target.value})}
                />
                {
                  errors.passwordRepeat && touched.passwordRepeat ? 
                    <span>{errors.passwordRepeat}</span>
                    : null
                }
                </label>
                <label>Avatar:
                  <Field 
                    type="url"
                    name='aavatar'
                    value={values.avatar} 
                    onChange={(e)=>setValues({...values, avatar: e.target.value})}
                  />
                  {
                    errors.avatar && touched.avatar ? 
                      <span>{errors.avatar}</span>
                      : null
                  }
                </label>
                <button className="registerButton" type='submit'>Register</button>
            </Form>
          </div>
        )} 
      </Formik>
    </div>
  );
}
 
export default Register;