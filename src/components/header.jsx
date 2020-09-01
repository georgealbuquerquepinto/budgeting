import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { ROOT_PATH } from '../_utils/constats';

// import Logo from '../_assets/img/logo.png';
// import { logout } from '../_service/authService';

const Header = () => (
  <Layout.Header style={{ backgroundColor: '#FFF' }}>
    <div className='logo' style={{ display: 'inline-block' }}>
      <Link to={ROOT_PATH}>
        <p>Logo</p>
      </Link>
    </div>
  </Layout.Header>
);

export default Header;
