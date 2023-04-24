import { Outlet } from 'react-router-dom';
import Header from '../partials/header';
import { Footer } from '../partials/footer';
import Sidebar from '../partials/sidebar';
import { useSelector, shallowEqual } from 'react-redux';

export default function Root() {
  const Data = useSelector(({ musicList }) => musicList, shallowEqual);
  return (
    <>
      <Sidebar />
      <div id="main">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
