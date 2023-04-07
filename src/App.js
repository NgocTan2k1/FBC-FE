import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRouters, privateRouters } from '~/routers';

function App() {
    return (
        <Router>
            <Routes>
                {publicRouters.map((route, index) => {
                    const Page = route.component;
                    return <Route key={index} path={route.path} element={<Page />} />;
                })}
                {/* {privateRouters.map((route, index) => {
                    if (localStorage.getItem('userInfo')) {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    }
                    const Page = privateRouters[privateRouters.length - 1].component;
                    return <Route key={index} path={route.path} element={<Page />} />;

                    // const Page = route.component;
                    // return <Route key={index} path={route.path} element={<Page />} />;
                })} */}
            </Routes>
        </Router>
    );
}

export default App;
