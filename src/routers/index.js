import SignUp from '~/components/pages/SignUp';
import SignIn from '~/components/pages/SignIn';
import Fobidance404 from '~/components/pages/Fobidance404';
import Chat from '~/components/pages/Chat';

// public routers
export const publicRouters = [
    { path: '/', component: SignIn },
    { path: '/signup', component: SignUp },
    { path: '/*', component: Fobidance404 },
];

export const privateRouters = [
    { path: '/chat', component: Chat },
    { path: '/*', component: Fobidance404 },
];
