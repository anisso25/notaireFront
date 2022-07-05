import produce from 'immer';
import { handleActions as raHandleActions } from 'redux-actions';

export const handleActions = (actions, state) => raHandleActions(
  Object.keys(actions).reduce((acc, key) => {
    const temp = acc;
    temp[key] = produce(actions[key]);
    return temp;
  }, {}),
  state,
);
