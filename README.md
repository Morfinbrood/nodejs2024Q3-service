# Home Library Service
It may seem like there is a lot of repeating code here, since the functionality of the modules is very similar, but I see this project like the Yandex.Music, where modules starts with the same start base, and then each module is scaled and adds functionality in very different ways.
At the moment, this is the structure that seems to me to be the most readable and easily scalable and maintainable.
## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/Morfinbrood/nodejs2024Q3-service
```

## Installing NPM modules

```
npm install
```

## Running application

```
docker compose up
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:  

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```
### Build documentation doc/api.yaml

```
npm run generate:swagger
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging


