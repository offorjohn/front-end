/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { React, } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// eslint-disable-next-line import/no-unresolved
import { bgGradient } from 'src/theme/css';

// eslint-disable-next-line import/no-unresolved
import Logo from 'src/components/logo';

import TelegramIcon from '../../layouts/dashboard/common/telegram';  // Adjust path accordingly

// ----------------------------------------------------------------------

export default function HomeView() {


    const theme = useTheme();
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

            {/* Logo */}
            <Logo
                sx={{
                    top: { xs: 35, md: 44 },
                    left: { xs: 16, md: 24 },
                }}
            />

            {/* Main content */}



            <Stack alignItems="center" justifyContent="center" sx={{ height: 'auto', px: 5, pt: 8 }}>
                 
                <Typography variant="h2" sx={{ color: 'text.primary', mb: 3, fontWeight: 'bold' }}>
                    About Us
                </Typography>

                <Typography variant="body1" sx={{ px: 2, color: 'text.secondary' }}>
                    Your one-stop solution for OTP generation and management.
                </Typography>


                {/* Call to Action Buttons for Login and Register */}
                <Stack direction="row" spacing={2} sx={{ mt: 4, display: { xs: 'none', md: 'flex' } }}>
                 

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
                </Stack>

            </Stack>

            
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },  // Stack items in a column on xs, row on md and up
                    justifyContent: { xs: 'center', md: 'space-between' }, // Center on xs, space-between on md
                    alignItems: 'center', // Vertically center items on xs, align items left/right on larger screens
                    fontWeight: 'bold',
                    width: '100%',

                    mt: { xs: 75, sm: 7, md: 50 },
                    p: 1,
                    borderTop: '1px solid #ccc',
                    backgroundColor: '#f9f9f9',
                    gap: { xs: 2, md: 5 }, // Spacing between items
                }}
            >

                {/* Logo */}
                <Logo
                    sx={{
                        order: { xs: 0, md: 0 }, // Ensure logo comes first on mobile (xs), later on larger screens
                        mb: { xs: -1, md: -10 }, // Add margin bottom on mobile to create spacing between logo and text
                    }}
                />

                {/* Text Items in a Row on Medium Screens and Larger */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 5 }}>
                    <Box>About</Box>
                    <Box>Privacy Policy</Box>
                    <Box>Terms of Service</Box>
                </Box>

                {/* Text Items in Column on Small Screens */}
                <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 2, flexDirection: 'row', textAlign: 'center' }}>
                    <Box>About</Box>
                    <Box>Privacy Policy</Box>
                    <Box>Terms of Service</Box>
                </Box>

                <Box>© 2024 Otp Ninja</Box>

            </Box>












            {/* Include the Telegram Icon at the bottom */}
            <TelegramIcon />

        </Box >
    );
} 