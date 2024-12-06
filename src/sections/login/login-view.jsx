/* eslint-disable import/no-unresolved */
import axios from 'axios';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [, setData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const options = {
        method: 'POST',
        url: 'https://otpninja.com/api/v1/auth',
        data: { username: email, password },

      };

      const response = await axios.request(options);

      setData(response.data);
      localStorage.setItem('loginResponse', JSON.stringify(response.data));
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);

      if (response.data.token) {
        router.push('/');
      } else {
        setError('Login failed. Please check your credentials.');

      }
      // eslint-disable-next-line no-shadow
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      {/* Adjust the position of the logo */}
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 40, md: 64 }, // Moved logo lower from the top
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
            boxShadow: theme.shadows[5], // Add some shadow for better visibility
          }}
        >
          <Typography variant="h4">Sign in to OtpNinja</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link href="https://otpninja.com/register" variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                name="user"
                label="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal" // Add margin for spacing
              />

              <TextField
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
                margin="normal" // Add margin for spacing
              />
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
              <Link
                href="https://otpninja.com/forgot"
                variant="subtitle2"
                underline="hover"
                target="_blank"
                rel="noopener noreferrer"
              >
                Forgot password?
              </Link>

            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              loading={loading}
            >
              Login
            </LoadingButton>

            {error && <Typography color="error">{error}</Typography>}
          </form>


        </Card>
      </Stack>
    </Box>
  );
}
