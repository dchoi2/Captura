import SessionStore from '../stores/sessionStore';

function is_server() {
   return ! (typeof window != 'undefined' && window.document);
}

function requireAuth(nextState, replace) {
  console.log("evoked requireAuth")
  console.log("in requireAuth, loggedin: ", SessionStore.isLoggedIn())
  if (is_server()) {
    console.log("Have to authenticate on the server side...")
  }
  else if  (!SessionStore.isLoggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

module.exports = requireAuth;