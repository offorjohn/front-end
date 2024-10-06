/* eslint-disable import/no-unresolved */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';

import Box from '@mui/material/Box';
// Import the Grid component

import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';

import { NAV } from './config-layout';
import navConfig from './config-navigation';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();
  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);




  const renderMenu = (
    <Stack component="nav"  spacing={1.4} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );
  const renderUpgrade = (
    <Box sx={{ px: 2, pb: 3, mt: 10, display: 'flex', justifyContent: 'center' }}>
      <Stack direction="row" spacing={1} >
        {/* Twitter Button */}
        <Button
          href="https://www.twitter.com/in/your-profile"
          target="_blank"
          variant="contained"
          sx={{
            width: 'auto',
            height: 50,
            bgcolor: '#1DA1F2', // Twitter blue
            '&:hover': { bgcolor: '#0d8bde' }, // Darker blue on hover
            borderRadius: 2,
            fontSize: '0.875rem',
            minWidth: '40px',
          }}
          startIcon={<Icon icon="mdi:twitter" width={20} />}
        />
  
        {/* Telegram Button */}
        <Button
          href="https://t.me/your-profile"
          target="_blank"
          variant="contained"
          sx={{
            width: 'auto',
            height: 50,
            bgcolor: '#0088CC', // Telegram blue
            '&:hover': { bgcolor: '#0079B3' }, // Darker blue on hover
            borderRadius: 2,
            fontSize: '0.875rem',
            minWidth: '40px',
          }}
          startIcon={<Icon icon="mdi:telegram" width={20} />}
        />
  
        {/* Facebook Button */}
        <Button
          href="https://facebook.com/your-profile"
          target="_blank"
          variant="contained"
          sx={{
            width: 'auto',
            height: 50,
            bgcolor: '#1877F2', // Facebook blue
            '&:hover': { bgcolor: '#145DBF' }, // Darker blue on hover
            borderRadius: 2,
            fontSize: '0.875rem',
            minWidth: '40px',
          }}
          startIcon={<Icon icon="mdi:facebook" width={20} />}
        />
  
        {/* Instagram Button */}
        <Button
          href="https://www.instagram.com/your-profile"
          target="_blank"
          variant="contained"
          sx={{
            width: 'auto',
            height: 50,
            bgcolor: '#E1306C', // Instagram pink
            '&:hover': { bgcolor: '#C13584' }, // Darker pink on hover
            borderRadius: 2,
            fontSize: '0.875rem',
            minWidth: '40px',
          }}
          startIcon={<Icon icon="mdi:instagram" width={20} />}
        />
      </Stack>
    </Box>
  );
  

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
        {/* Make "rr" a clickable icon */}
        <ListItemButton
        onClick={onCloseNav} // Close the nav when clicked
        sx={{
          justifyContent: 'right',
          padding: 3,
          marginTop: -2,
          color: 'text.secondary',
        }}

      >


    {/* Use Iconify to render the icon */}
<Icon
  icon="mdi:close" // Close icon
  width={32} // Adjust width for larger size
  sx={{
    display: 'inline-block',
    verticalAlign: 'middle',
    fontWeight: 'bold', // Add bold font weight
    color: 'text.primary', // Set color to primary text color
    '@media (min-width: 960px)': { // Hide on medium screens and up
      display: 'none',
    },
  }}
/>


      </ListItemButton>

      <Logo sx={{ mt: -17, ml: 4 }} />

    

      {renderMenu}
      <Box sx={{ flexGrow: 1 }} />
      {renderUpgrade}
    </Scrollbar>
  );

  return (

    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}

    >


      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}

        >

          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}

        >

          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const pathname = usePathname();
  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 50,
        borderRadius: 10,
        padding: 2.1,
        typography: 'body2',
        fontWeight: 'bold', // Make all items bold

        color: 'text.secondary',
        textTransform: 'capitalize',
        ...(active && {
          color: 'primary.main',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>
      <Box component="span">{item.title}</Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
