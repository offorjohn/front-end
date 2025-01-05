/* eslint-disable import/no-unresolved */
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import DashboardLayout from 'src/layouts/dashboard';

// Lazy load pages
const IndexPage = lazy(() => import('src/pages/app'));
const BlogPage = lazy(() => import('src/pages/blog'));
const UserPage = lazy(() => import('src/pages/user'));
const LoginPage = lazy(() => import('src/pages/login'));
const ProductsPage = lazy(() => import('src/pages/products'));
const OrderPage =  lazy(() => import('src/pages/order'));
const DedicatedPage =  lazy(() => import('src/pages/dedicated'));


const AboutPage = lazy(() => import('src/pages/about')); 

const Private = lazy(() => import('src/pages/private'))

const Terms = lazy(() => import('src/pages/terms'))







// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <DashboardLayout>
            <Outlet />
          </DashboardLayout>
        </Suspense>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'dedicated', element: <DedicatedPage /> },
        { path: 'order', element: <OrderPage/> },
   
      ],
    },
  
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'about',
      element: < AboutPage/>
    },
    {
      path: 'terms',
      element: <Terms/>

    },
    {
      path: 'private',
      element: < Private/>

    },
 
    {
      path: '*',
      element: <Navigate to="./login" replace />,
    },
  ]);

  return routes;
}

// LoadingSpinner component
function LoadingSpinner() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
        width: '100vw',  // Full viewport width
        backgroundColor: 'background.default',
      }}
    >
      <CircularProgress
        sx={{
          color: 'primary.main', // Use the primary color from your theme
          size: 60, // Adjust the size as needed
        }}
      />
    </Box>
  );
}
