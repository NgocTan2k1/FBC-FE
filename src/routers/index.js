import SignUp from '~/components/pages/SignUp';
import SignIn from '~/components/pages/SignIn';
import Chat from '~/components/pages/Chat';

// public routers
export const publicRouters = [
    { path: '/', component: SignIn, restricted: true },
    { path: '/signup', component: SignUp, restricted: true },
];

export const privateRouters = [{ path: '/chat', component: Chat }];

export * from './PrivateRoute';
export * from './PublicRoute';
