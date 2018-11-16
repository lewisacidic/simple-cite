# rollup-starter

Starter javascript package

## Dependencies

Dependencies are installed using [yarn](https://yarnpkg.com) with `yarn install`.

## Build

Transpilation is carried out using [babel](https://babeljs.io), and packages built using [rollup](https://rollupjs.org/).

## Tests

Tests are run using [jest](https://jestjs.io), with `yarn test`.

## Code Linting and Autoformatting

Code linting is run using [prettier](https://prettier.io) and [eslint](https://eslint.org), using `yarn lint`.
Autoformatting may be carried out using `yarn format`.

## Git hooks

Several git hooks are configured using [husky](https://github.com/typicode/husky/blob/master/DOCS.md).

A pre-commit hook will run code linting on staged code, and reject the commit if incorrectly formatted.  
This is implemented using and [lint-staged](https://github.com/okonet/lint-staged/blob/master/README.md).

A commit-msg hook will be run to ensure commit messages are conform to the typical commit convention of

```
type(scope?): subject

body?

footer?
```

## Continuous Integration

[CircleCI](https://circleci.com/) is used to run tests on pushing to remote.
