# Angular.JS Coding Kata

## Setup

All you need installed to run this project is Node.JS. Run this command from a terminal to setup the environment

```bash
npm install
```

Once done, you will need to run 3 different commands on your the workflow. Open each one in a different terminal window:
```js

gulp watch		// file watcher, rebuilds the project on save
gulp server		// the file server
gulp test 		// test runner

```

## Files and folders

Put the HTML templates under `/views`, the app files under `src`, the SASS sources under `scss` and the tests under `test`.
The file structure is straightforward and easy to get going

To use the app without a backend (for testing purposes), go to `http://localhost:8000/index-dev.html` and write server-side stuff under `public/mock`.
To see the app in action with a backend (which is not implemented here), go to `http://localhost:8000/`