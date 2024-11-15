/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import the useNavigate hook from React Router

import { keyframes } from '@emotion/react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Grid, Avatar, } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ButtonGroup from '@mui/material/ButtonGroup'; // Import keyframes for custom animations


// Assuming you have a Logo component imported c

// eslint-disable-next-line import/no-unresolved
import { bgGradient } from 'src/theme/css';

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


    const card = (
        <>

            <CardContent>
                <Typography gutterBottom sx={{ color: 'rgb(245 158 11 / var(--tw-text-opacity, 1))', fontSize: 18 }}>
                    ★★★★★
                </Typography>

                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>OTPNINJA made verifying my accounts
                    a breeze! Their quality numbers
                    worked like a charm, and I felt much
                    more secure online. Highly
                    recommended!.</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Avatar Image */}
                    <Avatar
                        alt="Profile Image"
                        src="/assets/background/wwe.jpg" // Replace with the actual path to your image
                        sx={{ width: 40, height: 40, marginRight: 2 }} // Adjust the size of the avatar
                    />

                    {/* Typography Text */}
                    <Typography variant="body2" fontWeight='bold'>
                        Offor Daniella.
                        <br />
                    </Typography>
                </Box>
            </CardContent>


            <CardActions>



                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    sx={{
                        textTransform: 'none',
                        padding: '6px 12px',
                        marginLeft: '16px' // Adjust the margin to move the button to the right
                    }}
                >
                    Ambassador
                </Button>
            </CardActions>
        </>
    );

    const cards = (
        <>

            <CardContent>
                <Typography gutterBottom sx={{ color: 'rgb(245 158 11 / var(--tw-text-opacity, 1))', fontSize: 18 }}>
                    ★★★★★
                </Typography>

                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>OTPNINJA saved me so much time and
                    headache. No more
                    dealing with sketchy verification
                    methods. Their service is quick,
                    efficient, and trustworthy.!</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Avatar Image */}
                    <Avatar
                        alt="Profile Image"
                        src="/assets/background/wwt.jpg" // Replace with the actual path to your image
                        sx={{ width: 40, height: 40, marginRight: 2 }} // Adjust the size of the avatar
                    />

                    {/* Typography Text */}
                    <Typography variant="body2" fontWeight='bold'>
                        Mercedes.
                        <br />
                    </Typography>
                </Box>
            </CardContent>




            <CardActions>



                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    sx={{
                        textTransform: 'none',
                        padding: '6px 12px',
                        marginLeft: '16px' // Adjust the margin to move the button to the right
                    }}
                >
                    User
                </Button>
            </CardActions>
        </>
    );

    const cars = (
        <>

            <CardContent>
                <Typography gutterBottom sx={{ color: 'rgb(245 158 11 / var(--tw-text-opacity, 1))', fontSize: 18 }}>
                    ★★★★★
                </Typography>

                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>OTPNINJA saved me so much time and
                    headache. No more waiting for codes
                    
                    methods. Their service is quick,
                    efficient, and trustworthy.</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Avatar Image */}
                    <Avatar
                        alt="Profile Image"
                        src="/assets/background/www.jpg" // Replace with the actual path to your image
                        sx={{ width: 40, height: 40, marginRight: 2 }} // Adjust the size of the avatar
                    />

                    {/* Typography Text */}
                    <Typography variant="body2" fontWeight='bold'>
                        John.
                        <br />
                    </Typography>
                </Box>
            </CardContent>




            <CardActions>



                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    sx={{
                        textTransform: 'none',
                        padding: '6px 12px',
                        marginLeft: '16px' // Adjust the margin to move the button to the right
                    }}
                >
                    User
                </Button>
            </CardActions>
        </>
    );


    // Define the animation for the button group
    const moveLeftToRight = keyframes`
0% { transform: translateX(-100%); }
100% { transform: translateX(0); }
`;

    const beat = keyframes`
  0% { transform: scale(1); }
  25% { transform: scale(1.1); }
  50% { transform: scale(1); }
  75% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;



    // eslint-disable-next-line no-shadow
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
            <Stack alignItems="center" justifyContent="center" sx={{ height: 'auto', px: 5, pt: 8 }}>
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

                <Typography variant="body1" sx={{ px: 2, color: 'text.secondary' }}>
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

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        mt: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        px: 3,
                        height: 'auto', // Ensure the Stack takes the full height of the content
                    }}
                >
                    {/* Text Content with Background Color */}
                    <Typography
                        variant="body1"
                        sx={{
                            px: 2, // Padding for text inside the box
                            py: 1, // Vertical padding for the background box
                            backgroundColor: 'primary.main', // Background color like the button's primary color
                            color: 'white', // Text color to contrast the background
                            fontWeight: 'bold',
                            borderRadius: 2, // Rounded corners for the background
                            zIndex: 1, // Text should stay on top of the background
                        }}
                    >
                        Explore our features
                    </Typography>
                </Stack>



                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        mt: 9,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        px: 5,
                        width: {
                            xs: '127%', // 134% width on small screens (xs)
                            md: '100%', // 100% width on medium screens and larger
                            lg: '100%', // 100% width on large screens
                        },
                        backgroundColor: 'transparent',  // Transparent background
                        backdropFilter: 'none', // Ensure no blur effect or glass effect
                        boxShadow: 'none', // Remove any shadows or unwanted visual effects
                    }}
                >
                    <ButtonGroup
                        variant="contained"
                        aria-label="Basic button group"
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 4,
                            justifyContent: 'space-evenly',
                            maxWidth: '800px',
                            width: '100%',
                            animation: `${moveLeftToRight} 2s ease-out`,
                            backgroundColor: 'transparent',  // Ensure no background color
                            backdropFilter: 'none', // Remove any potential backdrop filters
                            boxShadow: 'none', // Remove any shadows
                        }}
                    >
                        <Grid
                            container
                            spacing={4}
                            sx={{
                                width: '120%',
                                justifyContent: 'center',
                                flexDirection: {
                                    xs: 'row',  // Side by side on mobile
                                    sm: 'row',  // Side by side on small screens
                                    md: 'row',  // Ensure row on medium screens and larger
                                },
                                backgroundColor: 'transparent',  // No background color
                                backdropFilter: 'none',  // Remove blur effects
                                boxShadow: 'none', // Ensure no shadows are applied
                            }}
                        >
                            {/* Image 1 */}
                            <Grid item xs={4} sm={6} md={4}>
                                <Box
                                    sx={{
                                        maxWidth: 200,
                                        width: '130%',
                                        height: 'auto',
                                        transition: 'transform 0.3s, opacity 0.3s',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            opacity: 0.9,
                                        },
                                        '@media (max-width: 600px)': {
                                            maxWidth: '500px',  // Larger image on mobile
                                        },
                                        backgroundColor: 'transparent',  // Ensure no background color here
                                        backdropFilter: 'none',  // Remove glass effect or blur
                                    }}
                                >
                                    <img
                                        src="/assets/background/tele.jpg"
                                        alt="Custom Logo"
                                        style={{
                                            width: '130%',
                                            borderRadius: '8px',
                                        }}
                                    />
                                    {/* Text container */}
                                    <Box
                                        sx={{
                                            display: {
                                                xs: 'none',
                                                sm: 'block',
                                            },
                                            color: 'grey',
                                            mt: 2,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Your one-time verification code is <span style={{ color: 'black' }}>456-123</span>
                                    </Box>
                                </Box>
                            </Grid>

                            {/* Image 2 */}
                            <Grid item xs={4} sm={6} md={4}>
                                <Box
                                    sx={{
                                        maxWidth: 200,
                                        width: '130%',
                                        height: 'auto',
                                        transition: 'transform 0.3s, opacity 0.3s',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            opacity: 0.9,
                                        },
                                        '@media (max-width: 600px)': {
                                            maxWidth: '300px',  // Larger image on mobile
                                        },
                                        backgroundColor: 'transparent',  // No background color
                                        backdropFilter: 'none',  // Remove blur effect
                                    }}
                                >
                                    <img
                                        src="/assets/background/cc.jpg"
                                        alt="Custom Logo"
                                        style={{
                                            width: '100%',
                                            borderRadius: '8px',
                                        }}
                                    />
                                </Box>
                            </Grid>

                            {/* Image 3 */}
                            <Grid item xs={4} sm={6} md={4}>
                                <Box
                                    sx={{
                                        maxWidth: 200,
                                        width: '130%',
                                        height: 'auto',
                                        transition: 'transform 0.3s, opacity 0.3s',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            opacity: 0.9,
                                        },
                                        '@media (max-width: 600px)': {
                                            maxWidth: '300px',  // Larger image on mobile
                                        },
                                        backgroundColor: 'transparent',  // No background color
                                        backdropFilter: 'none',  // Remove blur effect
                                    }}
                                >
                                    <img
                                        src="/assets/background/pree.jpg"
                                        alt="Custom Logo"
                                        style={{
                                            width: '100%',
                                            borderRadius: '8px',
                                        }}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </ButtonGroup>
                </Stack>


                <Typography variant="body1" sx={{ px: 5, pt: 8, color: 'text.secondary' }}>
                    <span style={{ color: 'rgba(3, 105, 161)', fontWeight: 'bold' }}>
                        Why OTP Ninja
                    </span>
                </Typography>




                {/* Image Logo Below the Text */}
                <img
                    src="/assets/background/your-icon.svg"
                    alt="OTP NINJA Logo"
                    style={{
                        maxWidth: '200px',
                        width: '100%',
                        marginBottom: '20px',
                    }}
                />

                <Grid container spacing={2} sx={{ mt: 3, pl: { xs: 0, sm: 0, md: 20 } }}>



                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                // Move the component up only on mobile screens (max-width: 600px)
                                '@media (max-width: 600px)': {
                                    marginTop: '-50px', // Adjust this value as needed for mobile
                                }
                            }}
                        >
                            {/* Image Logo */}
                            <img
                                src="/assets/background/Icon.png"
                                alt="OTP NINJA Logo"
                                style={{
                                    maxWidth: '75px',
                                    width: '30%',
                                    marginBottom: '5px',
                                    marginTop: '-60px',  // You can also tweak this if needed on mobile
                                }}
                            />

                            <Grid container direction="column" spacing={2}>
                                {/* Main content goes here */}
                                <Grid item>
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            pl: { xs: 1, sm: 3, md: 3 },
                                            '@media (max-width: 600px)': {  // Targeting mobile
                                                marginTop: '37px',  // Move the text down a little on mobile if needed
                                            }
                                        }}
                                    >
                                        Reliable Protection
                                    </Typography>
                                </Grid>

                                <Grid item>
                                    <Box sx={{ p: 2, borderRadius: 1, mt: 1 }}>
                                        <Typography
                                            sx={{
                                                display: 'block',
                                                '@media (min-width: 1200px)': {
                                                    width: '70%',
                                                    whiteSpace: 'normal',
                                                },
                                                '@media (max-width: 1199px)': {
                                                    width: '130%',
                                                    marginLeft: '-4px',

                                                    marginTop: '-28px', // Adjust this value as needed for mobile
                                                },
                                            }}
                                        >
                                            Our SMS verification with one-time use non-VoIP phone numbers ensure your online accounts stay safe.
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>



                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                // Move the component up only on mobile screens (max-width: 600px)
                                '@media (max-width: 600px)': {
                                    marginTop: '-50px', // Adjust this value as needed for mobile
                                }
                            }}
                        >
                            {/* Image Logo */}
                            <img
                                src="/assets/background/Ico.png"
                                alt="OTP NINJA Logo"
                                style={{
                                    maxWidth: '75px',
                                    width: '30%',
                                    marginBottom: '5px',
                                    marginTop: '-60px',  // You can also tweak this if needed on mobile
                                }}
                            />

                            <Grid container direction="column" spacing={2}>
                                {/* Main content goes here */}
                                <Grid item>
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            pl: { xs: 1, sm: 3, md: 3 },
                                            '@media (max-width: 600px)': {  // Targeting mobile
                                                marginTop: '20px',  // Move the text down a little on mobile if needed
                                            }
                                        }}
                                    >Versatile Compatibility
                                    </Typography>
                                </Grid>

                                <Grid item>
                                    <Box sx={{ p: 2, borderRadius: 1, mt: 1 }}>
                                        <Typography
                                            sx={{
                                                display: 'block',
                                                '@media (min-width: 1200px)': {
                                                    width: '70%',
                                                    whiteSpace: 'normal',
                                                },
                                                '@media (max-width: 1199px)': {
                                                    width: '130%',
                                                    marginLeft: '-4px',

                                                    marginTop: '-28px', // Adjust this value as needed for mobile
                                                },
                                            }}
                                        >
                                            OTP Ninja adapts to various platforms
                                            effortlessly, ensuring compatibility and
                                            ease of use for all users
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                // Move the component up only on mobile screens (max-width: 600px)
                                '@media (max-width: 600px)': {
                                    marginTop: '-50px', // Adjust this value as needed for mobile
                                }
                            }}
                        >
                            {/* Image Logo */}
                            <img
                                src="/assets/background/Icons.png"
                                alt="OTP NINJA Logo"
                                style={{
                                    maxWidth: '75px',
                                    width: '30%',
                                    marginBottom: '5px',
                                    marginTop: '-60px',  // You can also tweak this if needed on mobile
                                }}
                            />

                            <Grid container direction="column" spacing={2}>
                                {/* Main content goes here */}
                                <Grid item>
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            pl: { xs: 1, sm: 3, md: 3 },
                                            '@media (max-width: 600px)': {  // Targeting mobile
                                                marginTop: '37px',  // Move the text down a little on mobile if needed
                                            }
                                        }}
                                    >
                                        Lightning-Fast Verification
                                    </Typography>
                                </Grid>

                                <Grid item>
                                    <Box sx={{ p: 2, borderRadius: 1, mt: 1 }}>
                                        <Typography
                                            sx={{
                                                display: 'block',
                                                '@media (min-width: 1200px)': {
                                                    width: '70%',
                                                    whiteSpace: 'normal',
                                                },
                                                '@media (max-width: 1199px)': {
                                                    width: '130%',
                                                    marginLeft: '-4px',

                                                    marginTop: '-28px', // Adjust this value as needed for mobile
                                                },
                                            }}
                                        >
                                            OTP Ninja offers rapid SMS service,
                                            streamlining your verification process
                                            without sacrificing security.
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>




                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                // Move the component up only on mobile screens (max-width: 600px)
                                '@media (max-width: 600px)': {
                                    marginTop: '-50px', // Adjust this value as needed for mobile
                                }
                            }}
                        >
                            {/* Image Logo */}
                            <img
                                src="/assets/background/Ic.png"
                                alt="OTP NINJA Logo"
                                style={{
                                    maxWidth: '75px',
                                    width: '30%',
                                    marginBottom: '5px',
                                    marginTop: '-60px',  // You can also tweak this if needed on mobile
                                }}
                            />

                            <Grid container direction="column" spacing={2}>
                                {/* Main content goes here */}
                                <Grid item>
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            pl: { xs: 1, sm: 3, md: 3 },
                                            '@media (max-width: 600px)': {  // Targeting mobile
                                                marginTop: '37px',  // Move the text down a little on mobile if needed
                                            }
                                        }}
                                    >Dedicated Support
                                    </Typography>
                                </Grid>

                                <Grid item>
                                    <Box sx={{ p: 2, borderRadius: 1, mt: 1 }}>
                                        <Typography
                                            sx={{
                                                display: 'block',
                                                '@media (min-width: 1200px)': {
                                                    width: '70%',
                                                    whiteSpace: 'normal',
                                                },
                                                '@media (max-width: 1199px)': {
                                                    width: '130%',
                                                    marginLeft: '-4px',

                                                    marginTop: '-28px', // Adjust this value as needed for mobile
                                                },
                                            }}
                                        >
                                            OTP Ninja provides dedicated assistance
                                            for any questions or concerns, ensuring a
                                            hassle-free experience.
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>


                </Grid>

                <Typography variant="h3" sx={{ color: 'text.primary', mb: 3, fontWeight: 'bold' }}>
                    Ready to buy a number?
                </Typography>

                {/* Image Logo Below the Text */}
                <img
                    src="/assets/background/your-icon.svg"
                    alt="OTP NINJA Logo"
                    style={{
                        maxWidth: '200px',
                        width: '100%',
                        marginBottom: '20px',
                    }}
                />


                <Typography variant="body1" sx={{ px: 2, color: 'text.secondary', fontWeight: 'bold' }}>
                    Simplify your verification process with OTPNinja quality numbers.
                    Get started now for hassle-free account security.
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        px: 2, // Padding for text inside the box
                        py: 1, // Vertical padding for the background box
                        backgroundColor: 'primary.main', // Background color like the button's primary color
                        color: 'white', // Text color to contrast the background
                        fontWeight: 'bold',
                        animation: `${beat} 7s ease-in-out infinite`,

                        borderRadius: 2, // Rounded corners for the background
                        zIndex: 1, // Text should stay on top of the background
                        marginTop: '16px', // Add margin to move it down a little
                    }}
                >
                    <Link to="https://otpninja.com/register" style={{ textDecoration: 'none', color: 'white' }}>
                        Get Started Now
                    </Link>
                </Typography>

                <Typography
                    variant="h3"
                    sx={{
                        color: 'text.primary',
                        mb: 3,
                        fontWeight: 'bold',
                        mt: { xs: 7, sm: 7, md: 8 },
                        transform: { xs: 'translateX(30px)', sm: 'none' }, // Move to the left on mobile, no change on larger screens
                    }}
                >
                    What our users say About Us!
                </Typography>

                <Grid container spacing={2} sx={{
                    flexDirection: { xs: 'column', sm: 'row' },  // Stack vertically on mobile (xs), horizontally on larger screens (sm and above)
                    justifyContent: 'center',  // Center the cards on larger screens
                }}>
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                        <Box sx={{
                            minWidth: 317,
                            width: '100%',  // Take full width of its parent container
                        }}>
                            <Card variant="outlined">{card}</Card>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                        <Box sx={{
                            minWidth: 317,
                            width: '100%',
                        }}>
                            <Card variant="outlined">{cards}</Card>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                        <Box sx={{
                            minWidth: 317,
                            width: '100%',
                        }}>
                            <Card variant="outlined">{cars}</Card>
                        </Box>
                    </Grid>



                    {/* Add more Grid items as needed */}
                </Grid>




            </Stack>







            {/* Include the Telegram Icon at the bottom */}
            <TelegramIcon />

        </Box >
    );
}