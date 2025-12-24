import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import SurveyField from './SurveyField';
import formFields from './formFields';
import validateEmails, { emailRegex } from '../../utils/validateEmails';

const SurveyForm = ({ onSubmit, initialValues }) => {
  const validate = (values) => {
    const errors = {};

    formFields.forEach(({ name }) => {
      if (!values[name]) {
        errors[name] = 'You must provide a value';
      }
    });

    if (
      values.from &&
      typeof values.from === 'string' &&
      values.from.trim() !== '' &&
      !errors.from
    ) {
      if (!emailRegex.test(values.from.trim())) {
        errors.from = 'Please enter a valid email address';
      }
    }

    if (values.recipients && !errors.recipients) {
      const emailError = validateEmails(values.recipients);

      if (emailError) {
        errors.recipients = emailError;
      }
    }

    return errors;
  };

  return (
    <div className='max-w-2xl mx-auto'>
      <div className='card bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title text-2xl mb-2'>Create New Survey</h2>
          <p className='text-base-content/70 mb-6'>
            Fill out the form below to create and send your survey
          </p>
          <Form
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit} className='space-y-4'>
                {formFields.map(({ label, name }) => (
                  <Field
                    key={name}
                    component={SurveyField}
                    type='text'
                    label={label}
                    name={name}
                  />
                ))}
                <div className='divider my-8'></div>
                <div className='flex flex-col sm:flex-row gap-3 justify-end mt-8'>
                  <Link
                    to='/surveys'
                    className='btn btn-outline btn-sm sm:btn-md order-2 sm:order-1'
                  >
                    Cancel
                  </Link>
                  <button
                    type='submit'
                    disabled={submitting}
                    className='btn btn-primary btn-sm sm:btn-md order-1 sm:order-2'
                  >
                    {submitting ? (
                      <>
                        <span className='loading loading-spinner loading-sm'></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        Review Survey
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
                            d='M9 5l7 7-7 7'
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;
