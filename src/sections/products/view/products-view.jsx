import axios from "axios";
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
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
import DialogContentText from '@mui/material/DialogContentText';
import TableCell, { tableCellClasses } from '@mui/material/TableCell'; // Import useNavigate

import Modal from './modal';// Import the Modal component
import { getCookie } from '../../../utils/cookie-util';
import { isValidJSON } from "../../../utils/json-validator";

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


export default function CustomizedTables() {
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [responseData, setResponseData] = useState(null); // State to hold the response data
  const [selectedService, setSelectedService] = useState(''); // Set the initial value
  const [selectedName, setSelectedName] = React.useState('');
  const [, setModalType] = useState('success'); // 'success' or 'yellow' based on the response

  const [responseText, setResponseText] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [open, setOpen] = useState(false);

  const [, setUniqueNumbers] = useState([]);
  const [serv, setServ] = useState(null);  // To store the single service object
  const [payments, setPayments] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const isMobile = useMediaQuery('(max-width:600px)');
  const [autoRenew, setAutoRenew] = useState(false); // Default to no autorenew

  const [services, setServices] = React.useState([]);



  const navigate = useNavigate(); // Initialize useNavigate


  const handleButtonClick = (phoneNumber) => {

    navigate(`/dedicated?number=${encodeURIComponent(phoneNumber)}`); // Use encodeURIComponent to handle special characters
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const getServiceLogoUrl = (serviceCode) => {
    if (!serviceCode) return ''; // Return empty if service code is missing

    // Define logo and domain mappings as needed
    const serviceLogoMap = {
      1: '2RedBeans',
      2: 'go3fun',
      3: '7Eleven',
      4: '99ranch',
      5: 'AARP',
      6: 'Acorns',
      7: 'adegmedia.site',
      8: 'AdGate',
      9: 'Adidas',
      10: 'AdItUp',
      11: 'adverifai',
      12: 'Aeropay',
      13: 'Affirm',
      14: 'AfterPay',
      15: 'Airbnb',
      16: 'albert',
      17: 'Alibaba',
      18: 'AliPay',
      19: 'Amazon',
      20: 'andostores',
      21: 'Anthropic',
      22: 'AOL',
      23: 'Apple',
      24: 'ASBucks',
      25: 'askgroup.global',
      26: 'Aspiration',
      27: 'AttaPoll',
      28: 'Avion',
      29: 'AWS',
      30: 'salesgenie',
      31: 'AXS',
      32: 'B9',
      33: 'Badoo',
      34: 'Banxa',
      35: 'Baselane',
      36: 'BCGame',
      37: 'beautyuniverse',
      38: 'Benjamin',
      39: 'BestBuy',
      40: 'Bet365',
      41: 'BetaTesting',
      42: 'BetMGM',
      43: 'BetRivers',
      44: 'BiltRewards',
      45: 'Binance',
      46: 'BitClout',
      47: 'Bitmo',
      48: 'Blizzard',
      49: 'BLK',
      50: 'BlueAcorn',
      51: 'Bolt',
      52: 'BOSS',
      53: 'BOTIM',
      54: 'bounty-hunter',
      55: 'Braid',
      56: 'Brandclub',
      57: 'Branded',
      58: 'Brevo',
      59: 'Bridge',
      60: 'Brigit',
      61: 'Bumble',
      62: 'Burner',
      63: 'BYBE',
      64: 'Caesars',
      65: 'CapitalOneShopping',
      66: 'Card',
      67: 'Cash',
      68: 'mycashew',
      69: 'unitedcheckcashing',
      70: 'CashWalk',
      71: 'ancestry',
      72: 'Champs',
      73: 'Chevron',
      74: 'Chime',
      75: 'chispa-app',
      76: 'Chowbus/FoodHwy',
      77: 'ChumbaCasino',
      78: 'CinchDollars',
      79: 'claude.ai',
      80: 'ClickSend',
      81: 'Clickworker',
      82: 'cloud.manager',
      83: 'CocaCola',
      84: 'CoffeeMeetsBagel',
      85: 'Coinbase',
      86: 'CoinFlip',
      87: 'Coinloot',
      88: 'CoinMe',
      89: 'CoinOut',
      90: 'Coinpayu',
      91: 'CollegePulse',
      92: 'ConsumersSample',
      93: 'Coupons',
      94: 'Craigslist',
      95: 'CreditKarma',
      96: 'CreditSesame',
      97: 'Crowdtap',
      98: 'Crypto',
      99: 'CuriousCat',
      100: 'Current',
      101: 'CVS',
      102: 'Dabbl',
      103: 'Dapper',
      104: 'Dave',
      105: 'Deliveroo',
      106: 'DigaYGane',
      107: 'Discord',
      108: 'Doctoralia',
      109: 'dolarapp',
      110: 'DoorDash',
      111: 'Rockstar',
      112: 'Doublelist',
      113: 'Douugh',
      114: 'Drop',
      115: 'DRT',
      116: 'Drumo',
      117: 'Earnhaus',
      118: 'earn.play',
      119: 'Easi',
      120: 'Ebay',
      121: 'EFile',
      122: 'encountercentre.com',
      123: 'Eneba',
      124: 'EngageMessage',
      125: 'e-rewards',
      126: 'Etoro',
      127: 'ETrade',
      128: 'Eureka',
      129: 'Eventbrite',
      130: 'Experian',
      131: 'Facebook',
      132: 'Fanball',
      133: 'FanDuel',
      134: 'fantuan',
      135: 'FeaturePoints',
      136: 'FeaturePoints',
      137: 'Feeld',
      138: 'FetchRewards',
      139: 'firstopinion',
      140: 'Fiverr',
      141: 'similarweb',
      142: 'FlashRewards',
      143: 'FLHSMV',
      144: 'FootLocker',
      145: 'Found',
      146: 'FreeCash',
      147: 'freeward',
      148: 'Freeward',
      149: 'FTX',
      150: 'FTX',
      151: 'G2A',
      152: 'G2G',
      153: 'Gabi',
      154: 'GaintPlay',
      155: 'GCLoot',
      156: 'Gemini',
      157: 'nihon-generic.co',
      158: 'Getir',
      159: 'GetJerry',
      160: 'Gett',
      161: 'GMail',
      162: 'Go2Bank',
      163: 'GoFundMe',
      164: 'Gojek',
      165: 'GoldenHearts',
      166: 'Google',
      167: 'Google',
      168: 'Gopuff',
      169: 'GrabPoints',
      170: 'Grailed',
      171: 'Gravy',
      172: 'GreenDot',
      173: 'GreenLight',
      174: 'GroupMe',
      175: 'Happn',
      176: 'HardRock',
      177: 'Hily',
      178: 'Hinge',
      179: 'HomeDepot',
      180: 'Hopper',
      181: 'HRBLOCK',
      182: 'HUD',
      183: 'HungryPanda',
      184: 'Ib',
      185: 'IBKR',
      186: 'ICQ',
      187: 'IdentityGuard',
      188: 'Idle-Empire',
      189: 'Igitems',
      190: 'Imgur',
      191: 'Impact',
      192: 'Indeed',
      193: 'Index',
      194: 'Inspire',
      195: 'Instacart',
      196: 'InstaGC',
      197: 'Instagram',
      198: 'InstaReM',
      199: 'Insurance',
      200: 'Intuit',
      201: 'Invstr',
      202: 'iPlum',
      203: 'IPoll',
      204: 'ipsosisay',
      205: 'JamboSurveys',
      206: 'Juno',
      207: 'Juno',
      208: 'KakaoTalk',
      209: 'Kamatera',
      210: 'Kikoff',
      211: 'Klarna',
      212: 'Klover',
      213: 'Kudos',
      214: 'Kwai',
      215: 'Libby',
      216: 'Lili',
      217: 'Line',
      218: 'LinkedIn',
      219: 'ListWise',
      220: 'LocalBitcoins',
      221: 'LuckyLand',
      222: 'LuckyPlay',
      223: 'Lukman',
      224: 'Luxy',
      225: 'Lyft',
      226: 'M1Finance',
      227: 'Marble',
      228: 'Match',
      229: 'MatchtoWin.beer',
      230: 'Mercari',
      231: 'MetroOpinion',
      232: 'Microsoft',
      233: 'Miles-and-more',
      234: 'Mistplay',
      235: 'Modemobile',
      236: 'MoneyGram',
      237: 'MoneyLion',
      238: 'MoonPay',
      239: 'Movo',
      240: 'MyBookie',
      241: 'MyPanelLab',
      242: 'NbmCash',
      243: 'CPanel',
      244: 'NerdWallet',
      245: 'Netflix',
      246: 'NewsBreak',
      247: 'Nexmo',
      248: 'Nielsen',
      249: 'NiftyGateway',
      250: 'Nike',
      251: 'Odysee',
      252: 'OfferUp',
      253: 'OffGamers',
      254: 'OhentPay',
      // Previous entries...
      255: 'OKCoin',
      256: 'OkCupid',
      257: 'One',
      258: 'OneForma',
      259: 'OneOpinion',
      260: 'OpenAI',
      261: 'OpenPhone',
      262: 'OpinionOutpost',
      263: 'Oracle',
      264: 'Ourtime',
      265: 'Outlier',
      266: 'OWP',
      267: 'Oxygen',
      268: 'PaddyPower',
      269: 'PangeaMoneytransfer',
      270: 'PangeaMoneytransfer',
      271: 'store.passbooks',
      272: 'Paxful',
      273: 'Payactiv',
      274: 'Paybis',
      275: 'Payoneer',
      276: 'PayPal',
      277: 'PaySafeCard',
      278: 'PaySend',
      279: 'PayTomorrow',
      280: 'PerfectGift',
      281: 'PerPay',
      282: 'Perx',
      283: 'Piemob',
      284: 'Pinecone',
      285: 'PingPong',
      286: 'PI-review',
      287: 'Plastiq',
      288: 'PlayerAuctions',
      289: 'PlayerAuctions',
      290: 'PlayTestCloud',
      291: 'PocketGuard',
      292: 'POF',
      293: 'Pogo',
      294: 'Pointclub',
      295: 'Poshmark',
      296: 'Postmates',
      297: 'Prime.Opinion',
      298: 'ProductLab',
      299: 'Prolific',
      300: 'Proton',
      301: 'Publix',
      302: 'Pyypl',
      303: 'Qmee',
      304: 'QuadPay',
      305: 'QuickThoughtsapp',
      306: 'Quicrypto',
      307: 'Razer',
      308: 'RED',
      309: 'Remotasks',
      310: 'Rently',
      311: 'Research',
      312: 'Respondent',
      313: 'RetailMeNot',
      314: 'RevX',
      315: 'RewardHero',
      316: 'RewardHero',
      317: 'RewardMe',
      318: 'Rewardtime',
      319: 'Ria',
      320: 'Ricepo',
      321: 'Ricepo',
      322: 'Ring4',
      323: 'Roblox',
      324: 'RoboKiller',
      325: 'RoomMates',
      326: 'Rumble',
      327: 'Rumble',
      328: 'SamsClub',
      329: 'SamsungPay',
      330: 'SEAGM',
      331: 'SeamlessAI',
      332: 'Seated',
      333: 'Seis',
      334: 'Sendwave',
      335: 'Sezzle',
      336: 'Shopify',
      337: 'Shopkick',
      338: 'Sideline',
      339: 'Signal',
      340: 'SignalWire',
      341: 'Skout',
      342: 'Skrill',
      343: 'Skype',
      344: 'SmallWorld',
      345: 'SmartyPig',
      346: 'Smoreapp',
      347: 'Snapchat',
      348: 'Sofi',
      349: 'sparkdriverapp',
      350: 'Sparrow',
      351: 'Sparrow',
      352: 'Spruce',
      353: 'Square',
      354: 'Stash',
      355: 'Steadyiq',
      356: 'steampowered',
      357: 'Step',
      358: 'Stir',
      359: 'Strike',
      360: 'Stripe',
      361: 'SugarDaddy.ng',
      362: 'Sumsub',
      363: 'SumUp',
      364: 'SurveyJunkie',
      365: 'SurveyMonkey',
      366: 'SurveyPolice',
      367: 'Survey.Pop',
      368: 'SurveyRewardz',
      369: 'Survey.Spin',
      370: 'SurveyTime',
      371: 'panelist.cint',
      372: 'Swagbucks',
      373: 'SwissBorg',
      374: 'Taimi',
      375: 'Talkyou',
      376: 'Tantan',
      377: 'Tapchamps',
      378: 'TapResearch',
      379: 'Target',
      380: 'Telegram',
      381: 'TheoremReach',
      382: 'TheoremReach',
      383: 'Ticketmaster',
      384: 'TikTok',
      385: 'Tinder',
      386: 'TIv',
      387: 'Tiv',
      388: 'Truist',
      389: 'Truist',
      390: 'TurboTax',
      391: 'Twilio',
      392: 'Twitch',
      393: 'Twitter',
      394: 'Uber',
      395: 'UKG',
      396: 'Unknown.com',
      397: 'Unlimited',
      398: 'Upgrade',
      399: 'Uphold',
      400: 'Upward',
      401: 'Upwork',
      402: 'Userbrain',
      403: 'UserCrowd',
      404: 'UserInterviews',
      405: 'Userlytics',
      406: 'Valley',
      407: 'ValuedOpinions',
      408: 'Varo',
      409: 'Venmo',
      410: 'Verasight',
      411: 'Vercel',
      412: 'VerifyKit',
      413: 'ariavetri',
      414: 'Viber',
      415: 'Vinted',
      416: 'Virgin',
      417: 'Virginia',
      418: 'Vitacost',
      419: 'Vrbo',
      420: 'Vrbo',
      421: 'Walgreens',
      422: 'WalletHub',
      423: 'Walmart',
      424: 'Webull',
      425: 'WeChat',
      426: 'sayWeee',
      427: 'Weibo',
      428: 'WePlay',
      429: 'Wert',
      430: 'WhatNot',
      431: 'WhatsApp',
      432: 'Whisper',
      433: 'Whop',
      434: 'Wise',
      435: 'Womply',
      436: 'WorldRemit',
      437: 'WowApp',
      438: 'X1creditCard',
      439: 'Xcoins',
      440: 'XeMoney',
      441: 'Xiaomi',
      442: 'Xiecheng',
      443: 'XWorldWallet',
      444: 'Yahoo',
      445: 'Yalla',
      446: 'YikYak',
      447: 'Yobi',
      448: 'YouTube',
      449: 'Yubo',
      450: 'Zilla',
      451: 'Zillow',
      452: 'Zogo',
      453: 'ZoomBucks',
      454: 'ZoomInfo',
      455: 'Zoosk'
    };

    // Define a mapping for domain types based on service codes
    const serviceDomainMap = {
      1: 'com',
      2: 'co',
      3: 'com',
      4: 'com',
      5: 'org',
      6: 'com',
      7: 'com',
      8: 'com',
      9: 'com',
      10: 'tech',
      11: 'com',
      12: 'com',
      13: 'com',
      14: 'com',
      15: 'com',
      16: 'com',
      17: 'com',
      18: 'com',
      19: 'com',
      20: 'com',
      21: 'ai',
      22: 'com',
      23: 'com',
      24: 'com',
      25: 'com',
      26: 'org',
      27: 'com',
      28: 'com',
      29: 'com',
      30: 'com',
      31: 'com',
      32: 'com',
      33: 'com',
      34: 'com',
      35: 'com',
      36: 'com',
      37: 'com',
      38: 'com',
      39: 'com',
      40: 'com',
      41: 'com',
      42: 'com',
      43: 'com',
      44: 'com',
      45: 'com',
      46: 'com',
      47: 'com',
      48: 'com',
      49: 'com',
      50: 'com',
      51: 'com',
      52: 'com',
      53: 'com',
      54: 'com',
      55: 'co',
      56: 'com',
      57: 'com',
      58: 'co',
      59: 'com',
      60: 'com',
      61: 'com',
      62: 'com',
      63: 'com',
      64: 'com',
      65: 'com',
      66: 'com',
      67: 'app',
      68: 'co',
      69: 'com',
      70: 'com',
      71: 'com',
      72: 'com',
      73: 'com',
      74: 'com',
      75: 'com',
      76: 'com',
      77: 'com',
      78: 'com',
      79: 'co',
      80: 'com',
      81: 'com',
      82: 'io',
      83: 'com',
      84: 'com',
      85: 'com',
      86: 'com',
      87: 'com',
      88: 'com',
      89: 'com',
      90: 'com',
      91: 'com',
      92: 'com',
      93: 'com',
      94: 'com',
      95: 'com',
      96: 'com',
      97: 'com',
      98: 'com',
      99: 'com',
      100: 'com',
      101: 'com',
      102: 'com',
      103: 'com',
      104: 'com',
      105: 'com',
      106: 'com',
      107: 'com',
      108: 'com',
      109: 'com',
      110: 'com',
      111: 'com',
      112: 'com',
      113: 'com',
      114: 'com',
      115: 'com',
      116: 'com',
      117: 'com',
      118: 'com',
      119: 'com',
      120: 'com',
      121: 'com',
      122: 'au',
      123: 'com',
      124: 'com',
      125: 'com',
      126: 'com',
      127: 'com',
      128: 'com',
      129: 'com',
      130: 'com',
      131: 'com',
      132: 'com',
      133: 'com',
      134: 'ca',
      135: 'com',
      136: 'com',
      137: 'com',
      138: 'com',
      139: 'online',
      140: 'com',
      141: 'com',
      142: 'co',
      143: 'gov',
      144: 'com',
      145: 'com',
      146: 'com',
      147: 'net',
      148: 'net',
      149: 'com',
      150: 'com',
      151: 'com',
      152: 'com',
      153: 'com',
      154: 'com',
      155: 'com',
      156: 'com',
      157: 'jp',
      158: 'com',
      159: 'com',
      160: 'com',
      161: 'com',
      162: 'com',
      163: 'com',
      164: 'com',
      165: 'co',
      166: 'com',
      167: 'com',
      168: 'com',
      169: 'com',
      170: 'com',
      171: 'co',
      172: 'com',
      173: 'com',
      174: 'com',
      175: 'com',
      176: 'com',
      177: 'com',
      178: 'com',
      179: 'com',
      180: 'com',
      181: 'com',
      182: 'gov',
      183: 'com',
      184: 'com',
      185: 'com',
      186: 'com',
      187: 'com',
      188: 'com',
      189: 'com',
      190: 'com',
      191: 'com',
      192: 'com',
      193: 'com',
      194: 'com',
      195: 'com',
      196: 'com',
      197: 'com',
      198: 'com',
      199: 'com',
      200: 'com',
      201: 'com',
      202: 'com',
      203: 'com',
      204: 'com',
      205: 'com',
      206: 'com',
      207: 'com',
      208: 'com',
      209: 'com',
      210: 'com',
      211: 'com',
      212: 'com',
      213: 'com',
      214: 'com',
      215: 'com',
      216: 'co',
      217: 'com',
      218: 'com',
      219: 'com',
      220: 'com',
      221: 'com',
      222: 'com',
      223: 'com',
      224: 'com',
      225: 'com',
      226: 'com',
      227: 'com',
      228: 'com',
      229: 'com',
      230: 'com',
      231: 'com',
      232: 'com',
      233: 'com',
      234: 'com',
      235: 'com',
      236: 'com',
      237: 'com',
      238: 'com',
      239: 'cash',
      240: 'com',
      241: 'com',
      242: 'com',
      243: 'com',
      244: 'com',
      245: 'com',
      246: 'com',
      247: 'com',
      248: 'com',
      249: 'com',
      250: 'com',
      251: 'com',
      252: 'com',
      253: 'com',
      254: 'com',
      // Previous entries...
      255: 'com',
      256: 'com',
      257: 'com',
      258: 'com',
      259: 'com',
      260: 'com',
      261: 'com',
      262: 'com',
      263: 'com',
      264: 'com',
      265: 'com',
      266: 'com',
      267: 'com',
      268: 'com',
      269: 'com',
      270: 'com',
      271: 'com',
      272: 'com',
      273: 'com',
      274: 'com',
      275: 'com',
      276: 'com',
      277: 'com',
      278: 'com',
      279: 'com',
      280: 'com',
      281: 'com',
      282: 'com',
      283: 'com',
      284: 'com',
      285: 'com',
      286: 'com',
      287: 'com',
      288: 'com',
      289: 'com',
      290: 'com',
      291: 'com',
      292: 'com',
      293: 'com',
      294: 'com',
      295: 'com',
      296: 'com',
      297: 'com',
      298: 'com',
      299: 'com',
      300: 'com',
      301: 'com',
      302: 'com',
      303: 'com',
      304: 'com',
      305: 'com',
      306: 'com',
      307: 'com',
      308: 'com',
      309: 'com',
      310: 'com',
      311: 'com',
      312: 'io',
      313: 'com',
      314: 'io',
      315: 'com',
      316: 'com',
      317: 'com',
      318: 'app',
      319: 'com',
      320: 'com',
      321: 'com',
      322: 'com',
      323: 'com',
      324: 'com',
      325: 'com',
      326: 'com',
      327: 'com',
      328: 'com',
      329: 'com',
      330: 'com',
      331: 'com',
      332: 'com',
      333: 'com',
      334: 'com',
      335: 'com',
      336: 'com',
      337: 'com',
      338: 'com',
      339: 'com',
      340: 'com',
      341: 'com',
      342: 'com',
      343: 'com',
      344: 'com',
      345: 'com',
      346: 'com',
      347: 'com',
      348: 'com',
      349: 'com',
      350: 'com',
      351: 'com',
      352: 'com',
      353: 'com',
      354: 'com',
      355: 'com',
      356: 'com',
      357: 'com',
      358: 'com',
      359: 'com',
      360: 'com',
      361: 'com',
      362: 'com',
      363: 'com',
      364: 'com',
      365: 'com',
      366: 'com',
      367: 'com',
      368: 'com',
      369: 'com',
      370: 'com',
      371: 'com',
      372: 'com',
      373: 'com',
      374: 'com',
      375: 'me',
      376: 'com',
      377: 'com',
      378: 'com',
      379: 'com',
      380: 'org',
      381: 'com',
      382: 'com',
      383: 'com',
      384: 'com',
      385: 'com',
      386: 'com',
      387: 'com',
      388: 'com',
      389: 'com',
      390: 'com',
      391: 'com',
      392: 'com',
      393: 'com',
      394: 'com',
      395: 'com',
      396: 'ng',
      397: 'com',
      398: 'com',
      399: 'com',
      400: 'com',
      401: 'com',
      402: 'com',
      403: 'com',
      404: 'com',
      405: 'com',
      406: 'com',
      407: 'com',
      408: 'com',
      409: 'com',
      410: 'io',
      411: 'com',
      412: 'com',
      413: 'com',
      414: 'com',
      415: 'com',
      416: 'com',
      417: 'com',
      418: 'com',
      419: 'com',
      420: 'com',
      421: 'com',
      422: 'com',
      423: 'com',
      424: 'com',
      425: 'com',
      426: 'com',
      427: 'com',
      428: 'com',
      429: 'com',
      430: 'com',
      431: 'com',
      432: 'com',
      433: 'com',
      434: 'com',
      435: 'com',
      436: 'com',
      437: 'com',
      438: 'com',
      439: 'com',
      440: 'com',
      441: 'com',
      442: 'com',
      443: 'com',
      444: 'com',
      445: 'com',
      446: 'com',
      447: 'com',
      448: 'com',
      449: 'live',
      450: 'com',
      451: 'com',
      452: 'com',
      453: 'com',
      454: 'com',
      455: 'com'
    };

    // Get the mapped logo filename from serviceLogoMap
    const logoFilename = serviceLogoMap[serviceCode];

    // Debugging: Check the logo filename after mapping

    if (!logoFilename) return '...'; // Return empty if no logo is found for the code

    // Determine the domain type based on the serviceDomainMap or default to 'com'
    const domainType = serviceDomainMap[serviceCode] || 'com';

    // Construct the URL with the mapped filename
    return `https://logo.clearbit.com/${logoFilename}.${domainType}`;
  };





  const handleClose = () => {
    setOpen(false);
  };
  const handleChanges = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedService(value);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedName(value);
  };



  useEffect(() => {
    const fetchPayments = async () => {

      let token=getCookie("token").split(":")[0];
      if(isValidJSON(localStorage.getItem('loginResponse'))){
       token = JSON.parse(localStorage.getItem('loginResponse'))?.token;
      }

      try {
        const options = {
          method: 'GET',
          url: 'https://otpninja.com/api/v1/listmessages?type=mdn',
          headers: {
            'X-OTPNINJA-TOKEN': token // If required, use token in custom header
          },
        };
        const response = await axios.request(options);



        // Filter out duplicate numbers
        const uniquePayments = response.data.data.filter(
          (payment, index, self) =>
            index === self.findIndex((p) => p.number === payment.number)
        );








        setUniqueNumbers(uniquePayments.map(payment => payment.number)); // Store only the unique numbers

        setPayments(uniquePayments); // Store only the unique payments

      } catch (error) { /* empty */ }
    };
    fetchPayments();
  }, []);

  useEffect(() => {
    const fetchNames = async () => {


      let token=getCookie("token").split(":")[0];
    if(isValidJSON(localStorage.getItem('loginResponse'))){
     token = JSON.parse(localStorage.getItem('loginResponse'))?.token;
    }

      try {
        const optionsServices = {
          method: 'GET',
          url: 'https://otpninja.com/api/v1/listservices?type=mdn',
          headers: {
            'X-OTPNINJA-TOKEN': token // If required, use token in custom header
          },

        };
        const responseServices = await axios.request(optionsServices);
       if(responseServices.data.data){
        setServices(responseServices.data.data);
       }
      } catch (error) { /* empty */ }
    };
    fetchNames();
  }, []);

  React.useEffect(() => {

    let token=getCookie("token").split(":")[0];
    if(isValidJSON(localStorage.getItem('loginResponse'))){
     token = JSON.parse(localStorage.getItem('loginResponse'))?.token;
    }
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://otpninja.com/api/v1/getprice',
        headers: {
          'X-OTPNINJA-TOKEN': token // If required, use token in custom header
        },

        params: { type: 'mdn', servicecode: selectedService, countrycode: selectedName }
      };

      try {
        const response = await axios.request(options);
        if(response.data){
        setServ(response.data);  // Store the response data in the state
        }
      } catch (error) { /* empty */ }
    };

    // Call the fetch function once when the component mounts
    fetchData();
  }, [selectedName, selectedService]);  // Empty dependency array ensures it runs only once on mount



  const handleBuy = async () => {
    try {
      let showPrice = false;

      // eslint-disable-next-line no-undef
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

      let token=getCookie("token").split(":")[0];
      if(isValidJSON(localStorage.getItem('loginResponse'))){
       token = JSON.parse(localStorage.getItem('loginResponse'))?.token;
      }


      // Set up the request options using the second code snippet's structure
      const options = {

        method: 'POST',
        url: 'https://otpninja.com/api/v1/buynumber',

        headers: {
          'X-OTPNINJA-TOKEN': token // If required, use token in custom header
        },
        data: {
          serviceid: selectedService,  // Use the selected service code
          type: 'mdn',                 // Use 'otp' as the type
          // eslint-disable-next-line no-undef
          countrycode: selectedName,    // Use the selected country code
          mode: 'live',
          autorenew: autoRenew         // Add autorenew based on the select value
        }
      };



      // Make the API request
      const response = await axios.request(options);


      // Update state with response data
      if(response.data){
      setResponseData(response.data);
    



      // Handle response based on message content
      if (response.data.message === 'Invalid service') {
        setResponseText('Service not available.');
      } else {
        setResponseText(JSON.stringify(response.data.message)); // Display the actual response message
        setModalType('success'); // Adjust the modal type based on success
      }

      // Check for successful purchase and trigger a page refresh in 3 seconds
      if (response.data.message === 'Successfully purchased number') {
        setTimeout(() => {
          window.location.reload(); // Refresh the page
        }, 3000); // 3 seconds
      }

    }


      setShowModal(true);

    } catch (error) {
      setResponseText('Purchase failed. Please try again.');
      setModalType('yellow');
      setShowModal(true);
    } finally {
      // Optionally close the dialog after a successful purchase
      handleClose();
    }
  };


  const calculateRemainingDays = (messagedate) => {
    const currentDate = new Date(); // Today's date
    const purchaseDate = new Date(messagedate); // Date the rental/service started

    const timeDiff = currentDate - purchaseDate; // Difference in milliseconds
    const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

    const remainingDays = Math.max(30 - daysPassed, 0); // Calculate remaining days, ensure it doesn't go below 0

    return remainingDays === 0 ? 'Expired' : `${remainingDays} days left`; // Show "Expired" if remaining days is 0
  };

  // Create rows and sort them by date (earliest first)
  const rows = payments
    .map((payment) => ({
      id: payment.reference, // Assuming `reference` is unique
      name: payment.name,
      number: payment.number,
      messagedate: new Date(payment.messagedate), // Convert date string to Date object
      message: payment.message,
      remainingDays: calculateRemainingDays(payment.messagedate) // Calculate remaining days
    }))
    .sort((a, b) => a.messagedate - b.messagedate); // Sort by date (earliest first)


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const paginatedRows = rows
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .reverse();




  const isDesktop = useMediaQuery('(min-width:600px)');



  return (


    <Container>
      {/* Modal Component */}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        responseText={responseText}
        modalType={responseData}
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
            Rentals
          </Typography>

          <Button variant="contained" onClick={handleClickOpen} sx={{

            fontSize: isDesktop ? '1rem' : '0.75rem',
            padding: isDesktop ? '8px 16px' : '6px 12px',

            backgroundColor: 'rgba(3, 105, 161)'
          }}>
            Purchase New Rentals
          </Button>
        </Stack>

        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>Rental Number</DialogTitle>
          <DialogContent>
            <Stack direction="column" spacing={2} alignItems="flex-start">

              <Stack
                direction="column"
                spacing={2}
                alignItems={isMobile ? 'stretch' : 'flex-start'}
                sx={{ width: '100%' }}
              >

                <Box sx={{ width: '250px', maxWidth: '100%' }}>
                  <DialogContentText>Service</DialogContentText>

                  <FormControl
                    sx={{
                      m: 1,
                      width: 500,
                      maxWidth: isMobile ? '100%' : '900px', // Full width on mobile, fixed width on desktop
                    }}
                  >
                    <InputLabel id="service-label">Service Name</InputLabel>
                    <Select
                      labelId="service-label"

                      id="service-select"
                      value={selectedService}
                      onChange={handleChanges}
                      label="Service Name"
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
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                              src={getServiceLogoUrl(service.code)} // Ensure this function exists
                              alt={`Logo of ${service.name}`}
                              style={{ width: 24, height: 24, marginRight: 8 }}
                            />
                            {service.name}
                          </div>
                        </MenuItem>
                      ))}

                    </Select>

                  </FormControl>
                </Box>

                <Box sx={{ width: '250px', maxWidth: '100%' }}>
                  <DialogContentText>Durations</DialogContentText>

                  <FormControl
                    sx={{
                      m: 1,
                      width: 500,
                      maxWidth: isMobile ? '100%' : '900px', // Full width on mobile, fixed width on desktop
                    }}
                  >
                    <InputLabel id="service-label">Duration</InputLabel>
                    <Select
                      labelId="service-label"
                      id="service-select"
                      value={selectedName}

                      onChange={handleChange}
                      label="Service Name"
                    >
                      <MenuItem value="30-days-rentals">
                        <em>30 Days Rentals</em>
                      </MenuItem>
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

                <Box sx={{ width: '250px', maxWidth: '100%' }}>
                  <DialogContentText>Auto-Renew</DialogContentText>
                  <FormControl
                    sx={{
                      m: 1,
                      width: 500,
                      maxWidth: isMobile ? '100%' : '900px', // Full width on mobile, fixed width on desktop
                    }}
                  >
                    <InputLabel id="autorenew-label">Auto-Renew</InputLabel>
                    <Select
                      labelId="autorenew-label"
                      id="autorenew-select"
                      value={autoRenew}
                      onChange={(event) => setAutoRenew(event.target.value)} // Set state for autorenew
                      label="Auto-Renew"
                    >
                      <MenuItem value={false}>No</MenuItem> {/* Default: No autorenew */}
                      <MenuItem value>Yes</MenuItem> {/* Enable autorenew */}
                    </Select>
                  </FormControl>
                </Box>


              </Stack>

              {/* Text Above Amount Section */}
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleBuy}>Buy</Button>

              </DialogActions>

            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: 'white', backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Number</StyledTableCell>

                <StyledTableCell align="left">Service</StyledTableCell>

                <StyledTableCell align="left">Duration</StyledTableCell>

                <StyledTableCell align="left">Date</StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>

              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedRows.map((row) => ( // Add rowIndex here
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="left">{row.number}</StyledTableCell>

                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">{row.remainingDays}</StyledTableCell> {/* Display remaining days */}

                  <StyledTableCell align="left">{new Date(row.messagedate).toLocaleDateString()}</StyledTableCell>

                  <StyledTableCell align="left">
                    <div style={{ marginBottom: '8px' }}>
                      <Button
                        onClick={() => handleButtonClick(row.number)} // Use row.number directly
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
                        title={`Open ${row.number}`} // Tooltip to indicate the action
                      >
                        Open
                        <span style={{ display: 'none' }}>
                          Open {row.number}
                        </span> {/* Hidden text for accessibility */}
                      </Button>
                    </div>
                  </StyledTableCell>
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
    </Container>
  );
}