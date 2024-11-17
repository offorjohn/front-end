/* eslint-disable import/no-unresolved */
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_cart'),
  },
  

  {
    title: 'fund Wallet',
    path: '/blog',
    icon: icon('ic_wallet'),
  },
  { 
    title:  'order history',
    path: '/order',
    icon: icon('ic_analytics'),
  
  },
  {

    title: 'verifications',
    path: '/user',
    icon: icon('ic_flag'),

  },



  {
    title: 'rentals',
    path: '/products',
    icon: icon('ic_globe'),

  }, 
  
  
  {
    title: 'logout',
    path: '/home',
    icon: icon('ic_lock'),
  },


];

export default navConfig;
