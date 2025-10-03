import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { routes} from './routes'
import ProfilePage from './pages/ProfilePage';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route)=>{
            const Page = route.page
            const Layout = route.ShowHeader ? DefaultComponent : Fragment
            return (
              <Route key ={route.path} path ={route.path} element={
              <Layout>
                  <Page/>
              </Layout>
              } />  
            )
          })}
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
