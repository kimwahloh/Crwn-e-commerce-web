import { Outlet } from 'react-router-dom';

import Directory from '../../components/directory/directory.components';

const Home = () => {
  return (
    <div>
        <Outlet />
        <Directory />;
    </div>

    );
};

export default Home;