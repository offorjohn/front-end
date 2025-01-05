import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: HEADER_MOBILE,
  [theme.breakpoints.up('md')]: {
    height: HEADER_DESKTOP,
  },
}));

export default function Searchbar() {
  return (
    <StyledContainer>
      <Typography 
        variant="h3"  // Increase the variant to make the text bigger
        sx={{ 
          fontWeight: 'bold', 
          color: 'darkslategray', 
          fontSize: '2rem',  // Adjust font size as needed
          mt: 6  // Adjust margin-top to move the text down
        }}
      >
      {}
      </Typography>
    </StyledContainer>
  );
}
