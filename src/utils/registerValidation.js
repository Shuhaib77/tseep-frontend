import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  email:Yup.string().required("email is requird").email("enter valid mail"),
  name:Yup.string().required("name requird"),
  status:Yup.string().required("status requird"),
  countryCode:Yup.string().required("countryCode requird"),
  phone: Yup.number().required("phone is requird"),
  password: Yup.string()
    .required("passwordrequird")
    .min(5, "5character requird"),
});
