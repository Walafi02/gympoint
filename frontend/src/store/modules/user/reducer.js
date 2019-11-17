import produce from 'immer';

const INITIAL_STATE = {
  id: null,
  name: null,
  email: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.id = action.payload.user.id;
        draft.name = action.payload.user.name;
        draft.email = action.payload.user.email;
        break;
      }

      case '@auth/SIGN_OUT': {
        draft.id = null;
        draft.name = null;
        draft.email = null;
        break;
      }

      default:
    }
  });
}
