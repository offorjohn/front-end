import axios from "axios";
import * as React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import useMediaQuery from '@mui/material/useMediaQuery';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { ListItemText, CircularProgress } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import Modal from './modal';// Import the Modal component




export default function CustomizedTables() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [names, setNames] = useState([]); // State to store names
  const [payments, setPayments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [, setModalType] = useState('success'); // 'success' or 'yellow' based on the response
  const [responseText, setResponseText] = useState('');
  const [cancel, setCancel] = useState('')
  const [loading, setLoading] = useState(false);
  const [subphone, setSubPhone] = useState('');
  const [purchasedNid, setPurchasedNid] = useState(null); // Store the 'nid'
  const [cost] = useState('');
  const isMobile = useMediaQuery('(max-width:600px)'); // Adjust breakpoint as needed
  const [selectedName, setSelectedName] = React.useState('');
  const [serv, setServ] = useState(null);  // To store the single service object
  const [maxWidth, setMaxWidth] = useState('sm');
  const [subtitleText, setSubtitleText] = useState('Previous Verifications    ✔.');
  const [title, setTitle] = useState('PREVIOUS SMS Verifications')
  const [responseData, setResponseData] = useState(null);
  const [cancelModal, setCancelM] = useState('Request FulFilled. ✔')

  const [services, setServices] = React.useState([]);
  const [selectedService, setSelectedService] = React.useState('');

  const handleOpenModal = () => {
    setShowModal(true);

  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.grey,
      color: theme.palette.common.grey,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      paddingLeft: theme.spacing(1), // Adjust the left padding if needed
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  // eslint-disable-next-line no-unused-vars
  const handleLogin = async () => {
    try {
      // eslint-disable-next-line no-undef
      const res = await login(username, password);
      if (res.status) {
        const paymentData = await ("otp", res.token);
        // eslint-disable-next-line no-undef
        setPayments(paymentData);
      
      }
    } catch (error) {
      console.error('Login or fetching payments failed:', error);
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  // eslint-disable-next-line no-unused-vars
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };





  const countryCodeMap = {

    74: 'AF', // Afghanistan
    155: 'AL', // Albania
    58: 'DZ', // Algeria
    76: 'AO', // Angola
    181: 'AI', // Anguilla
    169: 'AG', // Antigua and Barbuda
    39: 'AR', // Argentina
    148: 'AM', // Armenia
    179: 'AW', // Aruba
    175: 'AU', // Australia
    50: 'AT', // Austria
    35: 'AZ', // Azerbaijan
    122: 'BS', // Bahamas
    145: 'BH', // Bahrain
    60: 'BD', // Bangladesh
    118: 'BB', // Barbados
    51: 'BY', // Belarus
    82: 'BE', // Belgium
    124: 'BZ', // Belize
    120: 'BJ', // Benin
    1003: 'BM', // Bermuda
    158: 'BT', // Bhutan
    92: 'BO', // Bolivia
    108: 'BA', // Bosnia and Herzegovina
    123: 'BW', // Botswana
    73: 'BR', // Brazil
    121: 'BN', // Brunei Darussalam
    83: 'BG', // Bulgaria
    152: 'BF', // Burkina Faso
    119: 'BI', // Burundi
    24: 'KH', // Cambodia
    41: 'CM', // Cameroon
    36: 'CA', // Canada
    186: 'CV', // Cape Verde
    170: 'KY', // Cayman Islands
    125: 'CF', // Central African Republic
    42: 'TD', // Chad
    151: 'CL', // Chile
    3: 'CN', // China
    33: 'CO', // Colombia
    133: 'KM', // Comoros
    150: 'CG', // Congo
    18: 'CD', // Congo (Dem. Republic)
    93: 'CR', // Costa Rica
    27: 'CI', // Cote d`Ivoire (Ivory Coast)
    45: 'HR', // Croatia
    113: 'CU', // Cuba
    77: 'CY', // Cyprus
    63: 'CZ', // Czech Republic
    172: 'DK', // Denmark
    168: 'DJ', // Djibouti
    126: 'DM', // Dominica
    109: 'DO', // Dominican Republic
    105: 'EC', // Ecuador
    21: 'EG', // Egypt
    101: 'SV', // El Salvador
    167: 'GQ', // Equatorial Guinea
    176: 'ER', // Eritrea
    34: 'EE', // Estonia
    71: 'ET', // Ethiopia
    189: 'FJ', // Fiji
    163: 'FI', // Finland
    78: 'FR', // France
    162: 'GF', // French Guiana
    154: 'GA', // Gabon
    28: 'GM', // Gambia
    128: 'GE', // Georgia
    43: 'DE', // Germany
    38: 'GH', // Ghana
    201: 'GI', // Gibraltar
    129: 'GR', // Greece
    1008: 'GL', // Greenland
    127: 'GD', // Grenada
    160: 'GP', // Guadeloupe
    94: 'GT', // Guatemala
    68: 'GN', // Guinea
    130: 'GW', // Guinea-Bissau
    131: 'GY', // Guyana
    26: 'HT', // Haiti
    88: 'HN', // Honduras
    14: 'HK', // Hong Kong
    84: 'HU', // Hungary
    132: 'IS', // Iceland
    22: 'IN', // India
    6: 'ID', // Indonesia
    57: 'IR', // Iran
    47: 'IQ', // Iraq
    23: 'IE', // Ireland
    13: 'IL', // Israel
    86: 'IT', // Italy
    103: 'JM', // Jamaica
    1001: 'JP', // Japan
    116: 'JO', // Jordan
    2: 'KZ', // Kazakhstan
    8: 'KE', // Kenya
    1002: 'KR', // Korea
    1004: 'XK', // Kosovo
    100: 'KW', // Kuwait
    11: 'KG', // Kyrgyzstan
    25: 'LA', // Lao People`s
    49: 'LV', // Latvia
    153: 'LB', // Lebanon
    136: 'LS', // Lesotho
    135: 'LR', // Liberia
    102: 'LY', // Libya
    1005: 'LI', // Liechtenstein
    44: 'LT', // Lithuania
    165: 'LU', // Luxembourg
    20: 'MO', // Macau
    183: 'MK', // Macedonia
    17: 'MG', // Madagascar
    137: 'MW', // Malawi
    7: 'MY', // Malaysia
    159: 'MV', // Maldives
    69: 'ML', // Mali
    1011: 'MQ', // Martinique
    114: 'MR', // Mauritania
    157: 'MU', // Mauritius
    54: 'MX', // Mexico
    85: 'MD', // Moldova, Republic of
    144: 'MC', // Monaco
    72: 'MN', // Mongolia
    171: 'ME', // Montenegro
    180: 'MS', // Montserrat
    37: 'MA', // Morocco
    80: 'MZ', // Mozambique
    5: 'MM', // Myanmar
    138: 'NA', // Namibia
    81: 'NP', // Nepal
    48: 'NL', // Netherlands
    185: 'NC', // New Caledonia
    67: 'NZ', // New Zealand
    90: 'NI', // Nicaragua
    139: 'NE', // Niger
    19: 'NG', // Nigeria
    174: 'NO', // Norway
    107: 'OM', // Oman
    66: 'PK', // Pakistan
    112: 'PA', // Panama
    79: 'PG', // Papua New Guinea
    87: 'PY', // Paraguay
    65: 'PE', // Peru
    4: 'PH', // Philippines
    15: 'PL', // Poland
    117: 'PT', // Portugal
    97: 'PR', // Puerto Rico
    111: 'QA', // Qatar
    146: 'RE', // Reunion
    32: 'RO', // Romania
    0: 'RU', // Russian Federation
    140: 'RW', // Rwanda
    134: 'KN', // Saint Kitts and Nevis
    164: 'LC', // Saint Lucia
    166: 'VC', // Saint Vincent
    178: 'ST', // Sao Tome and Principe
    53: 'SA', // Saudi Arabia
    61: 'SN', // Senegal
    29: 'RS', // Serbia
    184: 'SC', // Seychelles
    115: 'SL', // Sierra Leone
    196: 'SG', // Singapore
    1006: 'SX', // Sint Maarten
    141: 'SK', // Slovakia
    59: 'SI', // Slovenia
    149: 'SO', // Somalia
    31: 'ZA', // South Africa
    177: 'SS', // South Sudan
    56: 'ES', // Spain
    64: 'LK', // Sri Lanka
    1010: 'SD', // Sudan
    142: 'SR', // Suriname
    106: 'SZ', // Swaziland
    46: 'SE', // Sweden
    173: 'CH', // Switzerland
    55: 'TW', // Taiwan
    143: 'TJ', // Tajikistan
    9: 'TZ', // Tanzania
    52: 'TH', // Thailand
    91: 'TL', // Timor-Leste
    99: 'TG', // Togo
    104: 'TT', // Trinidad and Tobago
    89: 'TN', // Tunisia
    62: 'TR', // Turkey
    161: 'TM', // Turkmenistan
    75: 'UG', // Uganda
    1: 'UA', // Ukraine
    95: 'AE', // United Arab Emirates
    16: 'GB', // United Kingdom
    187: 'US', // United States
    12: 'US', // United States (virtual)
    156: 'UY', // Uruguay
    40: 'UZ', // Uzbekistan
    1007: 'VU', // Vanuatu
    70: 'VE', // Venezuela
    10: 'VN', // Vietnam
    30: 'YE', // Yemen
    147: 'ZM', // Zambia
    96: 'ZW', // Zimbabwe
  };



  const getFlagUrl = (numericCountryCode) => {
    // Convert numeric country code to ISO code
    const isoCode = countryCodeMap[numericCountryCode];

    if (!isoCode) {
      return ''; // Return empty URL if ISO code is not found
    }

    // Example using Flagpedia API
    return `https://flagpedia.net/data/flags/h80/${isoCode.toLowerCase()}.png`;
  };


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedName(value);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleChanges = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedService(value);
  };





  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




  React.useEffect(() => {

    const fetchNames = async () => {

      const token = JSON.parse(localStorage.getItem('loginResponse'))?.token;
      try {
        const optionsCountries = {
          method: 'GET',
          url: 'https://otpninja.com/api/v1/listcountries?type=otp',

          headers: {
            'X-OTPNINJA-TOKEN': token // If required, use token in custom header
          },
        };

        const optionsServices = {

          method: 'GET',
          url: 'https://otpninja.com/api/v1/listservices?type=otp',  // Example service endpoint

          headers: {
            'X-OTPNINJA-TOKEN': token // If required, use token in custom header
          },
        };

        // Fetch countries and services in parallel
        const [responseCountries, responseServices] = await Promise.all([
          axios.request(optionsCountries),
          axios.request(optionsServices)
        ]);

        // Update state with both responses
        setNames(responseCountries.data.data);
        setServices(responseServices.data.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchNames();
  }, []);



  const handleBuy = async () => {
    try {
      let showPrice = false;

      if (!selectedName || !selectedService) {
        alert("Please select both a country and a service before proceeding.");
        showPrice = false; // Hide the price if either is not selected
        return;
      }

      showPrice = true; // Show the price if both are selected

      // Display price based on the showPrice flag
      if (showPrice) {
        document.getElementById("price").style.display = "block"; // Show price
      } else {
        document.getElementById("price").style.display = "none"; // Hide price
      }

      const token = JSON.parse(localStorage.getItem('loginResponse'))?.token;




      // Set up the request options using the second code snippet's structure
      const options = {

        method: 'POST',
        url: 'https://otpninja.com/api/v1/buynumber',

        headers: {
          'X-OTPNINJA-TOKEN': token // If required, use token in custom header
        },
        data: {
          serviceid: selectedService,  // Use the selected service code
          type: 'otp',                 // Use 'otp' as the type
          countrycode: selectedName,    // Use the selected country code
          mode: 'live'
        }
      };


      // Make the API request
      const response = await axios.request(options);




      // Extract the 'nid' from the response data
      const { nid } = response.data;
      console.log(nid)
      // Store the nid in the state for later use
      setPurchasedNid(nid);
      // Update state with response data
      setResponseData(response.data);
      // Extracting the number and price from response
      const { number } = response.data;  // Accessing number from 'data'
      const { service } = response.data
      setLoading(true);
      // Simulate a network request or some async operation
      setTimeout(() => {
        // Replace this with your actual async logic
        setLoading(false);
      }, 10000); // Simulate a 2-second delay


      if (response.data.number === undefined) {


        setResponseText(`Service not available For this Number.`);
        setShowModal(false);
      

        setTimeout(() => {

          setResponseText(`Service not available For this Number.`);
        },  10800000); // 1,800,000 milliseconds = 30 minutes
        


      } else {
        // Constructing a response message for modal
        setResponseText('waiting...  ');
        setSubPhone(`${number}`); // Set verification phone number

        setTimeout(() => {
          // After 30 seconds, you can change the response text back to something else, or clear it
          setResponseText(''); // Clears the message after 30 seconds
        }, 30000); // 30,000 milliseconds = 30 seconds

        // Set dynamic subtitle based on the received number
        setSubtitleText(`🔽 Waiting to receive an SMS from ${service}. Please note that services may take multiple attempts to succeed.`);
        setTitle(`${service} SMS Verifications`)
        setCancelM('');
        // Set dynamic response text
      }
      console.log(service)
      // Show the modal
      setShowModal(true);

    } catch (error) {
      console.error('Purchase error:', error); // Log the error for debugging
      setResponseText('Purchase failed. Please try again.');
      setModalType('yellow');


    } finally {
      handleClose();
    }
  };


  // Function to cancel the purchased numberv
  const cancelNumber = async () => {

    const token = JSON.parse(localStorage.getItem('loginResponse'))?.token;
    if (!purchasedNid) {
   
      return;
    }

    try {
      // Set up the request options for canceling the number
      const cancelOptions = {
        method: 'POST',
        url: 'https://otpninja.com/api/v1/cancelnumber',
        headers: {
          'X-OTPNINJA-TOKEN': token,
        },
        data: {
          nid: purchasedNid, // Use the stored nid
        },
      };

      // Make the cancel request
      const cancelResponse = await axios.request(cancelOptions);
   

      const { message } = cancelResponse.data; // Assuming the message is in the 'message' field
      const statusCode = cancelResponse.status; // Status code of the response
      // Log the extracted values
      console.log('Message:', message);
      console.log('Status Code:', statusCode);
      // Extract comparison result into a variable
      const isInvalidRequest = (message === 'invalid request');
      if (isInvalidRequest) {
        setCancel('Number Cancelled Already');
      } else {
        setShowModal(true);
        setCancel(`${cancelResponse.data.message}`)
      }
      // Check if the cancellation was successful

    // Wait for 4 seconds before refreshing the page
    setTimeout(() => {
      window.location.reload(); // This will refresh the page after 4 seconds
    }, 4000);

      

    } catch (error) {
      console.error('Error canceling number:', error);
    }
  };






  React.useEffect(() => {
    const token = JSON.parse(localStorage.getItem('loginResponse'))?.token;
    let interval = 10000; // Initial interval of 30 seconds
    const maxInterval = 300000; // Maximum interval of 5 minutes
  
    console.log('useEffect triggered');

    const fetchPayments = async () => {
      console.log(fetchPayments);
      try {
        const options = {
          method: 'GET',
          url: 'https://otpninja.com/api/v1/listmessages?type=otp',
          headers: {
            'X-OTPNINJA-TOKEN': token // If required, use token in custom header
          },
        };
        const response = await axios.request(options);

        // Sort the data by 'messagedate' in descending order to get the latest data first
        const sortedData = response.data.data.sort((a, b) => new Date(b.messagedate) - new Date(a.messagedate));
  

        // Set the sorted data in your state (React use case)
        setPayments(response.data.data);
        console.log(response)
        // Extract values from the latest item (first item after sorting)
        const { name } = sortedData[0];  // Get 'name' from the latest message
        const { message } = sortedData[0];
        const arrayLength = sortedData.length;
        console.log(`Array length: ${arrayLength}`);

        setResponseText(`Refreshes after 30 seconds... ${message}`);


        setTitle(`${name} SMS Verifications`);
     
    
      // Reset interval back to the initial value if data is found
      interval = 30000;
    } catch (error) {
      console.error('Error fetching payments:', error);

      // Double the interval time if the fetch fails or no new data is available
      interval = Math.min(interval * 2, maxInterval);
    }
  };
  console.log(maxInterval)

  // Initial fetch
  fetchPayments();

  // Set up polling with dynamic interval
  const intervalId = setInterval(() => {
    fetchPayments();
  }, interval);
  console.log(intervalId)

  // Clean up the interval on component unmount
  return () => clearInterval(intervalId);
}, []);


  React.useEffect(() => {

    const token = JSON.parse(localStorage.getItem('loginResponse'))?.token;
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://otpninja.com/api/v1/getprice', headers: {
          'X-OTPNINJA-TOKEN': token // If required, use token in custom header
        },
        params: { type: 'otp', servicecode: selectedService, countrycode: selectedName }
      };

      try {
        const response = await axios.request(options);
        setServ(response.data);  // Store the response data in the state
        console.log(response.data)



        
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };

   
    // Call the fetch function once when the component mounts
    fetchData();
  }, [selectedName, selectedService]);  // Empty dependency array ensures it runs only once on mount
  // Create rows and sort them by date (earliest first)


  const rows = payments
    .map((payment) => ({
      id: payment.reference, // Assuming `reference` is unique
      name: payment.name,
      number: payment.number,
      messagedate: new Date(payment.messagedate), // Convert date string to Date object
      message: payment.message,
    }))

    .sort((a, b) => a.messagedate - b.messagedate)




  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  // Calculate rows to display based on pagination
  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <Container>




      {/* Modal Component */}
      <Modal
        show={showModal}
        onClose={cancelNumber} disabled={!purchasedNid}
        onWork={() => setShowModal(false)}
        onChange={handleChange}
        onBack={() => setShowModal(false)}



        responseText={responseText}
        cancel={cancel}
        subtitle={subtitleText} // Dynamic subtitle
        subphone={subphone}
        cost={cost}
        cancelM={cancelModal}

        purchasedNid={purchasedNid} // Pass the NID here


        modalType={responseData}
        title={title}


        time="Time Left"


      />
      <Box sx={{ mt: 4 }}>
        <Stack
          direction={isDesktop ? 'row' : 'column'}
          alignItems={isDesktop ? 'center' : 'flex-start'}
          justifyContent="space-between"
          mb={5}
          spacing={2}
        >

          <Typography
            variant="h4"
            sx={{

              order: -1,
              fontWeight: 'bold',
              fontSize: '2rem',
            }}
          >
            Verifications
          </Typography>

          <Button
            variant="contained"
            onClick={handleClickOpen}
            sx={{
              width: '180px',

              fontSize: isDesktop ? '1rem' : '0.75rem',
              padding: isDesktop ? '8px 16px' : '6px 12px',
              borderRadius: '9999px',

              textAlign: 'center',
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: 'rgba(3, 105, 161)',
              boxShadow: 1,
              '&:hover': {
                backgroundColor: 'rgba(3, 105, 161)',
              },
              '&:disabled': {
                backgroundColor: 'gray',
                color: 'darkgray',
                cursor: 'default',
              },
              '&:focus': {
                outline: 'none',
                ring: 'rgba(3, 105, 161)',
                ringOffset: '2px',
              },
            }}
          >
            Buy Number
          </Button>
        </Stack>

        <Dialog
          autoFocus

          onChange={handleMaxWidthChange}
          value={maxWidth}
          open={open}
          onClose={handleClose}
          fullWidth
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const { email } = formJson;
              console.log(email);
            },
          }}
        >
          <DialogTitle>Buy Number</DialogTitle>
          <DialogContent>
            <Stack direction="column" spacing={2} alignItems="flex-start">
              <Stack
                direction="column"
                spacing={2}
                alignItems={isMobile ? 'stretch' : 'flex-start'}
                sx={{ width: '100%' }}
              >
                {/* Price Section */}
                <Box sx={{ width: '250px', maxWidth: '100%' }}>
                  <DialogContentText>🌏 Select Country</DialogContentText>

                  <FormControl
                    sx={{
                      m: 1,
                      width: 500,
                      maxWidth: isMobile ? '100%' : '900px', // Full width on mobile, fixed width on desktop
                    }}
                  >
                    <InputLabel id="name-label">Name</InputLabel>
                    <Select
                      labelId="name-label"
                      id="name-select"
                      value={selectedName}
                      onChange={handleChange}
                      label="Name"
                      fullWidth

                      MenuProps={{
                        PaperProps: {
                          style: { // Adjust this if needed
                            width: 400,     // Set the desired width for the dropdown menu

                          },
                        },

                      }}


                    >
                      <MenuItem value="">
                        <em style={{ fontSize: '18px' }}>Country</em>

                      </MenuItem>
                      {names.map((name) => (
                        <MenuItem key={name.code} value={name.code} style={{ fontSize: '18px', margin: '10px 0' }}>
                          <ListItemText
                            primary={
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img
                                  src={getFlagUrl(name.code)}
                                  alt={`Flag of ${name.name}`}
                                  style={{ width: 24, height: 16, marginRight: 8 }}
                                />
                                {name.name}
                              </div>
                            }
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* Price Section */}
                <Box sx={{ width: '250px', maxWidth: '100%' }}>
                  <DialogContentText>✉ Select Services</DialogContentText>

                  <FormControl
                    sx={{
                      m: 1,
                      width: 500,
                      maxWidth: isMobile ? '100%' : '900px', // Full width on mobile, fixed width on desktop
                    }}
                  >
                    <InputLabel id="service-label">Service Name</InputLabel>
                    <Select
                      labelId="service-label"  // Ensure this matches the InputLabel's id
                      id="service-select"  // Unique id for the Select component
                      value={selectedService}  // Use the selectedService state variable here
                      onChange={handleChanges}  // Handler to update the selected service
                      label="Service Name"  // Correct label prop
                      fullWidth

                      MenuProps={{
                        PaperProps: {
                          style: { // Adjust this if needed
                            width: 400,     // Set the desired width for the dropdown menu
                          },
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em style={{ fontSize: '18px' }}>Services</em>
                      </MenuItem>
                      {services.map((service) => (
                        <MenuItem key={service.code} value={service.code} style={{ fontSize: '18px', margin: '10px 0' }}>
                          {service.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>


                </Box>

                <Box sx={{ width: '250px', maxWidth: '100%' }}>
                  <DialogContentText>Prices</DialogContentText>
                  <FormControl

                  >
                    <InputLabel id="price" />

                    {/* Use Typography instead of Select to display the price */}
                    <Box

                    >
                      {/* Show "Please select a service" when no service is selected */}
                      {!selectedService ? (
                        <Typography
                          style={{ marginTop: '20px' }}
                        >
                          Please select a service
                        </Typography>
                      ) : (
                        <Typography

                        >
                          {serv.name} ✔ N{serv.price} {/* Display the service name and price */}
                        </Typography>
                      )}
                    </Box>
                  </FormControl>
                </Box>

              </Stack>

              {/* Text Above Amount Section */}
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  onClick={handleBuy}
                  disabled={loading} // Disable the button while loading
                >
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    'Buy'
                  )}
                </Button>

              </DialogActions>

            </Stack>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={handleClose}
              sx={{
                color: 'white',
                backgroundColor: 'red',
                '&:hover': { backgroundColor: 'darkred' },
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Table and Pagination */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Service</StyledTableCell>
                <StyledTableCell align="left">Number</StyledTableCell>
                <StyledTableCell align="left">Message</StyledTableCell>
                <StyledTableCell align="left">Message Date</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedRows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">{row.number}</StyledTableCell>
                  <StyledTableCell align="left">

                    <Button
                      onClick={handleOpenModal}
                      sx={{
                        color: 'white',
                        backgroundColor: 'rgba(3, 105, 161)',
                        boxShadow: 1,
                        '&:hover': {
                          backgroundColor: 'rgba(3, 105, 161)',
                        },
                        '&:disabled': {
                          backgroundColor: 'gray',
                          color: 'darkgray',
                          cursor: 'default',
                        },
                        '&:focus': {
                          outline: 'none',
                          ring: 'rgba(3, 105, 161)',
                          ringOffset: '2px',
                        },
                      }}
                    >
                      Open
                    </Button>

                  </StyledTableCell>
                  <StyledTableCell align="left">{row.messagedate.toLocaleDateString()}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={rows.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </TableContainer>
      </Box>
    </Container >
  );
}