import * as Yup from 'yup'

 export const loginschema=Yup.object().shape({
    countryCode:Yup.string().required("countryCode requird"),
    phone:Yup.number().required("phone is requird"),
    password:Yup.string().min(5,"5character requird").required("passwordrequird")
 })