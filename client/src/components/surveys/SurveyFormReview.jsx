import { useState } from 'react';
import formFields from './formFields';

const SurveyFormReview = ({ onCancel, onSubmit, formValues }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await onSubmit();
    setIsSubmitting(false);
  };

  const reviewFields = formFields.map(({ label, name }) => {
    const value = formValues[name] || 'Not provided';
    const isLongText = name === 'body' || name === 'recipients';

    return (
      <div key={name} className='mb-6'>
        <div className='flex items-center gap-2 mb-2'>
          <label className='label-text font-semibold text-base-content text-lg'>
            {label}
          </label>
        </div>
        <div
          className={`p-4 rounded-lg bg-base-200 border border-base-300 ${
            isLongText ? 'whitespace-pre-wrap' : ''
          }`}
        >
          <p className='text-base-content/80 wrap-break-word'>{value}</p>
        </div>
      </div>
    );
  });

  return (
    <div className='max-w-2xl mx-auto'>
      <div className='card bg-base-100 shadow-xl'>
        <div className='card-body'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='flex items-center justify-center w-12 h-12 rounded-full bg-primary/10'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 text-primary'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <div>
              <h2 className='card-title text-2xl'>Review Your Survey</h2>
              <p className='text-base-content/70 text-sm'>
                Please review your entries before sending
              </p>
            </div>
          </div>
          <div className='divider'></div>
          <div className='space-y-4'>{reviewFields}</div>
          <div className='divider my-6'></div>
          <div className='flex flex-col sm:flex-row gap-3 justify-end'>
            <button
              onClick={onCancel}
              disabled={isSubmitting}
              className='btn btn-outline btn-sm sm:btn-md order-2 sm:order-1'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M10 19l-7-7m0 0l7-7m-7 7h18'
                />
              </svg>
              Back to Edit
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className='btn btn-primary btn-sm sm:btn-md order-1 sm:order-2'
            >
              {isSubmitting ? (
                <>
                  <span className='loading loading-spinner loading-sm'></span>
                  Sending...
                </>
              ) : (
                <>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                    />
                  </svg>
                  Send Survey
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyFormReview;
