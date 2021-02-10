# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# SignUp Form Details #
This is a simple signup form created using hooks, yup and bootstrap.\

## Application Design Overview
For simplicity, bootstrap is used for form.\
Yup schema is used for validation which is a handy validation schema with rich functions.\
React-Hook-Form is used for handling for fields and events related to that. React hook form is easy to use and integrate with yup as well with resolvers.\
I used functional component and react hooks for signup form.\
Axios is used with async/await for POST/GET calls

## Test Case description
React testing library is used for testing.
Mock Service Worker(msw) is used for mocking API.
For simplicity, I created all possible test in App.test.js. which covers following on a high level.\
SignUp Form UI rendering.\
validation messages.\
Mocking axios call for successfull submission of POST and GET call with an interval of 4000 ms.\

## Important Observation
API: https://demo-api.now.sh/users is not persisting data.\
POST: response successfull with status 200 but GET call do not retrieve data for that user.\
Test case written using mock data from API.\
For Errorhandling-> Console is used for simplicity-> We can render it on UI or redirect to a error page if required.


# How to run project #

Clone the project and Perform following taks.\

### `npm install`

This will install all dependencies required for project

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.