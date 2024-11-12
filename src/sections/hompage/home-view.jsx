import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook from React Router

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// eslint-disable-next-line import/no-unresolved
import { bgGradient } from 'src/theme/css';

// Assuming you have a Logo component imported correctly
// eslint-disable-next-line import/no-unresolved
import Logo from 'src/components/logo';

import TelegramIcon from '../../layouts/dashboard/common/telegram';  // Adjust path accordingly

// ----------------------------------------------------------------------

export default function HomeView() {
    const theme = useTheme();
    const navigate = useNavigate();  // Initialize the useNavigate hook

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Toggle the menu visibility
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Function to navigate to the Register or Login page
    const handleMenuClick = (page) => {
        if (page === 'login') {
            navigate('/login');  // Navigate to the Login page
        } else if (page === 'register') {
            navigate('/register');  // Navigate to the Register page
        }
    };

    // eslint-disable-next-line react/no-unstable-nested-components
    const LeftSidebar = () => (
        <Box
            sx={{
                height: '10vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: 2,
            }}
        >
            <IconButton
                color="inherit"
                sx={{
                    fontSize: 40,
                    fontWeight: 'bold',
                    position: 'relative',
                    top: -5,
                    // Hide hamburger menu on larger screens (md and above)
                    display: { xs: 'block', md: 'none' }, // Show only on xs (mobile) screens
                }}
                onClick={toggleMenu}  // Toggle the menu on click
            >
                <MenuIcon sx={{ fontSize: 'inherit' }} />
            </IconButton>

            {/* Conditional rendering of the menu */}
            {isMenuOpen && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '60px', // Adjust the top position for better alignment
                        right: 0,
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: 3,
                        borderRadius: 2,
                        padding: 2,
                        width: 200, // Fixed width for consistency
                        zIndex: 999, // Ensure the menu appears on top of other elements
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'text.primary',
                            fontWeight: 600,
                            marginBottom: 1,
                            textAlign: 'center',
                            fontSize: '1.1rem',
                        }}
                    >
                        Menu
                    </Typography>

                    {/* Menu Items */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.primary',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: 500,
                                padding: '8px 12px',
                                borderRadius: 1,
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                    color: theme.palette.primary.main,
                                },
                            }}
                            onClick={() => handleMenuClick('login')}
                        >
                            Login
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.primary',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: 500,
                                padding: '8px 12px',
                                borderRadius: 1,
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                    color: theme.palette.primary.main,
                                },
                            }}
                            // eslint-disable-next-line no-return-assign
                            onClick={() => window.location.href = 'https://otpninja.com/register'} // Redirect to external URL
                        >
                            Register
                        </Typography>
                    </Box>
                </Box>
            )}
        </Box>
    );

    return (
        <Box
            sx={{
                ...bgGradient({
                    color: theme.palette.background.default,
                    imgUrl: '/assets/background/overlay_3.jpg',
                }),
                height: 1,
                position: 'relative',
            }}
        >
            {/* Left Sidebar */}
            <LeftSidebar />

            {/* Logo */}
            <Logo
                sx={{
                    position: 'fixed',
                    top: { xs: 55, md: 64 },
                    left: { xs: 16, md: 24 },
                }}
            />

            {/* Main content */}
            <Stack alignItems="center" justifyContent="center" sx={{ height: 'auto', px: 3, pt: 17 }}>
                <Typography variant="h2" sx={{ color: 'text.primary', mb: 3, fontWeight: 'bold' }}>
                    Welcome to OTP NINJA
                </Typography>

                {/* Image Logo Below the Text */}
                <img
                    src="/assets/background/Vector.png"
                    alt="OTP NINJA Logo"
                    style={{
                        maxWidth: '200px',
                        width: '100%',
                        marginBottom: '20px',
                    }}
                />

                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Your one-stop solution for OTP generation and management.
                </Typography>
                {/* Call to Action Buttons for Login and Register */}
                <Stack direction="row" spacing={2} sx={{ mt: 4, display: { xs: 'none', md: 'flex' } }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => handleMenuClick('login')}
                        sx={{
                            padding: '10px 20px',
                            fontWeight: 600,
                            transition: 'background-color 0.3s, transform 0.3s', // Adding transition for smooth effect
                            '&:hover': {
                                backgroundColor: theme.palette.primary.light, // Darker background on hover
                                transform: 'scale(1.05)', // Slight scale effect on hover
                            },
                        }}
                    >
                        Log In
                    </Button>

                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                            // eslint-disable-next-line no-return-assign
                            onClick={() => window.location.href = 'https://otpninja.com/register'} // Redirect to external URL
                        sx={{
                            padding: '10px 20px',
                            fontWeight: 600,
                            transition: 'border-color 0.3s, color 0.3s, transform 0.3s', // Smooth transition on hover
                            '&:hover': {
                                borderColor: theme.palette.primary.dark, // Darker border on hover
                                color: theme.palette.primary.dark, // Change text color to match the border
                                transform: 'scale(1.05)', // Slight scale effect on hover
                            },
                        }}
                    >
                        Create Account
                    </Button>
                </Stack>


                <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Explore our features:
                    </Typography>
                </Stack>
            </Stack>

            {/* Include the Telegram Icon at the bottom */}
            <TelegramIcon />
        </Box>
    );
}
