import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteSurvey } from '../../store/slices/surveySlice';

const SurveyList = ({ surveys }) => {
  const [deletingId, setDeletingId] = useState(null);
  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleDelete = (surveyId) => {
    if (window.confirm('Are you sure you want to delete this survey?')) {
      setDeletingId(surveyId);
      try {
        dispatch(deleteSurvey(surveyId));
      } catch (error) {
        alert('Failed to delete survey. Please try again.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (!surveys || surveys.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-lg text-gray-500'>
          No surveys yet. Create one to get started!
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
      {surveys.map((survey) => {
        const yesCount = survey.yes || 0;
        const noCount = survey.no || 0;
        const totalAnswers = yesCount + noCount;

        return (
          <div
            key={survey._id}
            className='card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300'
          >
            <div className='card-body'>
              <h2 className='card-title text-lg line-clamp-2'>
                {survey.title || 'Untitled Survey'}
              </h2>
              <p className='text-sm text-gray-600 line-clamp-3 mb-4'>
                {survey.body || 'No description'}
              </p>
              <div className='divider my-2'></div>
              <div className='flex items-center gap-2 text-sm text-gray-500 mb-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                  />
                </svg>
                <span>{formatDate(survey.dateSent)}</span>
              </div>
              <div className='space-y-2'>
                <div className='flex items-center justify-between mb-3'>
                  <span className='text-sm font-semibold text-gray-700'>
                    Total Answers:
                  </span>
                  <span className='text-sm font-bold text-primary'>
                    {totalAnswers}
                  </span>
                </div>
                <div className='flex items-center justify-between p-2 bg-success/10 rounded-lg'>
                  <div className='flex items-center gap-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 text-success'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span className='font-semibold text-success'>YES</span>
                  </div>
                  <span className='text-lg font-bold text-success'>
                    {yesCount}
                  </span>
                </div>
                <div className='flex items-center justify-between p-2 bg-error/10 rounded-lg'>
                  <div className='flex items-center gap-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 text-error'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span className='font-semibold text-error'>NO</span>
                  </div>
                  <span className='text-lg font-bold text-error'>
                    {noCount}
                  </span>
                </div>
              </div>
            </div>
            <div className='card-actions justify-end mt-4'>
              <button
                onClick={() => handleDelete(survey._id)}
                disabled={deletingId === survey._id}
                className='btn btn-error btn-sm'
              >
                {deletingId === survey._id ? (
                  <>
                    <span className='loading loading-spinner loading-xs'></span>
                    Deleting...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                      />
                    </svg>
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SurveyList;
