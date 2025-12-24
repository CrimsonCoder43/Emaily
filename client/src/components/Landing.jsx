import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Landing = () => {
  const auth = useSelector((state) => state.auth);

  if (auth) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center'>
        <div className='text-center space-y-6 max-w-2xl mx-auto'>
          <div className='flex justify-center mb-4'>
            <div className='flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-primary to-secondary text-white font-bold text-4xl shadow-lg'>
              E
            </div>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold text-base-content'>
            Welcome back!
          </h1>
          <p className='text-lg text-base-content/70'>
            You're already logged in. Ready to create your next survey?
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center pt-4'>
            <Link to='/surveys' className='btn btn-primary btn-lg'>
              Go to Dashboard
            </Link>
            <Link to='/surveys/new' className='btn btn-outline btn-lg'>
              Create New Survey
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-16 py-12'>
      <div className='text-center space-y-6 max-w-4xl mx-auto'>
        <div className='flex justify-center mb-6'>
          <div className='flex items-center justify-center w-24 h-24 rounded-3xl bg-linear-to-br from-primary to-secondary text-white font-bold text-5xl shadow-2xl'>
            E
          </div>
        </div>
        <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold text-base-content leading-tight'>
          Collect feedback from your users
        </h1>
        <p className='text-xl md:text-2xl text-base-content/70 max-w-2xl mx-auto'>
          Send email surveys, track responses, and make data-driven decisions
          with ease.
        </p>
      </div>
      <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
        <div className='card bg-base-100 shadow-xl'>
          <div className='card-body items-center text-center'>
            <div className='rounded-full bg-primary/10 p-4 mb-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8 text-primary'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                />
              </svg>
            </div>
            <h3 className='card-title text-xl mb-2'>Email Surveys</h3>
            <p className='text-base-content/70'>
              Send professional email surveys to your users with just a few
              clicks. Track delivery and responses in real-time.
            </p>
          </div>
        </div>
        <div className='card bg-base-100 shadow-xl'>
          <div className='card-body items-center text-center'>
            <div className='rounded-full bg-success/10 p-4 mb-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8 text-success'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                />
              </svg>
            </div>
            <h3 className='card-title text-xl mb-2'>Track Responses</h3>
            <p className='text-base-content/70'>
              Get instant feedback with YES/NO responses. View detailed
              analytics and response rates for all your surveys.
            </p>
          </div>
        </div>
        <div className='card bg-base-100 shadow-xl'>
          <div className='card-body items-center text-center'>
            <div className='rounded-full bg-secondary/10 p-4 mb-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8 text-secondary'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <h3 className='card-title text-xl mb-2'>Simple Pricing</h3>
            <p className='text-base-content/70'>
              Pay per survey with our credit system. No subscriptions, no hidden
              fees. Buy credits as you need them.
            </p>
          </div>
        </div>
      </div>
      <div className='card bg-linear-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 shadow-xl max-w-3xl mx-auto'>
        <div className='card-body text-center py-12'>
          <h2 className='card-title text-3xl justify-center mb-4'>
            Ready to get started?
          </h2>
          <p className='text-lg text-base-content/70 mb-6'>
            Join thousands of users collecting valuable feedback from their
            audience.
          </p>
          <div className='card-actions justify-center'>
            <a
              href='/auth/google'
              className='btn btn-primary btn-lg text-lg px-8'
            >
              <svg
                aria-label='Google logo'
                width='20'
                height='20'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 512 512'
                className='mr-2'
              >
                <g>
                  <path d='m0 0H512V512H0' fill='#fff'></path>
                  <path
                    fill='#34a853'
                    d='M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341'
                  ></path>
                  <path
                    fill='#4285f4'
                    d='m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57'
                  ></path>
                  <path
                    fill='#fbbc02'
                    d='m90 341a208 200 0 010-171l63 49q-12 37 0 73'
                  ></path>
                  <path
                    fill='#ea4335'
                    d='m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55'
                  ></path>
                </g>
              </svg>
              Login with Google
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
