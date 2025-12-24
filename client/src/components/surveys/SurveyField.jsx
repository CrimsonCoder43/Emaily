const SurveyField = ({ input, label, meta: { error, touched } }) => {
  const isTextarea = input.name === 'body' || input.name === 'recipients';
  const InputComponent = isTextarea ? 'textarea' : 'input';

  return (
    <div className='form-control w-full mb-6'>
      <label className='label py-2'>
        <span className='label-text font-semibold text-base-content'>
          {label}
        </span>
      </label>
      <InputComponent
        {...input}
        className={`${
          touched && error
            ? 'input input-bordered input-error'
            : 'input input-bordered'
        } w-full ${
          isTextarea ? 'textarea textarea-bordered min-h-24' : ''
        } focus:input-primary`}
        placeholder={`Enter ${label.toLowerCase()}`}
        rows={isTextarea && input.name === 'body' ? 6 : 3}
      />
      {touched && error && (
        <label className='label py-1'>
          <span className='label-text-alt text-error flex items-center gap-1'>
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
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            {error}
          </span>
        </label>
      )}
    </div>
  );
};

export default SurveyField;
