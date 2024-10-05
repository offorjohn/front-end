/* eslint-disable import/no-unresolved */
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { account } from 'src/_mock/account';

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

  const renderAccount = (
    <Box
      sx={{
        my: 2,
        mx: 2,
        py: 2,
        px: 2,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[900], 0.12),
      }}
    >
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{account.displayName}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {account.role}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );
  const renderUpgrade = (
    <Box sx={{ px: 1, pb: 1, mt: 2 }}>
      <Stack alignItems="center" spacing={1} sx={{ pt: 1, borderRadius: 2, position: 'relative' }}>
        <Button
          href="https://www.linkedin.com/in/your-profile" // Replace with your LinkedIn profile URL
          target="_blank"
          variant="contained"
          color="primary" // Use primary color for standout action
          sx={{ width: '100%' }} // Optional: make buttons full width
        >
          Connect on LinkedIn
        </Button>
  
        <Button
          href="https://t.me/your-profile" // Replace with your Telegram URL
          target="_blank"
          variant="contained"color="info"

          sx={{ width: '100%' }} // Optional: make buttons full width
        >
          Connect on Telegram
        </Button>
  
        <Button
          href="https://twitter.com/your-profile" // Replace with your Twitter URL
          target="_blank"
          variant="contained"color="inherit"

          sx={{ width: '100%' }} // Optional: make buttons full width
        >
          Connect on Twitter
        </Button>
  
        <Button
          href="https://www.instagram.com/your-profile" // Replace with your Instagram URL
          target="_blank"
          variant="contained"color="error"

          sx={{ width: '100%' }} // Optional: make buttons full width
        >
          Connect on Instagram
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
      <Logo sx={{ mt: 3, ml: 4 }} />
      {renderAccount}
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
