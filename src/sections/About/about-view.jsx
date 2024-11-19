/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react';

import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, Typography } from '@mui/material'; // Import MenuIcon
import { Link } from 'react-router-dom'; // If you want to use Links for navigation

// eslint-disable-next-line import/no-unresolved
import { bgGradient } from 'src/theme/css';

// eslint-disable-next-line import/no-unresolved
import Logo from 'src/components/logo';

import TelegramIcon from '../../layouts/dashboard/common/telegram';  // Adjust path if needed



// LeftSidebar component for handling the mobile menu toggle
const LeftSidebar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const theme = useTheme();


    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };


    return (


        <Box
            sx={{
                height: '7.6vh',
                marginTop: '-6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: 3,
            }}
        >
            {/* Header Section */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: -28,
                width: '100%',
                padding: { xs: 2, md: 4 }, // Padding for header
                display: 'flex',
                justifyContent: 'flex-start', // Align the logo to the left
                alignItems: 'center', // Vertically center logo
                zIndex: 10, // Ensure it stays on top
            }}>
                <Logo
                    sx={{
                        position: 'relative',
                        top: { xs: 70, md: 30 }, // Adjust top spacing for different screens
                        left: { xs: 16, md: 24 }, // Align logo to left with some spacing from edge
                    }}
                />
            </Box>
            {/* IconButton for Menu Toggle */}
            <IconButton
                color="inherit"
                sx={{
                    fontSize: 40,
                    fontWeight: 'bold',
                    position: 'relative',
                    top: 32,
                    display: { xs: 'block', md: 'none' }, // Show on mobile only
                }}
                onClick={toggleMenu}
            >
                <MenuIcon sx={{ fontSize: 'inherit' }} />
            </IconButton>

            {/* Conditional Rendering of the Menu */}
            {isMenuOpen && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '60px',
                        right: 0,
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: 3,
                        borderRadius: 2,
                        padding: 2,
                        width: 200,
                        zIndex: 999,
                    }}
                >
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
                            // eslint-disable-next-line no-return-assign
                            onClick={() => window.location.href = 'login'}
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
                            onClick={() => window.location.href = 'https://otpninja.com/register'}
                        >
                            Register
                        </Typography>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

// Main HomeView component
export default function HomeView() {
    const theme = useTheme(); // Get theme for styling

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
            {/* Left Sidebar (mobile menu) */}
            <LeftSidebar />

            <Box
                sx={{
                    border: '2px solid white',  // White border
                    borderRadius: 2,
                    padding: 7,
                    position: 'absolute',
                    top: '15%',  // Adjust the position as needed
                    left: '50%',
                    transform: 'translateX(-50%)', // Center the About Box
                    maxWidth: '900px',  // Limit the width
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Optional: Dark background with transparency
                    zIndex: 10,
                    width: '90%',  // Take up 90% of the container width
                    '@media (max-width: 600px)': {
                        top: '19%',  // Adjust the top positioning for smaller screens
                        padding: 4,  // Adjust padding for smaller screens
                    },
                    '@media (max-width: 400px)': {
                        top: '20%',  // Move the Box further down for very small screens
                        padding: 2,  // Further reduce padding

                    }
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        color: 'white',

                        textAlign: 'left',  // Aligns the text to the left

                        marginBottom: 3,
                        fontWeight: 'bold',

                    }}
                >
                    About Us
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: 'white',
                        lineHeight: 1.8,
                        whiteSpace: 'pre-line',  // Ensures line breaks are respected
                    }}
                >
                    Welcome to OTP Ninja, your one-stop solution for secure and efficient one-time passcodes.
                    We provide top-notch services for authentication and security, ensuring that your online
                    experience is as safe and smooth as possible.

                    {'\n'} {/* Adds a line break between paragraphs */}

                    Join us today and experience the future of authentication with OTP Ninja!

                    {'\n\n'} {/* Adds a line break between paragraphs */}


                    © 2024 OTP ENTERPRISES, All Rights Reserved
                </Typography>

            </Box>





            {/* Footer Section */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' }, // Stack items in a column on xs, row on md and up
                    justifyContent: { xs: 'center', md: 'space-between' }, // Center on xs, space-between on md
                    alignItems: 'center', // Vertically center items on xs, align items left/right on larger screens
                    fontWeight: 'bold',
                    width: '100%',
                    padding: { xs: '-2%', md: '1%' },
                    borderTop: '1px solid #ccc',
                    backgroundColor: '#f9f9f9',
                    gap: { xs: -5, md: 5 }, // Spacing between items
                    position: 'absolute',
                    bottom: 0, // Stick to the bottom of the viewport
                }}
            >
                {/* Logo in Footer */}
                <Logo
                    sx={{
                        order: { xs: 0, md: 0 }, // Ensure logo comes first on mobile (xs), later on larger screens
                        mb: { xs: 2, md: -10 }, // Adjust margin bottom on mobile to create spacing between logo and text
                        marginLeft: { xs: 0, md: 2 }, // Align logo to left with some margin
                    }} />

                {/* Text Items in a Row on Medium Screens and Larger */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 5, alignItems: 'center' }}>
                    <Link to="/about" style={{ textDecoration: 'none' }}>

                        <Box sx={{ textDecoration: 'none' }}>About</Box>

                    </Link>

                    <Link to="/private" style={{ textDecoration: 'none' }}>
                        <Box style={{ textDecoration: 'none' }}>Privacy Policy </Box>
                    </Link>
                    <Box>Terms of Service</Box>
                </Box>

                {/* Text Items in Column on Small Screens */}
                <Box
                    sx={{
                        display: { xs: 'flex', md: 'none' },
                        gap: 2,
                        flexDirection: 'row',
                        textAlign: 'center',
                        mt: 3, // Adjust this value to move the Box up
                    }}
                >
                    <Link to="/about" style={{ textDecoration: 'none' }}>

                        <Box sx={{ textDecoration: 'none', mt: -5 }}>About</Box>

                    </Link>
                    <Link to="/private" style={{ textDecoration: 'none' }}>

                        <Box sx={{ textDecoration: 'none', mt: -5 }}>Privacy Policy</Box>

                    </Link>
                    <Link to="/about" style={{ textDecoration: 'none' }}>

                        <Box sx={{ textDecoration: 'none', mt: -5 }}>Terms of Service</Box>

                    </Link>
                </Box>


                <Box sx={{
                    display: { xs: 'flex', md: 'block' }, // Flex on smaller screens, block on larger screens
                    flexDirection: { xs: 'row', md: 'initial' }, // Row on small screens, default block behavior on larger
                    width: { xs: 'auto', md: '13%' }, // Auto width on small screens, 13% on larger
                    justifyContent: { xs: 'center', md: 'initial' }, // Center on small screens, default justify on larger
                    alignItems: { xs: 'center', md: 'initial' }, // Center text on small screens, default align on larger
                }}>
                    © 2024 Otp Ninja
                </Box>
            </Box>

            {/* Telegram Icon */}
            <Box sx={{ position: 'absolute', bottom: 16, right: 16, zIndex: 5 }}>
                <TelegramIcon />
            </Box>
        </Box>
    );
}
