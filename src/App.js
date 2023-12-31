// import { useEffect } from 'react';

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
import Github from './pages/Github';

// auth 
import Login from './auth/Login';
import Protected from './auth/Protected';

// contexts 
import FileContext from './context/FileContext';
import WebContext from './context/WebContext';
import DockerContext from './context/DockerContext';
import GithubSetup from './pages/GithubSetup';
import GithubContext from './context/GithubContext';
import { useEffect } from 'react';

const router = createBrowserRouter([
  {
    path: "",
    children: [
      {
        path: "/",
        element: (
          <GithubContext>
            <DockerContext>
              <WebContext>
                <Protected>
                  <Base />
                </Protected>
              </WebContext>
            </DockerContext>
          </GithubContext>
        ),
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
            path: "/github",
            element: <Github />,
          },
          {
            path: "/setting",
            element: <Settings />
          },
        ]
      },
      {
        path: "/github/setup",
        element: <GithubSetup />
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

  const {
    theme,
    // splashShowed,
    setSplashShowed
  } = useTheme();

  useEffect(() => {
    setTimeout(() => {
      setSplashShowed(true)
    }, 2500)
  }, [setSplashShowed])

  return (
    <div data-theme={theme} className='mainApp'>
      {/* <div className={`${splashShowed ? "hideSplace" : "showSplash"}`}>
        <span className='splashAnimation'>{window.APP_PORT}</span>
      </div> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
