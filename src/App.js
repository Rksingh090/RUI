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


const router = createBrowserRouter([
  {
    path: "",
    element: <Base />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/web",
        element: <Web />,
      },
      {
        path: "/web/:containerId",
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
        element: <FileFolder />
      },
      {
        path: "/database",
        element: <Database />
      },
      {
        path: "/terminal",
        element: <Terminal />
      },
      {
        path: "/settings",
        element: <Settings />
      },

    ],
    errorElement: <Error404 />
  }
])

function App() {

  const { theme } = useTheme();

  return (
    <div data-theme={theme} className='mainApp'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
