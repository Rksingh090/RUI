import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';

// pages 
import Home from './pages/Home';
import Base from './components/Base';
import Web from './pages/Web';
import Error404 from './pages/Error404';


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
        element: <Web />
      }

    ],
    errorElement: <Error404 />
  }
])

function App() {

  const { theme } = useTheme();

  return (
    <div data-theme={theme}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
