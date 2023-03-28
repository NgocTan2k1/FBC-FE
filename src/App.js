import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { publicRouters } from '~/routers';

function App() {
    return (
        <Router>
            <Routes>
                {publicRouters.map((route, index) => {
                    const Page = route.component;
                    return <Route key={index} path={route.path} element={<Page />} />;
                })}
            </Routes>
        </Router>
    );
}

export default App;
