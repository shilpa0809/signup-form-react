import React from "react";
import App from "./App";
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, cleanup, waitFor, act } from "@testing-library/react";

const renderApp = () => render(<App />);

const testIds = {
  form: "testid-form",
  formHeader: "testid-form-header",
  registerButton: "register-button",
};

const server = setupServer(
  rest.post('https://reqres.in/api/users/', (req, res, ctx) => {
    return res(ctx.json({ firstName:"Jonny", lastName:"Yom",email:"jonny@test.com" }));
  }),
  rest.get('https://reqres.in/api/users/', (req, res, ctx) => {
    return res(([{"firstName":"John","lastName":"Doe","email":"johndoe@gmail.com"}]));
  })
)

beforeAll(() => server.listen())
afterEach(() => {
  cleanup();
  server.close()
});
afterEach(() => server.resetHandlers())

test("renders sign-up form header", () => {
  const { queryByTestId } = renderApp();
  const formHeader = queryByTestId(testIds.formHeader);
  expect(formHeader).toHaveTextContent("SignUp Form");
});

test("renders sign-up form with 5 fields", () => {
  const expectedLabelNames = ["First Name", "Last Name", "Email", "Password"];
  const { queryByTestId } = renderApp();
  const form = queryByTestId(testIds.form);
  expect(form.children).toHaveLength(5);

  const childElements = form.children;
  for (let i = 0; i < childElements.length - 1; i++) {
    expect(childElements[i].querySelector("label")).toHaveTextContent(
      expectedLabelNames[i]
    );
  }
});

test("renders Register button", () => {
  const { getByText } = renderApp();
  expect(getByText("Register")).toBeInTheDocument();
});

test("validate form when click Register button without values", async () => {
  const { queryByTestId, getByText } = renderApp();
  const registerButton = queryByTestId(testIds.registerButton);

  fireEvent.click(registerButton);
  await waitFor(() => {
    expect(getByText("please enter firstname")).toBeInTheDocument();
    expect(getByText("please enter lastname")).toBeInTheDocument();
    expect(getByText("please enter email")).toBeInTheDocument();
    expect(getByText("please enter password")).toBeInTheDocument();
  });
});

test("validate password", async () => {
  const { queryByTestId, getByText, getByLabelText } = renderApp();
  const password = getByLabelText("password");
  const registerButton = queryByTestId(testIds.registerButton);

  const firstName = getByLabelText("firstname");
  fireEvent.change(firstName, { target: { value: "Jonny" } });

  fireEvent.change(password, { target: { value: "" } });
  fireEvent.click(registerButton);
  await waitFor(() => {
    expect(getByText("please enter password")).toBeInTheDocument();
  });

  fireEvent.change(password, { target: { value: "1234567" } });
  fireEvent.click(registerButton);
  await waitFor(() => {
    expect(
      getByText("password should contain min 8 letters")
    ).toBeInTheDocument();
  });

  fireEvent.change(password, { target: { value: "12345678" } });
  fireEvent.click(registerButton);
  await waitFor(() => {
    expect(
      getByText("password should contain lower and uppercase letters")
    ).toBeInTheDocument();
  });

  fireEvent.change(password, { target: { value: "12345Jonny678" } });
  fireEvent.click(registerButton);
  await waitFor(() => {
    expect(
      getByText("passwords must not contain firstName and lastName")
    ).toBeInTheDocument();
  });
});

test("renders successfull form submission with message", async () => {
  const { queryByTestId, getByText, getByLabelText } = renderApp();
  const firstName = getByLabelText("firstname");
  const lastName = getByLabelText("lastname");
  const email = getByLabelText("email");
  const password = getByLabelText("password");

  fireEvent.change(firstName, { target: { value: "Jonny" } });
  fireEvent.change(lastName, { target: { value: "Yom" } });
  fireEvent.change(email, { target: { value: "jonny@test.com" } });
  fireEvent.change(password, { target: { value: "1234567wW" } });

  const registerButton = queryByTestId(testIds.registerButton);
  fireEvent.click(registerButton);

  jest.useFakeTimers();
  await waitFor(() => {
    expect(getByText("Registration successfull for user")).toBeInTheDocument();
  });
  act(() => {
    jest.advanceTimersByTime(5000);
  });
  await waitFor(() => {
    expect(getByText('User found [{"firstName":"John","lastName":"Doe","email":"johndoe@gmail.com"}]')).toBeInTheDocument();
  });
});