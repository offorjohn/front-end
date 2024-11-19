/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react';

import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, Typography } from '@mui/material'; // Import MenuIcon
import { Link } from 'react-router-dom'; // If you want to use Links for navigation

import { Icon } from '@iconify/react';

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
                >Terms and Conditions
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: 'white',
                        lineHeight: 1.8,
                        whiteSpace: 'pre-line',  // Ensures line breaks are respected
                    }}
                >
                    Welcome to OTP Ninja! By accessing or using our website and services, you agree to be bound by the following terms and conditions. If you do not agree with any part of these terms, please do not use our services.
                    {'\n\n'}

                    1. Acceptance of Terms
                    By using OTP Ninja’s website and services, you agree to comply with and be bound by these Terms and Conditions. These terms apply to all visitors, users, and others who access or use our services. If you are using our services on behalf of a business, you represent that you have the authority to bind that business to these terms.
                    {'\n\n'}
                    2. Use of Service
                    OTP Ninja provides secure One-Time Password (OTP) solutions for businesses and individuals to enhance online authentication. You agree to use our services in accordance with all applicable laws and regulations. You are prohibited from using our services to engage in any illegal activity or harm the website’s integrity or security.
                    {'\n\n'}

                    3. Privacy and Data Protection
                    Your privacy is important to us. By using OTP Ninja, you agree to the collection, use, and storage of your personal information as outlined in our Privacy Policy. We are committed to protecting your data and complying with applicable data protection laws.
                    {'\n\n'}

                    4. Third-Party Services
                    We may use third-party services to enhance our offerings, such as payment gateways or customer support platforms. These third-party services are governed by their own terms and conditions, and OTP Ninja is not responsible for their actions or policies.
                    {'\n\n'}
                    Contact
                    If you have any general questions or concerns about this Terms or the way in which we handle your Personal Data, kindly contact us via our social media handle below.
                    {'\n\n'}
                    Our support team is available around the clock to address any concerns or queries you may have.

                    Connect with us on Social Media:
                    {'\n\n'}

                  
                    - <a href="https://t.me/otpninjaofficial" target="_blank" style={{ color: '#0088cc' }} rel="noreferrer">
                    <Icon icon="mdi:telegram" width={28} style={{ fontWeight: 'bold' }} /> {/* Adjust icon size if needed */}
                        Telegram
                    </a>


                    {'\n'}
                    - <a href="https://www.instagram.com/otpninja" target="_blank" style={{ color: '#e1306c' }} rel="noreferrer">
                    <Icon icon="mdi:instagram" width={26}  style={{ fontWeight: 'bold' }} /> {/* Adjust icon size if needed */}
                    Instagram</a>
                    {'\n'}
                    - <a href="https://www.facebook.com/otpninja" target="_blank" style={{ color: '#1877f2' }} rel="noreferrer">
                    <Icon icon="mdi:facebook" width={28} style={{ fontWeight: 'bold' }} /> {/* Larger icon */}
                    Facebook</a>
                    {'\n'}
                    - <a href="https://x.com/otpninja" target="_blank" style={{ color: '#1da1f2' }} rel="noreferrer">
                        <Icon
                            icon="mdi:twitter"
                            width={26}
                            style={{ fontWeight: 'bold' }} // Adjust this line
                        />
                        Twitter</a>

                    {'\n'}
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
                    marginTop: '-3.5%',  // Default marginTop for smaller screens

                    // For screens smaller than 600px (mobile)
                    '@media (max-width: 600px)': {
                        marginTop: '-3%',  // Push further up on smaller screens (mobile)
                        padding: 4,
                    },
            
                    // For screens smaller than 400px (very small screens)
                    '@media (max-width: 400px)': {
                        marginTop: '-4%',  // Further push up for very small screens
                        padding: 2,
                    },
            
                    // For medium screens (e.g., tablets)
                    '@media (min-width: 600px)': {
                        marginTop: '4%',  // Adjust marginTop for medium screens (tablets)
                    },
            
                    // For larger screens (e.g., laptops, desktops)
                    '@media (min-width: 1024px)': {
                        marginTop: '3%',  // Adjust further for large screens (desktops)
                    },
            
                    // For very large screens (e.g., ultra-wide monitors)
                    '@media (min-width: 1440px)': {
                        marginTop: '2.5%',  // Push further up for ultra-wide monitors
                    },
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
