import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { publicRouters, privateRouters } from '~/routers';
import PublicRoute from './routers/PublicRoute';
import PrivateRoute from './routers/PrivateRoute';
import Fobidance404 from './components/pages/Fobidance404';

function App() {
    return (
        <Router>
            <Routes>
                {publicRouters.map((route, index) => {
                    const Page = route.component;
                    return (
                        <Route key={index} path={route.path} element={<PublicRoute restricted={route.restricted} />}>
                            <Route path={route.path} element={<Page />} />
                        </Route>
                    );
                })}
                {privateRouters.map((route, index) => {
                    const Page = route.component;
                    return (
                        <Route key={index} path={route.path} element={<PrivateRoute />}>
                            <Route path={route.path} element={<Page />} />
                        </Route>
                    );
                })}
                <Route path="/404" element={<Fobidance404 />} />
                <Route path="*" element={<Navigate replace to="/404" />} />
            </Routes>
        </Router>
    );
}

export default App;
