import * as yup from "yup";

export const loadSignUpFormSchema = () => {
  const defaultStr = yup.string().default("");
  return yup.object({
    firstName: defaultStr.required("please enter firstname"),
    lastName: defaultStr.required("please enter lastname"),
    email: defaultStr
      .email("please enter valid email")
      .required("please enter email"),
    password: defaultStr
      .required("please enter password")
      .min(8, "password should contain min 8 letters")
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]/,
        "password should contain lower and uppercase letters"
      )
      .test(
        "password",
        "passwords must not contain firstName and lastName",
        function (value) {
          return (
            !value.includes(this.resolve(yup.ref("firstName"))) &&
            !value.includes(this.resolve(yup.ref("lastName")))
          );
        }
      ),
  });
};
