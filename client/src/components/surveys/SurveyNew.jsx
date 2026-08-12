import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { submitSurvey } from '../../store/slices/surveySlice';
import { fetchUser } from '../../store/slices/authSlice';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

const SurveyNew = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = (values) => {
    setFormValues(values);
    setShowReviewForm(true);
  };

  const handleSurveySubmit = () => {
    dispatch(submitSurvey({ values: formValues, navigate }));
    dispatch(fetchUser());
  };

  const renderContent = () => {
    if (showReviewForm) {
      return (
        <SurveyFormReview
          onCancel={() => setShowReviewForm(false)}
          onSubmit={handleSurveySubmit}
          formValues={formValues}
        />
      );
    }

    return (
      <SurveyForm onSubmit={handleFormSubmit} initialValues={formValues} />
    );
  };

  return <div className='py-6 px-4 sm:px-6 lg:px-8'>{renderContent()}</div>;
};

export default SurveyNew;
