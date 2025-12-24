import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../store/slices/authSlice';
import { fetchSurveys } from '../store/slices/surveySlice';
import SurveyList from './surveys/SurveyList';

const Dashboard = () => {
  const [sortBy, setSortBy] = useState('date-desc');
  const surveys = useSelector((state) => state.surveys);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchParams.get('session_id')) {
      dispatch(fetchUser());
    }
  }, [dispatch, searchParams]);

  useEffect(() => {
    dispatch(fetchSurveys());
  }, [dispatch]);

  const getSortedSurveys = () => {
    if (!surveys || surveys.length === 0) return [];

    const surveysCopy = [...surveys];

    switch (sortBy) {
      case 'date-desc':
        return surveysCopy.sort((a, b) => {
          const dateA = new Date(a.dateSent || 0);
          const dateB = new Date(b.dateSent || 0);
          return dateB - dateA;
        });

      case 'date-asc':
        return surveysCopy.sort((a, b) => {
          const dateA = new Date(a.dateSent || 0);
          const dateB = new Date(b.dateSent || 0);
          return dateA - dateB;
        });

      case 'title-asc':
        return surveysCopy.sort((a, b) => {
          const titleA = (a.title || '').toLowerCase();
          const titleB = (b.title || '').toLowerCase();
          return titleA.localeCompare(titleB);
        });

      case 'title-desc':
        return surveysCopy.sort((a, b) => {
          const titleA = (a.title || '').toLowerCase();
          const titleB = (b.title || '').toLowerCase();
          return titleB.localeCompare(titleA);
        });

      case 'responses-desc':
        return surveysCopy.sort((a, b) => {
          const totalA = (a.yes || 0) + (a.no || 0);
          const totalB = (b.yes || 0) + (b.no || 0);
          return totalB - totalA;
        });

      case 'responses-asc':
        return surveysCopy.sort((a, b) => {
          const totalA = (a.yes || 0) + (a.no || 0);
          const totalB = (b.yes || 0) + (b.no || 0);
          return totalA - totalB;
        });

      case 'yes-desc':
        return surveysCopy.sort((a, b) => {
          return (b.yes || 0) - (a.yes || 0);
        });

      case 'no-desc':
        return surveysCopy.sort((a, b) => {
          return (b.no || 0) - (a.no || 0);
        });

      default:
        return surveysCopy;
    }
  };

  const sortedSurveys = getSortedSurveys();

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between sm:flex-row flex-col sm:text-left text-center gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-base-content'>My Surveys</h1>
          <p className='text-base-content/70 mt-1'>
            Manage and track your email surveys
          </p>
        </div>
        <div className='form-control w-auto'>
          <label className='label'>
            <span className='label-text font-semibold px-2'>Sort by:</span>
          </label>
          <select
            className='select select-bordered w-56'
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value='date-desc'>Date (Newest First)</option>
            <option value='date-asc'>Date (Oldest First)</option>
            <option value='title-asc'>Title (A-Z)</option>
            <option value='title-desc'>Title (Z-A)</option>
            <option value='responses-desc'>Most Responses</option>
            <option value='responses-asc'>Least Responses</option>
            <option value='yes-desc'>Most YES Votes</option>
            <option value='no-desc'>Most NO Votes</option>
          </select>
        </div>
      </div>
      <SurveyList surveys={sortedSurveys} />
      <Link
        to='/surveys/new'
        className='btn btn-circle btn-primary fixed bottom-6 right-6 z-50 shadow-2xl w-16 h-16 text-2xl hover:scale-110 hover:rotate-90 hover:shadow-primary/50 transition-all duration-300 ease-in-out'
        aria-label='Create new survey'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-8 w-8'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2.5}
            d='M12 4v16m8-8H4'
          />
        </svg>
      </Link>
    </div>
  );
};

export default Dashboard;
