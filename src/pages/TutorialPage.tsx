import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es requerida"),
});

interface IFormValues {
  name: string;
  password: string;
}

const TutorialPage = () => {
  const [localStore, setLocalStore] = useState({});

  const handleSubmit = (values: IFormValues) => {
    const { name, password } = values;
    // trim name and password
    values = { name: name.trim(), password: password.trim() };

    setLocalStore(values);
  };
  return (
    <div>
      <Formik
        initialValues={{ name: "", password: "" }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        validationSchema={schema}
      >
        {({ values }) => (
          <>
            <Form>
              <div>
                <label htmlFor="name">Name</label>
                <Field type="text" id="name" name="name" />
                <ErrorMessage name="name" component="p" className="error-message" />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage name="password" component="p" className="error-message" />
              </div>
              <button type="submit">Submit</button>
            </Form>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </>
        )}
      </Formik>
      <pre>{JSON.stringify(localStore, null, 2)}</pre>
    </div>
  );
};

export default TutorialPage;
