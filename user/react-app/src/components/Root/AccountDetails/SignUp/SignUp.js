import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";

import TextInput from "#root/components/shared/TextInput";

const Label = styled.label`
  display: block;

  :not(:first-child) {
    margin-top: 0.75rem;
  }
`;

const LabelText = styled.strong`
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const SignUpButton = styled.button`
  display: inline-block;
  margin-top: 0.5rem;
`;

const OrLogin = styled.span`
  font-size: 0.9rem;
`;

const mutation = gql`
  mutation($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
    }
  }
`;

const validationSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required().test("sameAsConfirmPassword", "${path} is not the same as the confirmation password", function () {
      return this.parent.password === this.parent.confirmPassword;
    })
});

const SignUp = ({ onChangeToSignUp: pushChangeToLogin }) => {
  const [createUser] = useMutation(mutation);
  const {
    formState: { isSubmitting, isValid },
    handleSubmit,
    register,
    reset
  } = useForm({ mode: "onChange", validationSchema });  

  const onSubmit = handleSubmit(async ({ email, password }) => {
    await createUser({ variables: { email, password } });
    reset();
    pushChangeToLogin();
  });

  return (
    <form onSubmit={onSubmit}>
      <Label>
        <LabelText>Email</LabelText>
        <TextInput type="email" {...register('email', { required: true })} />
      </Label>
      <Label>
        <LabelText>Password</LabelText>
        <TextInput type="password" {...register('password', { required: true })} />
      </Label>
      <Label>
        <LabelText>Confitm password</LabelText>
        <TextInput type="password" {...register('confirmPassword', { required: true })} />
      </Label>
      <SignUpButton disabled={isSubmitting || !isValid} type="submit">Sign Up</SignUpButton>
      <OrLogin>
      {" "}or{" "}
        <a href="#" onClick={evt => {
            evt.preventDefault();
            pushChangeToLogin();
          }}
        >
          Login
        </a>
      </OrLogin>
    </form>
  );
};

export default SignUp;