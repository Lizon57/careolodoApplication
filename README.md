# Careolodo App

![Careolodo homepage](https://maccabipedia.co.il/oren/careolodo%20homepage.png)

## Motivation & context

Careolodo is an E2E (frontend and backend) todo app build as a job application process.

# App Usage

1. Clone repository (https://github.com/Lizon57/careolodoApplication.git).
2. Command `npm i`.
3. Ask (me) for the aws_export.js file (will grant you access to aws services).
4. Place the aws_export.js file at `\src\` directory.
5. Command `npm start` and enjoy app!

## In app use

![Careolodo homepage](https://maccabipedia.co.il/oren/careolodo%20todos.png)
After a quick signup and login (using aws cognito) client can create his own todo list.
All lists are per owner restricted. That means only the owner of a todo can crudl through it.

## Stack

### AWS services:

- AWS appSync
- AWS DynamoDB
- AWS Cognito
- AWS Amplify (GraphQL)

### Frontend:

- React 18 (hooks usage)
- TypeScript
- Styled Components
- Axios

## Fixtures:

- Authentication
- Authorization
- CRUDL Todo
- Declare location for todo (TodoPreview cmp will show the current temperature in this location via worldweatheronline API)
- Filter todo by text
- Sort todo by text and state (done / hasn't done)
- Inline editing of todo (text and location) as well as one-click-edit button on todo state
- Calculate how much todos have been completed out of total todos count
