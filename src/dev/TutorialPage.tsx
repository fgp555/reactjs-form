import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
});

interface IFormValues {
  name: string;
}

const TutorialPage = () => {
  const [localStore, setLocalStore] = useState({});

  const handleSubmit = (values: IFormValues) => {
    setLocalStore(values);
  };

  return (
    <div>
      <h2>Form</h2>
      <Formik
        initialValues={{ name: "" }}
        validationSchema={schema}
        // onSubmit={()=>{}}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <>
            <Form>
              <div>
                <Field name="name" />
                <ErrorMessage name="name" component="div" className="error-message" />
              </div>
              <button>Submit</button>
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
