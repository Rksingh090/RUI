import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';

// base 
import Base from './components/base/Base';

// pages 
import Home from './pages/Home';
import Web from './pages/Web';
import Error404 from './pages/Error404';
import Docker from './pages/Docker';
import FileFolder from './pages/FileFolder';
import Database from './pages/Database';
import Terminal from './pages/Terminal';
import Settings from './pages/Settings';
import WebDetails from './pages/WebDetails';
import AddWeb from './pages/AddWeb';
import DockerNetwork from './pages/DockerNetwork';
import FileContext from './context/FileContext';

// auth 
import Login from './auth/Login';
import Protected from './auth/Protected';

import WebContext from './context/WebContext';
import DockerContext from './context/DockerContext';
import { useEffect } from 'react';

const router = createBrowserRouter([
  {
    path: "",
    children: [
      {
        path: "/",
        element:
          <DockerContext>
            <WebContext>
              <Protected><Base /></Protected>
            </WebContext>
          </DockerContext>
        ,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "/web",
            element: <Web />,
          },
          {
            path: "/web/:containerId/:webName",
            element: <WebDetails />
          },
          {
            path: "/add/web",
            element: <AddWeb />
          },
          {
            path: "/docker",
            element: <Docker />
          },
          {
            path: "/files",
            element: <FileContext><FileFolder /></FileContext>
          },
          {
            path: "/database",
            element: <Database />
          },
          {
            path: "/network",
            element: <DockerNetwork />
          },
          {
            path: "/terminal",
            element: <Terminal />
          },
          {
            path: "/setting",
            element: <Settings />
          },
        ]
      },
      {
        path: "/login",
        element: <Protected reverse={true}><Login /></Protected>
      }

    ],
    errorElement: <Error404 />
  }
])

function App() {

  const { theme, splashShowed, setSplashShowed } = useTheme();

  useEffect(() => {
    setTimeout(() => {
      setSplashShowed(true)
    }, 2500)
  }, [])

  return (
    <div data-theme={theme} className='mainApp'>
      <div className={`${splashShowed ? "hideSplace" : "showSplash"}`}>
        <span className='splashAnimation'></span>
      </div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
