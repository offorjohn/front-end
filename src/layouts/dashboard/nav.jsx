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
    <Stack component="nav" spacing={1.4} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );
  const renderUpgrade = (
    <Box sx={{ px: 2, pb: 3, mt: 10, display: 'flex', justifyContent: 'center' }}>
      <Stack direction="row" spacing={1} >
        <Button
          href="https://x.com/otpninja"
          target="_blank"
          variant="contained"
          sx={{
            width: 47,
            height: 40,
            bgcolor: '#000',
            '&:hover': { bgcolor: '#1DA1F2' },
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.375rem',
            minWidth: '2px',
            fontWeight: 'bold',
          }}
        >
          <Icon
            icon="mdi:twitter"
            width={49}
            style={{ fontWeight: 'bold' }} // Adjust this line
          />
        </Button>


        {/* Telegram Button */}
        <Button
          href="https://t.me/otpninjaofficial"
          target="_blank"
          variant="contained"
          sx={{
            width: 47, // Larger size
            height: 40,
            bgcolor: '#000', // Black background
            '&:hover': { bgcolor: '#0079B3' }, // Darker blue on hover
            borderRadius: '50%', // Round button
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.375rem',
            minWidth: '2px',
            fontWeight: 'bold',
          }}
        >
          <Icon icon="mdi:telegram" width={40} style={{ fontWeight: 'bold' }} /> {/* Larger icon */}
        </Button>
        {/* Instagram Button */}
        <Button
          href="https://www.instagram.com/otpninja"
          target="_blank"
          variant="contained"
          sx={{
            width: 31, // Adjust width to make it rectangular
            height: 40, // Keep height as is
            bgcolor: '#fff', // White background
            '&:hover': { bgcolor: '#E1306C' }, // Pink color on hover
            borderRadius: '8px', // Slightly rounded corners for a rectangular shape
            display: 'flex',
            minWidth: 50,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.875rem', // Adjust font size
            fontWeight: 'bold',
          }}
        >
          <Icon icon="mdi:instagram" width={32} color="#000" style={{ fontWeight: 'bold' }} /> {/* Adjust icon size if needed */}
        </Button>


        {/* Facebook Button */}
        <Button
          href="https://www.facebook.com/otpninja"
          target="_blank"
          variant="contained"
          sx={{
            width: 47, // Larger size
            height: 40,
            bgcolor: '#000', // Black background
            '&:hover': { bgcolor: '#145DBF' }, // Darker blue on hover
            borderRadius: '50%', // Round button
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.375rem',
            minWidth: '2px',
            fontWeight: 'bold',
          }}
        >
          <Icon icon="mdi:facebook" width={28} style={{ fontWeight: 'bold' }} /> {/* Larger icon */}
        </Button>




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
