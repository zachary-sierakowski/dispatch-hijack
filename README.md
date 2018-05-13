# dispatch-hijack

Hijack dispatched actions before they reach reducers -- without writing middleware

[![Build Status](https://travis-ci.org/zachary-sierakowski/dispatch-hijack.svg?branch=master)](https://travis-ci.org/zachary-sierakowski/dispatch-hijack) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![semantic-release](https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
vg)](https://github.com/semantic-release/semantic-release)

## Setup

Add `hijackMiddleware` to the store:

```javascript
import hijackMiddleware from "dispatch-hijack";

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware([hijackMiddleware(), ...middleware]))
);
```

## Usage

Add `hijack: true` to any action. The `hijack` field will be removed and your function will be run.

```javascript
export const normalAction = () => (dispatch, getState) => {
  dispatch({
    type: "MY_ACTION"
  });
};

export const hijackedAction = () => (dispatch, getState) => {
  dispatch({
    type: "MY_ACTION"
    hijack: true
  });
};
```
