export function signInSuccess(id) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    id,
  };
}
