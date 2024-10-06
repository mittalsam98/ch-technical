import { AlignJustify } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';

export default function Navbar() {
  return (
    <nav className='bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <a href='https://classhero.com/' className='flex items-center space-x-3'>
          <img
            src='https://classhero.com/hs-fs/hubfs/ClassHero%20logo%20Feb%202021-2.jpg?width=300&height=75&name=ClassHero%20logo%20Feb%202021-2.jpg'
            className='h-8'
            alt='Flow Logo'
          />
        </a>
        <div className='flex md:order-2 space-x-3 md:space-x-0'>
          <Button>Login</Button>
          <button
            data-collapse-toggle='navbar-sticky'
            type='button'
            className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 '
            aria-controls='navbar-sticky'
            aria-expanded='false'
          >
            <Popover>
              <PopoverTrigger>
                <AlignJustify />
              </PopoverTrigger>{' '}
              <PopoverContent>
                <MenuItem />
              </PopoverContent>
            </Popover>
          </button>
        </div>
        <div className='items-center justify-between hidden w-full md:flex md:w-auto'>
          <MenuItem />
        </div>
      </div>
    </nav>
  );
}

const MenuItem = () => {
  return (
    <ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white'>
      <li>
        <a
          href='#'
          className='block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 '
          aria-current='page'
        >
          Home
        </a>
      </li>
      <li>
        <a
          href='#'
          className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0'
        >
          About
        </a>
      </li>
    </ul>
  );
};
