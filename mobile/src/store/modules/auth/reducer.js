import produce from 'immer';

const INITIAL_STATE = {
  singed: false,
  student_id: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.student_id = action.id;
        draft.singed = true;
        break;
      }

      default:
    }
  });
}
