import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUser } from './store/slices/authSlice';
import Header from './components/Header';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import SurveyNew from './components/surveys/SurveyNew';
import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className='min-h-screen bg-base-200'>
      <BrowserRouter>
        <Header />
        <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/surveys' element={<Dashboard />} />
            <Route path='/surveys/new' element={<SurveyNew />} />
            <Route path='/api/stripe/success' element={<Dashboard />} />
            <Route path='/api/stripe/cancel' element={<Landing />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
