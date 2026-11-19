import './Header.css';
import './Fonts.css';
import { Link } from 'react-router-dom';
import { TfiSearch } from 'react-icons/tfi';
import { SlArrowLeft } from 'react-icons/sl';

interface Props {
  title: string;
}
export default function Header({ title }: Props) {
  return (
    <>
      <div className="header-body">
        <div className="app-bar">
          <span>
            <Link to={'..'}>
              <SlArrowLeft size={24} />
            </Link>
          </span>
          <span className={title ? 'header-title' : 'typo-logo F18px'}>
            {title ? `${title}` : 'OPENCLOSET'}{' '}
          </span>
          <span>
            <Link to={'/Search'}>
              <TfiSearch size={24} />
            </Link>
          </span>
        </div>
        <div className="header-bar"></div>
      </div>
      <div className="header-space"></div>
    </>
  );
}
