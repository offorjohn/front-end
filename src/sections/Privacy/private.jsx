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
                        top: { xs: 63, md: 30 }, // Adjust top spacing for different screens
                        left: { xs: 19, md: 24 }, // Align logo to left with some spacing from edge
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
                    top: 34,
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
export default function Private() {
    const theme = useTheme(); // Get theme for styling

    return (
        <Box
            sx={{
                ...bgGradient({
                    color: theme.palette.background.default,
                    imgUrl: '/assets/background/overlay_3.jpg',
                }),
                minHeight: '100vh',  // Ensure the container covers the full viewport height
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',  // Space out the sections from top to bottom
                position: 'relative',

            }}
        >
            {/* Left Sidebar (mobile menu) */}
            <LeftSidebar />

            {/* About Section with White Border */}
            <Box
                sx={{
                    border: '2px solid white',
                    borderRadius: 2,
                    padding: 5,
                    margin: '0 auto',  // Center horizontally
                    maxWidth: '900px',  // Limit the width
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Optional: Dark background with transparency
                    zIndex: 10,
                    width: '90%',  // Take up 90% of the container width
                    marginTop: '10%',  // Adjust for top spacing on smaller screens
                    '@media (max-width: 600px)': {
                        padding: 4,
                        marginTop: '15%',  // Slightly adjust for smaller screens
                    },
                    '@media (max-width: 400px)': {
                        padding: 2,
                        marginTop: '20%',  // Further adjust for very small screens
                    },
                    '@media (min-width: 600px)': {
                        marginTop: '8%',  // Adjust marginTop for larger screens (move up a bit)
                    },
                    '@media (min-width: 1024px)': {
                        marginTop: '-1%',  // Further adjust for larger screens (even more upwards)
                    },
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        color: 'white',
                        textAlign: 'left',  // Align text to the left
                        marginBottom: 3,
                        fontWeight: 'bold',
                    }}
                >
                    Privacy Policy
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: 'white',
                        lineHeight: 1.8,
                        whiteSpace: 'pre-line',  // Ensures line breaks are respected
                    }}
                >
                    OTP Ninja provides secure and reliable OTP (One-Time Password) solutions for businesses looking to enhance their user authentication processes. As part of our commitment to transparency and trust, we want you to understand how your personal data is collected, used, and protected when interacting with our website and services.
                    {'\n\n'}
                  
                    We do not sell, rent, or lease your personal information to third parties. However, we may share your information with trusted third-party service providers who assist us in operating our services, such as:
                    {'\n\n'}
                    Service Providers: Companies that help us manage our infrastructure, send emails, process payments, or provide customer support.
                    {'\n\n'}
                   
                    We take reasonable measures to protect your personal information from unauthorized access, alteration, or destruction. Our security protocols include encryption, firewalls, and regular security audits. However, no method of data transmission over the internet is 100% secure, so we cannot guarantee complete security.
                    {'\n\n'}
                    © 2024 OTP Ninja ENTERPRISES, All Rights Reserved
                </Typography>
            </Box>

            {/* Logo below the About Section (Hidden on Larger Screens) */}
            <Box
                sx={{

                    order: { xs: 0, md: 0 }, // Ensure logo comes first on mobile (xs), later on larger screens
                    display: { xs: 'flex', md: 'none' },  // Display only on small screens
                    justifyContent: 'center',  // Center the logo horizontally
                    marginTop: '30px',  // Space between About section and logo
                    padding: 2,  // Optional padding for spacing around the logo
                }}
            >
                <Logo
                    sx={{
                        width: '150px',  // Adjust the logo size as needed
                    }}
                />
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
                    marginTop: -3.5,
                    position: 'relative',  // Ensure footer sticks to bottom without absolute positioning
                }}
            >
                {/* Logo in Footer */}
                <Logo
                    sx={{
                        order: { xs: 0, md: 0 }, // Ensure logo comes first on mobile (xs), later on larger screens
                        mb: { xs: 2, md: -10 }, // Adjust margin bottom on mobile to create spacing between logo and text
                        marginLeft: { xs: 0, md: 2 }, // Align logo to left with some margin
                        display: { xs: 'none', md: 'flex' },  // Hide logo on small screens, show on medium and larger screens
                    }}
                />


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
                        mt: 8, // Adjust this value to move the Box up
                    }}
                >
                    <Link to="/about" style={{ textDecoration: 'none' }}>

                        <Box sx={{ textDecoration: 'none', mt: -5 }}>About</Box>

                    </Link>
                    <Link to="/private" style={{ textDecoration: 'none' }}>

                        <Box sx={{ textDecoration: 'none', mt: -5 }}>Privacy Policy</Box>

                    </Link>
                    <Link to="/terms" style={{ textDecoration: 'none' }}>

                        <Box sx={{ textDecoration: 'none', mt: -5 }}>Terms of Service</Box>

                    </Link>
                </Box>


                <Box sx={{
                    display: { xs: 'flex', md: 'block' },
                    flexDirection: { xs: 'row', md: 'initial' },
                    width: { xs: 'auto', md: '13%' },
                    justifyContent: { xs: 'center', md: 'initial' },
                    alignItems: { xs: 'center', md: 'initial' },
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
