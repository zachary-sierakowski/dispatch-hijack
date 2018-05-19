const SKIPPED_ACTION_TYPE = "dispatch-hijacked";

const defaultFn = (action, dispatch, getState) => action;
const defaultHijackOptions = {
  key: "hijack",
  skipKey: "skip",
  hijackAll: false
};

let fn = defaultFn;
let { key, skipKey, hijackAll } = defaultHijackOptions;
const hijackMiddleware = ({ dispatch, getState }) => next => action => {
  const { [key]: hijackField, ...plainAction } = action;
  if (hijackAll) {
    return next(fn(plainAction, dispatch, getState));
  }

  if (!hijackField) {
    return next(action);
  }

  if (typeof hijackField === "function") {
    return next(hijackField(plainAction, dispatch, getState));
  }

  if (typeof hijackField === "boolean" && hijackField) {
    return next(fn(plainAction, dispatch, getState));
  }

  if (typeof hijackField === "object") {
    const { [skipKey]: skip } = hijackField;
    if (skip) {
      fn(plainAction, dispatch, getState);
      return next({ type: SKIPPED_ACTION_TYPE });
    } else {
      return next(fn(plainAction, dispatch, getState));
    }
  }

  return next(action);
};

export const createHijackMiddleware = (
  fct = defaultFn,
  opts = defaultHijackOptions
) => {
  const options = { ...defaultHijackOptions, ...opts };
  key = options.key;
  skipKey = options.skipKey;
  hijackAll = options.hijackAll;
  fn = fct;

  return hijackMiddleware;
};

export default hijackMiddleware;
