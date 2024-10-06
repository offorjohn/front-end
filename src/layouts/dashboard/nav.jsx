/* eslint-disable import/no-unresolved */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'; // Import the Grid component

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
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );
 const renderUpgrade = (
  <Box sx={{ px: 1, pb: 1, mt: 2 }}>
    <Grid container spacing={2} justifyContent="center"> {/* Create a grid container */}
      
      <Grid item xs={6}> {/* First button in the grid */}
        <Button
          href="https://www.linkedin.com/in/your-profile" // Replace with your LinkedIn profile URL
          target="_blank"
          variant="contained"
          sx={{ 
            width: '50%', 
            height: 60,  // Adjust height for smaller buttons
            bgcolor: '#0077B5', 
            '&:hover': { bgcolor: '#005582' },
            borderRadius: 2,  // Optional: Add border-radius for rounded corners
            fontSize: '0.875rem',  // Adjust font size for smaller text
          }} 
          startIcon={<Icon icon="mdi:linkedin" width={20} />} // Smaller icon size
         />
      </Grid>

      <Grid item xs={6}> {/* Second button in the grid */}
        <Button
          href="https://t.me/your-profile" // Replace with your Telegram URL
          target="_blank"
          variant="contained"
          sx={{ 
            width: '50%', 
            height: 60,  // Adjust height for smaller buttons
            bgcolor: '#0088CC', 
            '&:hover': { bgcolor: '#0079B3' },
            borderRadius: 2,  // Optional: Add border-radius for rounded corners
            fontSize: '0.875rem',  // Adjust font size for smaller text
          }} 
          startIcon={<Icon icon="mdi:telegram" width={20} />} // Smaller icon size
         />
      </Grid>

      <Grid item xs={6}> {/* Third button in the grid */}
        <Button
          href="https://twitter.com/your-profile" // Replace with your Twitter URL
          target="_blank"
          variant="contained"
          sx={{ 
            width: '50%', 
            height: 60,  // Adjust height for smaller buttons
            bgcolor: '#1DA1F2', 
            '&:hover': { bgcolor: '#0d8bde' },
            borderRadius: 2,  // Optional: Add border-radius for rounded corners
            fontSize: '0.875rem',  // Adjust font size for smaller text
          }} 
          startIcon={<Icon icon="mdi:twitter" width={20} />} // Smaller icon size
         />
      </Grid>

      <Grid item xs={6}> {/* Fourth button in the grid */}
        <Button
          href="https://www.instagram.com/your-profile" // Replace with your Instagram URL
          target="_blank"
          variant="contained"
          sx={{ 
            width: '50%', 
            height: 60,  // Adjust height for smaller buttons
            bgcolor: '#C32AA3', 
            '&:hover': { bgcolor: '#9B1F79' },
            borderRadius: 2,  // Optional: Add border-radius for rounded corners
            fontSize: '0.875rem',  // Adjust font size for smaller text
          }} 
          startIcon={<Icon icon="mdi:instagram" width={20} />} // Smaller icon size
         />
      </Grid>
      
    </Grid>
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
       
          }}
        />

      </ListItemButton>

      <Logo sx={{ mt: -11, ml: 4 }} />

    

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
        minHeight: 44,
        borderRadius: 10,
        padding: 2,
        typography: 'body2',
        fontWeight: 'fontWeightBold', // Make all items bold

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
