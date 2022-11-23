
[![Build status](https://dev.azure.com/APS-SD-Stewards/APS-SD/_apis/build/status/proscrumdev.battleship-nodejs-CI)](https://dev.azure.com/APS-SD-Stewards/APS-SD/_build/latest?definitionId=22)

# Battleship NodeJs

A simple game of Battleship, written in NodeJs/Typescript. The purpose of this repository is to serve as an entry point into coding exercises and it was especially created for scrum.orgs Applying Professional Scrum for Software Development course (www.scrum.org/apssd). The code in this repository is unfinished by design.

# Getting started

To edit and debug this project, you can use [Visual Studio Code](https://code.visualstudio.com/) or any other suitable editor.
You might want to install these extensions to better support this project in VSCode:
* Mocha Test Explorer https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter
* Cucumber (Gherkin) Full Support https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete

## Run locally
Install packages

```bash
npm install
```

Run battleship

```bash
npm run start
```

## Execute tests

Execute all tests
```bash
npm run test
```
## Run Cucumber
```
./node_modules/.bin/cucumber-js -p default
```
## Docker

To run and test the project in a container, use these steps:

```bash
docker run -it -v ${PWD}:/battleship -w /battleship node bash
npm install
npm run test
npm run start
```

# Run sonarqube for typescript files

You can run sonar by using
```
npm run sonar
```
This will require an external sonar service configured, such as http://sonar.mysite.com. You will see links to code quality at http://sonar.mysite.com/about

But if you want to run it against a local sonar server, follow steps below

## Step 1: Install sonarqube docker first
```
docker run -d --name sonarqube -p 9000:9000 sonarqube
```
## Step 2: run sonar-scanner for local docker sonar instance as
```
npm run sonar-local
```

You will see links to code quality at http://localhost:9000/about

