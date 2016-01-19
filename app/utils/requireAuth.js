import SessionStore from '../stores/sessionStore';

function requireAuth(nextState, replace) {
  console.log("evoked requireAuth")
  if (!SessionStore.isLoggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

module.exports = requireAuth;