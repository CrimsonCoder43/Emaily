import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Payments from './Payments';

const Header = () => {
  const auth = useSelector((state) => state.auth);

  const renderContent = () => {
    switch (auth) {
      case null:
        return null;
      case false:
        return (
          <li>
            <a
              href='/auth/google'
              className='btn bg-white text-black border-[#e5e5e5]'
            >
              <svg
                aria-label='Google logo'
                width='16'
                height='16'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 512 512'
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
          </li>
        );
      default:
        return (
          <>
            <li>
              <Payments />
            </li>
            <li>
              <div className='flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 cursor-default'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 text-primary'
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
                <span className='font-semibold text-primary'>
                  {auth.credits} {auth.credits === 1 ? 'Credit' : 'Credits'}
                </span>
              </div>
            </li>
            <li>
              <a href='/api/logout' className='btn btn-ghost btn-sm md:btn-md'>
                Logout
              </a>
            </li>
          </>
        );
    }
  };

  return (
    <header className='sticky top-0 z-40 w-full border-b border-base-300 bg-base-100/95 backdrop-blur supports-backdrop-filter:bg-base-100/60'>
      <div className='navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='navbar-start w-full justify-between sm:justify-start'>
          <div className='dropdown lg:hidden'>
            <div tabIndex={0} role='button' className='btn btn-ghost'>
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
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-lg border border-base-300 gap-3'
            >
              {renderContent()}
            </ul>
          </div>
          <Link
            to={auth ? '/surveys' : '/'}
            className='flex items-center gap-2 text-xl font-bold hover:opacity-80 transition-opacity'
          >
            <div className='flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-primary to-secondary text-white font-bold text-lg shadow-md'>
              E
            </div>
            <span className='hidden sm:inline-block bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent'>
              EMAILY
            </span>
          </Link>
        </div>
        <div className='navbar-end hidden sm:flex'>
          <ul className='menu menu-horizontal px-1 items-center gap-2'>
            {renderContent()}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
