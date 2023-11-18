import { ChangeEvent, FormEvent, FocusEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../features/userAPI";
import { UserData } from "../../types/user";
import FormField from "../../components/formField/formField";
import './login.scss';


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirm: "",
  }
  const [data, setData] = useState<UserData>(initialState);
  const formFields = [
    { type: "text", label: "Имя", name: "name", value: data.name, placeholder: "Артур", handleChange: handleChange, handleBlur: handleBlur },
    { type: "email", label: "Электроная почта", name: "email", value: data.email, placeholder: "example@mail.ru", handleChange: handleChange, handleBlur: handleBlur },
    { type: "password", label: "Пароль", name: "password", value: data.password, placeholder: "*****", handleChange: handleChange, handleBlur: handleBlur },
    { type: "password", label: "Подтвердите пароль", name: "confirm", value: data.confirm, placeholder: "*****", handleChange: handleChange, handleBlur: handlePasswordBlur },
  ]

  function renderFormFields() {
    return formFields.map(({ type, label, name, value, placeholder, handleChange, handleBlur }, i) => (
      <FormField
        key={i}
        type={type}
        label={label}
        name={name}
        value={value}
        placeholder={placeholder}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
    ))
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleBlur(e: FocusEvent<HTMLInputElement>) {
    if (!e.target.value) {
      e.target.classList.add("invalid");
      e.target.parentElement?.classList.add("field_invalid");
    } else {
      e.target.classList.remove("invalid");
      e.target.parentElement?.classList.remove("field_invalid");
      e.target.setCustomValidity("");
    }
  }

  function handlePasswordBlur(e: FocusEvent<HTMLInputElement>) {
    if (data.password !== data.confirm || !data.confirm) {
      e.target.classList.add("invalid");
      e.target.parentElement?.classList.add("field_invalid");
      e.target.setCustomValidity("Пароли не совпадают");
    } else {
      e.target.classList.remove("invalid");
      e.target.parentElement?.classList.remove("field_invalid");
      e.target.setCustomValidity("");
    }
  }
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await registerUser(data.email, data.password);
    if (result) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("user_id", String(result.id));
      navigate("/");
    }
  }

  return (
    <main className="main__container">
      <div className="form__container">
        <h1 className="form__title">Регистрация</h1>
        <form
          className="form__fields"
          onSubmit={handleSubmit}
        >
          {renderFormFields()}
          <button
            type="submit"
            className="form__regbtn"
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
    </main>
  )
}

export default Login;