# eslint-plugin-lodash-restrictions

Restricts and/or prevents usage of certain lodash functions

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-lodash-restrictions`:

```
$ npm install eslint-plugin-lodash-restrictions --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-lodash-restrictions` globally.

## Usage

Add `lodash-restrictions` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "lodash-restrictions"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "lodash-restrictions/rule-name": 2
    }
}
```

## Supported Rules

`no-lodash-isundefined` : Prevents usage of `_.isUndefined` method

`no-lodash-isnull` : Prevents usage of `_.isNull` method
