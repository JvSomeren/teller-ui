import store from '../store';

export function AuthGuard(to, from, next) {
  if(store.getters['auth/isAuthenticated'])
    next();
  else
    next({ name: 'login' });
}

export function LoginGuard(to, from, next) {
  if(store.getters['auth/isAuthenticated'])
    next({ name: 'count' });
  else
    next();
}
