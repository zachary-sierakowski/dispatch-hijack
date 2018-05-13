const SKIPPED_ACTION_TYPE = "dispatch-hijacked";

const defaultFn = (action, dispatch, getState) => action;
const defaultHijackOptions = {
  key: "hijack",
  skipKey: "skip",
  hijackAll: false
};

const hijackMiddleware = (fn = defaultFn, opts = defaultHijackOptions) => {
  const options = { ...defaultHijackOptions, ...opts };
  const { key, hijackAll, skipKey } = options;

  return ({ dispatch, getState }) => next => action => {
    const { [key]: hijackField, ...plainAction } = action;
    if (hijackAll) {
      return next(fn(plainAction, dispatch, getState));
    }

    if (!hijackField) {
      return next(action);
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
};

export default hijackMiddleware;
