import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// Main application component with routes
import { MainLayout } from './components/layout/MainLayout';
import { PageLoader } from './components/ui/PageLoader';

const HomePage = lazy(() => import('./routes/home/HomePage'));
const ServicesPage = lazy(() => import('./routes/services/ServicesPage'));
const EcommercePage = lazy(() => import('./routes/ecommerce/EcommercePage'));
const AboutPage = lazy(() => import('./routes/about/AboutPage'));
const BlogPage = lazy(() => import('./routes/blog/BlogPage'));
const BlogPostPage = lazy(() => import('./routes/blog/BlogPostPage'));
const ContactPage = lazy(() => import('./routes/contact/ContactPage'));
const AdminDashboard = lazy(() => import('./routes/admin/AdminDashboard'));
const NotFoundPage = lazy(() => import('./routes/not-found/NotFoundPage'));

export default function App() {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="servicos" element={<ServicesPage />} />
            <Route path="ecommerce" element={<EcommercePage />} />
            <Route path="sobre" element={<AboutPage />} />
            <Route path="blog">
              <Route index element={<BlogPage />} />
              <Route path=":slug" element={<BlogPostPage />} />
            </Route>
            <Route path="contato" element={<ContactPage />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
