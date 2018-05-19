# Dispatch Hijack

Dispatch Hijack [middleware](http://redux.js.org/docs/advanced/Middleware.html) allows you to write redux side effects on a per-action basis.

[![Build Status](https://travis-ci.org/zachary-sierakowski/dispatch-hijack.svg?branch=master)](https://travis-ci.org/zachary-sierakowski/dispatch-hijack)
[![npm version](https://badge.fury.io/js/dispatch-hijack.svg)](https://badge.fury.io/js/dispatch-hijack)
[![semantic-release](https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Motivation

Redux action side effects can be managed based on `action.type` with a switch statement within a custom middleware. However, this `case` logic can be a pain to manage and tend to be too abstracted from the original action that triggers it.

Dispatch Hijack allows side effects to be written on a per-action basis -- without complicated `case` logic.

## Installation

```
npm install --save dispatch-hijack
```

Then, to enable Dispatch Hijack, use [`applyMiddleware()`](http://redux.js.org/docs/api/applyMiddleware.html):

```javascript
import { createStore, applyMiddleware } from "redux";
import hijack from "dispatch-hijack";
import rootReducer from "./reducers/index";

// Note: this API requires redux@>=3.1.0
const store = createStore(rootReducer, applyMiddleware(hijack));
```

## Basic Usage

Add the `hijack` key to any action. The `hijack` key will be removed before passing the action to the next middleware or reducer.

```javascript
const normalAction = {
  type: "ACTION"
};

const hijackedAction = {
  type: "ACTION",
  hijack: action => {
    console.log("Hijacked");
    return action;
  }
};
```
