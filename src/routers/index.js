import SignUp from '~/pages/SignUp';
import SignIn from '~/pages/SignIn';
import Chat from '~/pages/Chat';

// public routers
export const publicRouters = [
    { path: '/', component: SignIn, restricted: true },
    { path: '/signup', component: SignUp, restricted: true },
];

export const privateRouters = [{ path: '/chat', component: Chat }];

export * from './PrivateRoute';
export * from './PublicRoute';
