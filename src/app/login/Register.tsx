import { useState } from "react";
import * as yup from "yup";
// import "./Register.css";
document.body.setAttribute("data-theme", "dark");

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
  const [formData, setFormData] = useState<FormValues>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateField = async (field: keyof FormValues, value: string) => {
    try {
      await schema.validateAt(field, { [field]: value });
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [field]: (error as yup.ValidationError).message }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateField(e.target.name as keyof FormValues, e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      schema.validateSync(formData, { abortEarly: false });
      setErrors({});
      console.log("Datos enviados:", formData);
      setSuccessMessage("Registro exitoso");
    } catch (validationError) {
      const newErrors: Partial<FormValues> = {};
      (validationError as yup.ValidationError).inner.forEach((err) => {
        if (err.path) newErrors[err.path as keyof FormValues] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label>Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <button type="submit">Registrarse</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default RegisterPage;
