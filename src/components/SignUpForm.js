import React, { useMemo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { loadSignUpFormSchema } from "../common/FormValidationUtility";
import { yupResolver } from "@hookform/resolvers";
import { registerUser, getUserDetail } from "../services/SignUpService";

function SignUpForm() {
  const validationSchema = useMemo(() => loadSignUpFormSchema(), []);
  const [formData, setFormData] = useState(null);
  const [registrationResponse, setRegistrationResponse] = useState("");
  const [userDetails, setUserDetails] = useState("");

  useEffect(() => {
    async function signUp() {
      if (formData) {
        //Sigup API called
        try {
          const response = await registerUser(formData);
          console.log(response);
          setRegistrationResponse(`Registration successfull for user`);
          //Delay of 4 seconds
          await delay(4000);
          //Get user API called
          const user = await getUserDetail();
          console.log(user);
          setUserDetails(`User found ${JSON.stringify(user)}`);
        } catch (err) {
          console.log(err);
        }
      }
    }
    signUp();
  }, [formData]);

  const delay = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const formSubmitHandler = (user) => {
    setFormData(user);
  };

  return (
    <div className="card" style={{ width: "50%", margin: "5% auto" }}>
      <h5 className="card-header text-center" data-testid="testid-form-header">
        SignUp Form
      </h5>
      <div className="card-body text-left">
        <form
          onSubmit={handleSubmit(formSubmitHandler)}
          data-testid="testid-form"
        >
          <div className="form-group">
            <label>First Name</label>
            <input
              name="firstName"
              type="text"
              ref={register}
              aria-label="firstname"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.firstName?.message}</div>
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              name="lastName"
              type="text"
              ref={register}
              aria-label="lastname"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.lastName?.message}</div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="text"
              ref={register}
              aria-label="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              ref={register}
              aria-label="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary mr-1"
              data-testid="register-button"
            >
              Register
            </button>
          </div>
        </form>
        {registrationResponse!="" && (<h5 className="card-footer text-center">{registrationResponse}</h5>)}
        {userDetails!="" && (<h5 className="card-footer text-center">{userDetails}</h5>)}
      </div>
    </div>
  );
}

export default SignUpForm;
