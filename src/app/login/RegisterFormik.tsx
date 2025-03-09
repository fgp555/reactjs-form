// import "./Register.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  email: yup.string().email("Email inválido").required("El email es requerido"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es requerida"),
});

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const [storeLocal, setStoreLocal] = useState({});

  const handleSubmit = (values: FormValues) => {
    // Limpiar los espacios antes de almacenar
    const trimmedValues = {
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password.trim(),
    };

    console.log("Datos enviados:", trimmedValues);
    setStoreLocal(trimmedValues);
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <>
            <Form>
              <div className="form-group">
                <Field name="name" type="text" className="input-field" />
                <ErrorMessage name="name" component="p" className="error-message" />
              </div>

              <div className="form-group">
                <Field name="email" type="email" className="input-field" />
                <ErrorMessage name="email" component="p" className="error-message" />
              </div>

              <div className="form-group">
                <Field name="password" type="password" className="input-field" />
                <ErrorMessage name="password" component="p" className="error-message" />
              </div>

              <button type="submit" className="submit-button">
                Registrarse
              </button>
            </Form>

            {/* Mostrar los valores del formulario en tiempo real, sin espacios adicionales */}
            <h3>Vista previa de la data (sin espacios):</h3>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </>
        )}
      </Formik>

      {/* Mostrar los datos enviados (limpios) */}
      <h3>Datos almacenados:</h3>
      <pre>{JSON.stringify(storeLocal, null, 2)}</pre>
    </div>
  );
};

export default RegisterPage;
