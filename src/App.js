import { RouterProvider, createBrowserRouter } from 'react-router-dom';


// pages 
import Home from './pages/Home';
import { useTheme } from './context/ThemeContext';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }
])

function App() {

  const {theme} = useTheme();

  return (
    <div data-theme={theme}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
