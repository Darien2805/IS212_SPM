# IS212_SPM
# Getting Started with Our Project

This project was bootstrapped and created with React , NodeJS, ExpressJS.
Our database is a relational database and uses SQL.

### Prerequisites
You have to have your MAMP/ WAMP working, SQL server is running.

## Database
You have to run the "raw data sql script" in the /database folder in your SQLWorkbench or in [phpMyAdmin](http://localhost/phpmyadmin/import.php) in order to populate the database.

## Cloning of Git Repository
When you clone this Git Repository locally, be sure to install all packages with `npm i` first

## Available Scripts

In the respective directories, you can run:

### `npm run devStart`

Runs the backend server and starts the api routes. Different from npm start because this command had nodemon built in, which allows updates to automatically restart the server to see the changes.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

Only works in the /frontend folder because that is where all our tests are. However, these tests are automatically run via CI codes.
see "Actions" in Github.


### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Running the backend
From the main directory, do cd /backend and then run `npm run devStart`

### Running the frontend
From the main directory , do cd /frontend and then run `npm start`

### Known Bugs
If you are running SQL v8.0 and above on a Mac, there is an error that prevents data from being retrieved and crashes the whole database. It is something to do with SQL= only_full_group_by. We have shown prof Keith and acknowledges that there is nothing that can be done except downgrading your SQL

If you are running a Mac, be sure to enter your password in the index.js in the backend folder.
