import axios from "axios";
import * as React from 'react';
import { useRef, useState } from 'react';

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
  const [rowsPerPage, setRowsPerPage] = useState(25);
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
  const [subtitleText, setSubtitleText] = useState('');
  const [title, setTitle] = useState('PREVIOUS SMS Verifications')
  const [responseData, setResponseData] = useState(null);
  const [cancelModal, setCancelM] = useState('Request FulFilled. ✔')

  const [message, setMessage] = React.useState(''); // State for message content
  const previousMessageRef = useRef(message); // Ref to store the previous message

  const [services, setServices] = React.useState([]);
  const [selectedService, setSelectedService] = React.useState('');



  // Declare a state variable to count the number of times the latest message has been the same
  const [noNewMessagesCount, setNoNewMessagesCount] = useState(0);


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


  const serviceLogoMap = {
    akd: 'feels',
    acc: 'luckylandslots',
    ail: 'zoo.game',
    wp: '163',
    hn: '1688',
    ahs: '1and1',
    wj: '1xbet',
    lh: '24betting',
    qi: '32red',
    hk: 'mailchimp',
    ll: '888casino',
    fw: '99acres',
    ki: '99app',
    acv: 'a23',
    gn: 'a9',
    ags: 'abbott',
    rh: 'ace2three',
    amf: 'acko',
    ko: 'adakami',
    bq: 'adani',
    an: 'adidas',
    aip: 'afreecatv',
    sa: 'agibank',
    cs: 'agriwebb',
    qu: 'agroinform',

    uk: 'airbnb',
    zl: 'airtel',
    acy: 'airtime',
    wv: 'ais',
    jj: 'aitu',
    rf: 'aitu',
    tm: 'akulaku',
    aav: 'alchemy',
    bt: 'alfa',
    bn: 'alfa',
    lp: 'algida',
    ab: 'alibaba',
    hx: 'aliexpress',
    hw: 'alipay',
    ajy: 'all.access',
    yn: 'allegro',
    nh: 'allobank',
    aeo: 'allofresh',
    yo: 'amasia',
    am: 'amazon',
    aee: 'amway',
    aha: 'angelone',
    agh: 'anibis',
    alg: 'ankama',
    ot: 'apostaganha',
    pm: 'aol',
    ml: 'aposta-ganha',
    wx: 'apple',
    gk: 'apteka',
    rq: 'apteka',
    aco: 'ar.lens',
    abt: 'arenaplus',
    hs: 'asda',
    ajp: 'asiamiles',
    afd: 'astraotoshop',
    aem: 'astrapay',
    gr: 'astropay',
    du: 'aubank',
    kd: 'author24',
    aej: 'autoru',
    ajl: 'averusa',
    avt: 'aviata',
    av: 'avito',
    ff: 'avon',
    aaw: 'ayabank',
    qv: 'badoo',
    li: 'baidu',
    agy: 'baihe',
    agq: 'bajajfinserv',
    hl: 'band',
    ajd: 'bankera',
    aev: 'bankkaro',
    vc: 'banqi',
    gr_bg: 'battlestategames',
    cb: 'bazos',
    alu: 'bc',
    adf: 'klikbcasyariah',
    gr_bf: 'beanfun',
    aar: 'bearwww',
    aly: 'bebeclub.co',
    abd: 'bee-boo',
    ov: 'beget',
    um: 'belwest',
    ck: 'bereal',
    ie: 'bet365',
    agl: 'betano',
    vd: 'betfair',
    aab: 'bharatpe',
    zn: 'biedronka',
    zu: 'bigc.co',
    bl: 'bigo',
    zs: 'bilibili',
    ri: 'billmill',
    uv: 'binbin',
    ww: 'bip',
    el: 'bisu',
    qk: 'bit',
    pt: 'bitaqaty',
    lt: 'bitclout',
    ahx: 'bitrue',
    ht: 'bitso',
    ua: 'blablacar',
    akq: 'blank-street',
    fk: 'blibli',
    bz: 'blizzard',
    rw: 'bls-spain',
    qn: 'blued',
    ajr: 'boku',
    tx: 'bolt',
    acp: 'bonuslink.com',
    akg: 'bookmyplay.ro',
    adr: 'boosty',
    aax: 'boyaa',
    abu: 'bpjsketenagakerjaan.go',
    jw: 'br777.co',
    sy: 'choppbrahmaexpress.com',
    vo: 'millets.co',
    aiz: 'brevo',
    ahm: 'bro',
    zt: 'budweiser',
    kh: 'bukalapak',
    mo: 'bumble',
    afc: 'bunda.co',
    ahe: 'bunq',
    ip: 'burger-king',
    adx: 'busy-fly',
    iu: 'bykea',
    abi: 'byteplus',
    adp: 'cabify',
    uo: 'cafebazaar',
    my: 'caixa',
    gw: 'callapp',
    ls: 'careem',
    gj: 'carousell',
    it: 'cashapp',
    oy: 'cashfly',
    ii: 'cashkaro',
    ld: 'cashmine.net',
    alz: 'casinoandfriends',
    pc: 'casino.bet.gambling',
    wd: 'casinoplus.com',
    ho: 'cathaypacific',
    afa: 'cdek-express',
    pq: 'cdkeys',
    ix: 'celcoin',
    ai: 'celebe',
    td: 'hub.chainge',
    akn: 'chakra.rewards',
    gr_rd: 'chalkboard',
    acd: 'checkdomain',
    afk: 'chevron',
    ir: 'chispa-app',
    adv: 'cian',
    si: 'sede.sepe.gob.es',
    az: 'citybase',
    acu: 'citymall',
    yf: 'city-mobile',
    acz: 'claude.ai',
    hf: 'cleartrip',
    fe: 'cliq',
    ael: 'cloud.manager',
    jn: 'cloudbet',
    dd: 'cloudchat',
    et: 'clubhouse',
    agm: 'cmbnigeria',
    ql: 'cmtcuzdan',
    abb: 'coca-cola',
    oe: 'codashop',
    pn: 'coffee-like',
    ajo: 'coffee-tea',
    re: 'coinbase',
    ne: 'coindcx',
    cf_id: 'coinfantasy',
    vw: 'coinfield',
    acg: 'collabact',
    zx: 'communitygaming',
    amn: 'constituteproject',
    jv: 'consulting',
    eg: 'contact-sys',
    om: 'corona',
    aby: 'couponscom',
    yg: 'coursehero',
    wc: 'craigslist',
    ax: 'crefisa.com',
    lu: 'cupid',
    sx: 'crowdtap',
    ti: 'cryptocom',
    aje: 'cupidmedia',
    cp: 'cupid',
    akk: 'dagangan',
    ahi: 'daki',
    ox: 'damejidlo',
    fr: 'dana',
    aju: 'daya-auto',
    tj: 'dbruA',
    oc: 'dealshare',
    zk: 'deliveroo',
    dt: 'delivery-club',
    zz: 'dent',
    xy: 'depop',
    lx: 'dewu-poison',
    os: 'dhani',
    xk: 'didi-taxi',
    zv: 'digikala',

    ake: 'DIKIDI',
    ds: 'Discord',
    ame: 'Discover Hong Kong',
    ud: 'Disney Hotstar',
    dw: 'Divar',
    sd: 'DoDo pizza',
    akl: 'DOKU',
    dz: 'Dominos Pizza',
    ac: 'DoorDash',
    bx: 'Dosi',
    sv: 'Dostavista',
    cj: 'Dotz',
    ak: 'Douyu',
    ve: 'Dream11',
    hz: 'Drom',
    fi: 'Dundle',
    le: 'E bike Gewinnspiel',
    adl: 'EarnEasy',
    akj: 'Easycash',
    rz: 'EasyPay',
    dh: 'Ebay',
    te: 'eFood',
    enu: 'Emenu',
    uf: 'Eneba',
    aek: 'EnerGO',
    ah: 'EscapeFromTarkov',
    yj: 'eWallet',
    ba: 'Expressmoney',
    kr: 'Eyecon',
    db: 'ezbuy',
    rm: 'Faberlic',
    fb: 'Facebook',
    qz: 'Faceit',
    xn: 'Familia',
    lm: 'FarPost',
    mr: 'Fastmail',
    fst: 'fastwin',
    fst2: 'fastwin2',
    se: 'Feeld',
    ait: 'FeetFinder',
    ug: 'Fiqsy',
    adm: 'FitCredit',
    cn: 'Fiverr',
    ahy: 'Fliff',
    agn: 'Flik',
    tv: 'Flink',
    aew: 'Flip',
    xt: 'Flipkart',
    aeg: 'Flowwow',
    iy: 'FoodHub',
    abe: 'Foodora',
    nz: 'Foodpanda',
    kw: 'Foody',
    gu: 'Fora',
    ajg: 'Fortumo',
    xg: 'FortunaSK',
    rk: 'Fotka',
    kq: 'FotoCasa',
    wz: 'FoxFord',
    kg: 'FreeChargeApp',
    gq: 'Freelancer',
    zb: 'FreeNow',
    nj: 'FreshKarta',
    abz: 'Friendtech',
    adh: 'Frizza',
    mv: 'Fruitz',
    ahf: 'Fugeelah',
    full: 'Full rent',
    ng: 'FunPay',
    aih: 'Fups',
    od: 'FWDMAX',
    aja: 'G2A',
    bk: 'G2G',
    ou: 'Gabi',
    xe: 'GalaxyChat',
    af: 'GalaxyWin',
    wn: 'GameArena',
    pa: 'Gamekit',
    ed: 'Gamer',
    afx: 'Gamesofa',
    bc: 'GCash',
    cg: 'Gemgala',
    ajm: 'Gener8',
    ul: 'Getir',
    cz: 'Getmega',
    ajs: 'GetPlus',
    ala: 'GetResponse',
    avz: 'Getsbet',
    gt: 'Gett',
    qe: 'GG',
    nn: 'Giftcloud',
    jd: 'GiraBank',
    nk: 'Gittigidiyor',
    iz: 'Global24',
    gl: 'GlobalTel',
    hm: 'Globus',
    aq: 'Glovo',
    mq: 'GMNG',
    abk: 'GMX',
    ads: 'GoChat',
    aeq: 'Godrej',
    ez: 'GoerliFaucet',
    bp: 'GoFundMe',
    ni: 'Gojek',
    aky: 'GOMOFY',
    gmsg: 'Google Messenger',
    go: 'Google, Gmail, Youtube',
    gf: 'GoogleVoice',
    aeb: 'GoPayz',
    ajn: 'Gopuff',
    amk: 'GORDAN',
    grsrd: 'Gorodsreda',
    abl: 'Gpnbonus',
    jg: 'Grab',
    agd: 'Grailed',
    als: 'Greggs',
    aet: 'Greywoods',
    yw: 'Grindr',
    ln: 'Grofers',
    xs: 'GroupMe',
    akb: 'Gurmanika',
    ik: 'GuruBets',
    gh: 'GyFTR',
    ach: 'Haleon',
    rp: 'hamrahaval',
    sj: 'HandyPick',
    aks: 'Hanya',
    df: 'Happn',
    sp: 'HappyFresh',
    au: 'Haraj',
    agp: 'Hdfcbank',
    gx: 'Hepsiburadacom',
    akp: 'Her',
    en: 'Hermes',
    vx: 'HeyBox',
    ss: 'Hezzl',
    yh: 'Hh',
    rt: 'hily',
    vz: 'Hinge',
    aii: 'Hinge Dating',
    ks: 'Hirect',
    ru: 'HOP',
    jl: 'Hopi',
    gi: 'Hotline',
    kp: 'HQ Trivia',
    un: 'Humble bundle',
    gv: 'Humta',
    pp: 'Huya',
    dq: 'IceCasino',
    iq: 'icq',
    cx: 'Icrypex',
    kk: 'Idealista',
    pd: 'IFood',
    ib: 'Immowelt',
    im: 'IMO messenger',
    iv: 'Inboxlv',
    tp: 'IndiaGold',
    fg: 'IndianOil',
    zq: 'IndiaPlays',
    ajw: 'INDOBA',
    ws: 'Indodax',
    ju: 'Indomaret',
    rl: 'inDriver',
    xi: 'InFund',
    hy: 'Ininal',
    ig: 'Instagram',
    ajf: 'IPanelOnline',
    yv: 'IPLwin',
    agk: 'Ipsos iSay',
    es: 'iQIYI',
    il: 'IQOS',
    cf: 'irancell',
    us: 'IRCTC',
    ad: 'Iti',
    jc: 'IVI',
    dm: 'Iwplay',
    wt: 'IZI',
    ea: 'JamesDelivery',
    za: 'Jingdong',
    aec: 'JinJiang',
    aay: 'JioMart',
    agz: 'Jiva Petani',
    hr: 'JKF',
    ic: 'JoGo',
    xx: 'Joyride',
    yx: 'JTExpress',
    hi: 'JungleeRummy',
    pu: 'Justdating',
    aig: 'K11',
    abx: 'Kaching',
    zo: 'Kaggle',
    kt: 'KakaoTalk',
    aed: 'Kamatera',
    de: 'Karusel',
    jz: 'Kaya',
    ol: 'KazanExpress',
    ajx: 'Kemnaker RI',
    bf: 'Keybase',
    ra: 'KeyPay',
    fz: 'KFC',
    adk: 'Khatabook',
    aid: 'Kia',
    afo: 'KION ',
    uw: 'Kirana',
    afz: 'Klarna',
    ebay_kl: 'Kleinanzeigen',
    kl: 'kolesa.kz',
    pv: 'Koshelek',
    rv: 'Kotak811',
    sq: 'KuCoinPlay',
    kb: 'kufarby',
    vp: 'Kwai',
    er: 'Kwork',
    vq: 'LadyMaria',
    fh: 'Lalamove',
    sb: 'Lamoda',
    dl: 'Lazada',
    bb: 'LazyPay',
    do: 'Leboncoin',
    wq: 'Leboncoin1',
    lrmn: 'LEROY MERLIN',
    pz: 'Lidl',
    oo: 'LigaPro',
    xf: 'LightChath',
    jf: 'Likee',
    me: 'LINE',
    aka: 'LinkAja',
    tn: 'LinkedIn',
    ex: 'Linode',
    alh: 'Lion Parcel',
    eu: 'LiveScore',
    di: 'Loanflix',
    su: 'LOCO',
    mk: 'LongHu',
    akm: 'LOTTE Mart',
    rs: 'Lotus',
    zi: 'LoveLocal',
    oj: 'LoveRu',
    dj: 'LUKOIL-AZS',
    ale: 'Lydia',
    tu: 'Lyft',
    gz: 'LYKA',




    hq: 'Magicbricks',
    ma: 'MailRu',
    oh: 'MapleSEA',
    bm: 'MarketGuru',
    hd: 'MarketPapa',
    agj: 'Marktplaats',
    adg: 'Marwadi',
    ahl: 'Maxim',
    afb: 'Maybank',
    ry: 'McDonalds',
    meex: 'Media express',
    lg: 'MediBuddy',
    hp: 'Meesho',
    qr: 'MEGA',
    lv: 'Megogo',
    agx: 'MeiQFashion',
    agf: 'Meitu',
    acj: 'Meituan',
    uy: 'Meliuz',
    alp: 'Mera Gaon',
    cq: 'Mercado',
    dg: 'Mercari',
    vy: 'Meta',
    bv: 'Metro',
    he: 'Mewt',
    mc: 'MiChat',
    mm: 'Microsoft',
    Miexprs: 'Midia Express',
    mgrs: 'Migros',
    ey: 'miloan',
    op: 'MIRATORG',
    yr: 'Miravia',
    amh: 'MitID',
    bg: 'MIXMART',
    gy: 'MIYACHAT',
    fo: 'MobiKwik',
    wk: 'Mobile01',
    aht: 'MockGuru',
    gm: 'Mocospace',
    hc: 'MOMO',
    py: 'Monese',
    xp: 'MonetaRu',
    qo: 'Moneylion',
    qg: 'MoneyPay',
    amt: 'Moneyview',
    qt: 'MoneyСontrol',
    ji: 'Monobank',
    bu: 'MonobankIndia',
    ce: 'mosru',
    ajz: 'MotionPay',
    vr: 'MotorkuX',
    aix: 'Move It',
    xq: 'MPL',
    lw: 'MrGreen',
    ej: 'MrQ',
    age: 'MTR Mobile',
    da: 'MTS Cashback',
    alm: 'Muzz',
    tk: 'MVideo',
    ha: 'My11Circle',
    afm: 'Myboost',
    mcr: 'MYCAR.KZ',
    ur: 'MyDailyCash',
    qa: 'MyFishka',
    ae: 'MyGLO',
    iw: 'MyLavash',
    fy: 'Mylove',
    mu: 'MyMusicTaste',
    nl: 'Myntra',
    ajq: 'MyValue',
    jm: 'mzadqatar',
    nmkz: 'Naimi.kz',
    abn: 'Namars',
    je: 'Nanovest',
    nv: 'Naver',
    sw: 'NCsoft',
    rn: 'neftm',
    aft: 'Neocrypto',
    aex: 'Neon',
    aij: 'NEQUI',
    aaq: 'Netease',
    nf: 'Netflix',
    ef: 'Nextdoor',
    ald: 'Nice88',
    px: 'Nifty',
    ew: 'Nike',
    kz: 'NimoTV',
    agi: 'Njuškalo',
    aiy: 'Nloto',
    dv: 'NoBroker',
    tf: 'Noon',
    xo: 'Notifire',
    ms: 'NovaPoshta',
    pg: 'NRJ Music Awards',
    zy: 'Nttgame',
    alx: 'NutriClub',
    zm: 'OfferUp',
    uz: 'OffGamers',
    vm: 'Okcupid',
    og: 'Okko',
    lr: 'Okta',
    ly: 'Olacabs',
    ns: 'Oldubil',
    akf: 'Ollis',
    sn: 'OLX',
    aep: 'ONBUKA',
    aj: 'OneAset',
    agg: 'OneForma',
    ue: 'Onet',
    ob: 'Onlinerby',
    zf: 'OnTaxi',
    dr: 'OpenAI (ChatGPT)',
    ob_uz: 'OpenBudjet',
    ahd: 'OpenPhone',
    lo: 'OPPO',
    qh: 'Oriflame',
    xh: "Ovo",
    aaz: "Ozan",
    sg: "Ozon",
    afw: "Packeta",
    cw: "PaddyPower",
    gg: "PagSmile",
    dk: "Pairs",
    zr: "Papara",
    wo: "Parkplus",
    dn: "Paxful",
    qb: "Payberry",
    akc: "Paybis",
    xz: "paycell",
    nc: "Payoneer",
    ts: "PayPal",
    jq: "Paysafecard",
    tr: "Paysend",
    ge: "Paytm",
    yp: "Payzapp",
    pcp: "Pcipay",
    at: "Perfluence",
    fx: "Pgbonus",
    fc: "PharmEasy",
    fp: "Phound",
    ev: "Picpay",
    zp: "Pinduoduo",
    ro: "PingCode",
    jh: "PingPong",
    sz: "Pivko24",
    ahp: "PizzaHut",
    aer: "PlayerAuctions",
    abs: "Playerzpot",
    adc: "PlayOJO",
    pf: "Plenty of Fish",
    ch: "Pocket52",
    aag: "Pockit",
    pj: "Podeli",
    rg: "Porbet",
    oz: "Poshmark",
    adb: "PoshVine",
    lq: "Potato",
    fj: "Potato Chat",
    dx: "Powerkredite",
    aio: "Prakerja",
    po: "premium.one",
    akh: "Prenagen Club",
    aiq: "Prime Opinion",
    wu: "PrivetMir",
    abr: "Privy",
    aa: "Probo",
    alo: "Profee",
    cm: "Prom",
    dp: "Protonmail",
    aga: "Publi24",
    amm: "Punjab citizen",
    lk: "PurePlatfrom",
    ny: "Pyro Music",
    ppl: "PYYPL",
    vf: "Q12 Trivia",
    eq: "Qoo10",
    zw: "Quack",
    cc: "Quipp",
    acr: "QwikCilver",
    acn: "Radium",
    rktn: "Rakuten",
    tc: "Rambler",
    aba: "Rappi",
    acm: "Razer",
    jp: "Rbt",
    ajj: "Rebtel",
    xu: "RecargaPay",
    qf: "RedBook",
    ci: "redBus",
    co: "Rediffmail",
    aen: "Redigame",
    ow: "Regru",
    aln: "Remotasks",
    ij: "Revolut",
    zj: "ROBINHOOD",
    aau: "RockeTreach",
    afn: "Roomster",
    ga: "Roposo",
    qm: "RosaKhutor",
    aif: "Royal Canin",
    ku: "RoyalWin",
    km: "Rozetka",
    mn: "RRSA",
    adj: "RummyCircle",
    ec: "RummyCulture",
    fl: "RummyLoot",
    xb: "RummyOla",
    so: "RummyWealth",
    kv: "Rush",
    ay: "Ruten",
    ui: "RuTube",
    ako: "Ryde",
    gs: "SamsungShop",
    lj: "Santander",
    satu_kz: "Satu",
    amg: "SBI Card",
    ais: "Schibsted",
    ahq: "SEEDS",
    alt: "Segari",
    pw: "SellMonitor",
    vv: "seosprint",
    ago: "Servify",
    zg: "Setel",
    adu: "seznam",
    ajv: "share.party",
    rx: "Sheerid",
    aez: "Shein",
    vg: "shell.box",
    ka: "Shopee",
    ze: "Shpock",
    sbw: "siberianwellness",
    bw: "signal",
    fs: "sikayetvar",
    np: "Siply",
    eo: "Sizeer",
    afj: "sk.capital",
    wg: "Skout",
    sk: "skroutz",
    rc: "Skype",
    pb: "SkyTV",
    amd: "Smart",
    ado: "SmartyPig",
    agb: "Smiles",
    fu: "Snapchat",
    ph: "snappfood",
    sf: "SneakersnStuff",
    ia: "Socios",
    abw: "sokolov",
    snl: "Sonol",
    akx: "sonyliv",
    jy: "Sorare",
    mx: "SoulApp",
    ain: "spaceweb",
    acb: "Spark Driver",
    ky: "SpatenOktoberfest",

    va: "SportGully",
    cd: "SpotHit",
    alj: "Spotify",
    nt: "Sravni",
    la: "ssoidnet",
    sr: "Starbucks",
    mt: "steampowered",
    jo: "SticPay",
    ali: "StockyDodo",
    hj: "stoloto",
    vj: "Stormgain",
    ahj: "Strato",
    nu: "Stripe",
    aiv: "Striving in the Lion City",
    lc: "subito",
    aca: "Sunlight",
    acq: "Suntec ",
    ane: "Supercell",
    ca: "SuperS",
    ahv: "Surveybell",
    gd: "Surveytime",
    jx: "Swiggy",
    hg: "Switips",
    tq: "Swvl",
    xc: "SynotTip",
    aw: "Taikang",
    xw: "Taki",
    ei: "Taksheel",
    aat: "TamTam",
    xr: "Tango",
    aei: "Tanoti",
    wh: "TanTan",
    qd: "Taobao",
    abc: "taptapsend",
    acs: "tatacliq.com",
    ace: "Tata Neu",
    uc: "tatneft",
    ami: "TEAMORU",
    ih: "TeenPattiStarpro",
    tg: "Telegram",
    eh: "telegram",
    ep: "Temu",
    qq: "qq",
    cr: "TenChat",
    aeu: "TheFork",
    lz: "things",
    ahr: "This Fate",
    nm: "Thisshop",
    rb: "Tick",
    gp: "Ticketmaster",
    alv: "tier",
    aki: "tiket",
    lf: "Tiktok",
    gr_tl: "Tilda",
    oi: "Tinder",
    aap: "Tiptapp",
    air: "tip.tip",
    acl: "Tiv",
    xd: "Tokopedia",
    ack: "Tomato",
    uq: "topdetal",
    nr: "Tosla",
    fm: "Touchance",
    bs: "TradeUP",
    gc: "TradingView",
    mw: "Transfergo",
    pr: "Trendyol",
    nq: "Trip",
    tl: "Truecaller",
    ada: "truthsocial",
    jt: "TurkiyePetrolleri",
    afy: "Tuul",
    ee: "Twilio",
    hb: "Twitch",
    tw: "Twitter",
    aho: "UangMe",
    ub: "Uber",
    ahb: "Ubisoft",
    // eslint-disable-next-line no-dupe-keys
    cp: "Uklon",
    hu: "ukr",
    ubr_gr: "universalbeijingresort",
    hh: "Uplay",
    abq: "Upwork",
    agt: "Uralairlines",
    of: "Urent",
    bh: "uteka",
    ao: "uu.163",
    cl: "UWIN",
    adq: "Uzum",
    anc: "VARUS",
    yy: "Venmo",
    ajk: "Venteny",
    amb: "Vercel",
    kn: "Verse",
    afp: "vfsglobal",
    vi: "Viber",
    alw: "Vida",
    fv: "Vidio",
    agc: "VIMpay",
    kc: "Vinted",
    no: "Virgo",
    kx: "Vivo",
    vk: "vk",
    oq: "Vlife",
    sc: "Voggt",
    akr: "Voi",
    eb: "voltz",
    afl: "vsesmart",
    wr: "Walmart",
    cv: "wash.xpress",
    ajh: "WAUG",
    abo: "webde",
    wb: "WeChat",
    kf: "Weibo",
    mf: "Weidian",
    th: "west",
    ja: "weverse",
    wa: "WhatsApp",
    qj: "Whoosh",
    uu: "Wildberries",
    adt: "willhaben",
    akw: "wind",
    jb: "wingmoney",
    ta: "Wink",
    mp: "Winmasters",
    acf: "winter.loan",
    vs: "winzo.game",
    bo: "Wise",
    xv: "Wish",
    xl: "Wmaraci",
    rr: "Wolt",
    wmpl: "Womply",
    ar: "wondermart",
    ama: "WooPlus",
    qx: "WorldRemit",
    bd: "x5retail.group",
    fa: "xadrez.feliz",
    aml: "Xbox",
    yu: "Xiaomi",
    nw: "Ximalaya",
    akt: "Xworldwallet",
    aas: "xx.game",
    vn: "Yaay",
    mb: "Yahoo",
    yl: "Yalla",
    wy: "Yami",
    ya: "Yandex",
    wf: "yandex.go",
    kj: "YAPPY",
    ylww: "Yellow",
    yi: "Yemeksepeti",
    dc: "YikYak",
    YoHo: "YoHo",
    agr: "Yonogames",
    acw: "YouDo",
    wl: "YouGotaGift",
    gb: "YouStar",
    sm: "YoWin",
    uh: "Yubo",
    yudafr: "yuda",
    adn: "zachbryan",
    ye: "zaleycash",
    mj: "zalo",
    ahw: "zasilkovna",
    ys: "zCity",
    ps: "zdorov",
    em: "zéDelivery",
    adi: "zepto",
    qy: "zhihu",
    tt: "ziglu",
    zd: "zilch",
    zh: "zoho",
    mz: "Zolushka",
    dy: "zomato",
    mi: "zupee",
    aik: "zuscoffee",
    aeh: "apteka.aprel",
    mh: "Ашан",
    st: "Ашан",
    ajb: "berizaryad",
    ahk: "БлинБери",
    ft: "bookmakers",
    aef: "velobike",
    nb: "Верный",
    bj: "vitaexpress",
    sh: "vkusvill",
    br: "vkusnoitochka",
    afu: "ВсеИнструменты",
    js: "golos",
    ajt: "Город",
    rj: "Детский мир",
    afv: "Джилекс",
    ux: "Домовой",
    we: "drugvokrug",
    io: "zdravcity",
    aes: "zolotoe-yabloko",
    yb: "kvartplata",
    fq: "kontur",
    vb: "korablik",
    ahz: "kuzbass-online",
    ct: "КухняНаРайоне",
    tz: "leika",
    rd: "lenta",
    xm: "Лэтуаль",
    mg: "magnit",
    up: "magnolia",
    qp: "maksavit",
    aji: "МИГРАНТ СЕРВИС",
    qs: "ok",
    ok: "ok",
    ty: "Окей",
    yz: "Около",
    vl: "orteka",
    pl: "perekrestok",
    ajc: "pochta",
    qc: "Праймериз 2020",
    adw: "profi",
    ahn: "Рив Гош",
    cy: "rsa",
    uj: "СhampionСasino",
    jr: "samokat",
    sl: "СберАптека",
    xj: "sbermarket",
    be: "СберМегаМаркет",
    gr_sber: "СберЧаевые",
    yk: "sportmaster",
    sshimke: "СушиMake",
    aiw: "СушиВёсла",
    Tksf: "Таксовичкоф",
    ady: "tokyo-city",
    xa: "УлыбкаРадуги",
    abm: "utkonos",
    yq: "foxtrot",
    aie: "fotostrana",
    adz: "shokola",
    vh: "Штолле",
    ke: "eldorado",
    ut: "eldorado",
    bi: "ys4fun",
    hrnjie: "huarenjie",
    cu: "mihuashi",
    yd: "mihuashi"

  };

  const serviceDomainMap = {
    aie: 'ru', // Explicitly specify that 'fotostrana' should use .ru

    we: "ru",
    ja: "io",

    gk: 'ru',
    io: "ru",
    js: "ru",

    cb: 'cz',
    alu: 'game',
    aes: "ru",
    ahz: "ru",
    xj: "ru",

    aha: 'in',
    pl: "ru",
    yb: "ru",
    akw: "ru",
    adw: "ru",

    ajb: "ru",
    ar: "ru",

    afl: "ru",
    bj: "ru",
    sh: "ru",
    fq: "ru",

    sk: "gr",
    hj: "ru",

    vb: "ru",
    bw: "org",
    uc: "ru",
    qp: "ru",
    aas: "ru",
    vv: "net",

    afc: 'id',

    uo: 'ir',
    wd: 'ph',
    lc: "it",
    uq: "ru",
    bh: "ru",
    ajc: "ru",

    adu: "cz",

    kd: 'ru',
    eh: "org",
    fa: "ru",

    ko: 'id',
    agh: 'ch',
    ain: "ru",


    aly: 'id',
    abd: 'ch',
    zn: 'pl',
    zu: 'th',
    bl: 'th',
    ri: 'org',
    uv: 'tech',


    acp: 'my',

    abu: 'id',
    jw: 'net',
    aiz: 'co',

    sy: 'br',
    vo: 'uk',

    abo: "de",

    agq: 'in',

    yn: 'pl',
    eb: "de",

    aeo: 'id',
    br: "ru",
    yo: 'vc',
    adt: "at",
    jr: "ru",
    lz: "app",

    ai: 'io',

    td: 'finance',

    gr_rd: 'io',
    acd: 'net',
    adv: 'co',

    amn: 'org',

    ax: 'br',

    acu: 'live',

    yf: 'ru',
    acz: 'co',

    cf_id: 'io',
    ael: 'io',

    zx: 'io',
    lp: 'it',
    alv: "app",
    hu: "net",

    aej: 'vn',
    avt: 'kz',

    du: 'in',
    abt: 'net',
    ph: "net",
    abw: "ru"
    // Add more services here if necessary
  };

  const getServiceLogoUrl = (serviceCode) => {
    if (!serviceCode) return ''; // Return empty if service code is missing

    // Debugging: Check the serviceCode and serviceLogoMap
    console.log("Service Code:", serviceCode);
    console.log("Service Logo Map:", serviceLogoMap);


    // Get the mapped logo filename from serviceLogoMap
    const logoFilename = serviceLogoMap[serviceCode.toLowerCase()];

    // Debugging: Check the logo filename after mapping
    console.log("Mapped Logo Filename:", logoFilename);

    if (!logoFilename) return ''; // Return empty if no logo is found for the code

    // Determine the domain type based on the serviceDomainMap or default to 'com'
    const domainType = serviceDomainMap[serviceCode.toLowerCase()] || 'com';

    // Construct the URL with the mapped filename
    return `https://logo.clearbit.com/${logoFilename}.${domainType}`;
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

      // Ensure both selectedName and selectedService are selected
      if (!selectedName || !selectedService) {
        alert("Please select both a country and a service before proceeding.");
        showPrice = false; // Hide price
        return;
      }

      showPrice = true; // Show the price if both are selected

      // Toggle the price display based on the showPrice flag
      const priceElement = document.getElementById("price");
      if (showPrice) {
        priceElement.style.display = "block"; // Show price
      } else {
        priceElement.style.display = "none"; // Hide price
      }

      const token = JSON.parse(localStorage.getItem('loginResponse'))?.token;

      // Prepare API request options
      const options = {
        method: 'POST',
        url: 'https://otpninja.com/api/v1/buynumber',
        headers: {
          'X-OTPNINJA-TOKEN': token
        },
        data: {
          countrycode: selectedName,
          serviceid: selectedService,
          type: 'otp',

          mode: 'live'
        }
      };

      // Make the API request
      const response = await axios.request(options);

      // Handle the response
      // eslint-disable-next-line no-shadow
      const { number, message, service, nid } = response.data;

      if (response.data.message === 'Invalid service') {
        console.log(response.data.message)
        // Handle undefined number scenario
        setResponseText("Service not available for this number.");
        setShowModal(true);

        setTimeout(() => {
          setResponseText("Service not available for this number.");
        }, 108000); // 3 hours
      } else if (response.data.message === 'Insufficient balance') {
        console.log(response.data)
        // Handle insufficient balance scenario
        setResponseText("Insufficient balance.");
        setShowModal(true);

        setTimeout(() => {
          setResponseText("Insufficient balance.");
        }, 108000); // 3 hours
      } else if (message === 'Invalid service') {
        // Handle invalid service scenario
        setResponseText("Invalid service.");
        setShowModal(true);

        setTimeout(() => {
          setResponseText("Invalid service.");
        }, 10800000); // 3 hours
      } else {
        // Handle success case
        setPurchasedNid(nid);
        setResponseData(response.data);
        setLoading(true);

        setTimeout(() => {
          setLoading(false);
        }, 10000); // Simulate a 10-second delay

        setResponseText('waiting...');
        setSubPhone(`${number}`);

        // Show OTP refresh message after 30 seconds
        setTimeout(() => {
          setResponseText('OTP refreshes after 30 seconds. Please be patient.');

          // Keep the message for 5 more seconds
          setTimeout(() => {
            setResponseText('OTP refreshes after 30 seconds. Please be patient.');
          }, 5 * 1000); // 5 seconds delay
        }, 20 * 1000); // 20 seconds delay


        // Set dynamic subtitle and title based on the service
        setSubtitleText(`🔽 Waiting to receive an SMS from ${service}. Please note that services may take multiple attempts to succeed.`);
        setTitle(`${service} SMS Verifications`);
        setResponseText('OTP refreshes after 30 seconds. Please be patient.');
        setCancelM('');
        setShowModal(true); // Show modal
      }



    } catch (error) {
      console.error('Purchase error:', error); // Log the error for debugging
      setResponseText('Purchase failed. Please try again.');
      setModalType('yellow');
      setShowModal(true); // Show error modal
    } finally {
      // Close modal after processing (optional)
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


      // eslint-disable-next-line no-shadow
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



  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    const token = JSON.parse(localStorage.getItem('loginResponse'))?.token;
    let intervalId;

    const fetchPayments = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://otpninja.com/api/v1/listmessages?type=otp',
          headers: {
            'X-OTPNINJA-TOKEN': token,
          },
        };
        const response = await axios.request(options);

        // Sort and process the response data
        const sortedData = response.data.data.length === 0
          ? [{
            "name": "OTP Ninja Inc",
            "number": "Please Purchase a service",
            "message": "default modal",
            "otp": "...",
            "sender": "Provider",
            "receiver": "14784616249",
            "messagedate": new Date().toISOString() // current date and time
          }]
          : response.data.data.sort((a, b) => new Date(b.messagedate) - new Date(a.messagedate));

        setPayments(sortedData);

        // Update message state if it's different
        if (sortedData.length > 0) {
          const latestMessage = sortedData[0]?.message;
          if (latestMessage !== previousMessageRef.current) {
            setMessage(latestMessage);
            previousMessageRef.current = latestMessage; // Update ref to the latest message
            setNoNewMessagesCount(0); // Reset count for new message
          } else {
            // Increment the count for identical messages
            setNoNewMessagesCount((count) => count + 1);
          }
        }
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    // Initial fetch
    fetchPayments();


    // Polling mechanism only when modal is open
    if (showModal) {
      intervalId = setInterval(() => {
        fetchPayments();
      }, 15000); // 30 seconds
    }

    // WebSocket logic
    const wsendpointBase = 'wss://otpninja.com/inbox/';
    if (token) {
      const wsendpoint = `${wsendpointBase}${token}/`;
      const socket = new WebSocket(wsendpoint);

      console.log('WebSocket connection initiated', wsendpoint);

      socket.onopen = () => {
        console.log('WebSocket connection opened');
        setResponseText('Connected. Waiting for new messages...');
      };

      socket.onmessage = (event) => {
        console.log('WebSocket message received:', event.data);
        const data = JSON.parse(event.data);
        const sortedData = data.data?.sort((a, b) => new Date(b.messagedate) - new Date(a.messagedate));

        if (sortedData && sortedData.length > 0) {
          setPayments((prevPayments) => {
            const mergedData = [...prevPayments, ...sortedData].filter(
              (v, i, a) => a.findIndex((t) => t.reference === v.reference) === i
            );
            return mergedData.sort((a, b) => new Date(b.messagedate) - new Date(a.messagedate));
          });


          const latestMessage = sortedData[0]?.message;
          if (latestMessage !== previousMessageRef.current) {
            setMessage(latestMessage);
            previousMessageRef.current = latestMessage;
            setNoNewMessagesCount(0); // Reset count for new message
            setResponseText('Connected. Waiting for new messages...'); // Update response text for new message
          } else {
            // Set response text to be displayed multiple times
            const repeatedResponseText = 'Connected. Waiting for new messages... '.repeat(1); // Repeat 3 times
            setResponseText(repeatedResponseText);
          }
        } else {
          setResponseText('Waiting to recieve Otp......');
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        setResponseText('WebSocket encountered an error.');
      };

      socket.onclose = () => {
        console.log('WebSocket connection closed');
        setResponseText(`'Otp.. ${message}`);
      };

      return () => {
        clearInterval(intervalId);
        socket.close();
      };
    }
  }, [message, showModal]); // Run effect when showModal changes


  // Memoized effect for setting response text based on message count
  React.useEffect(() => {
    if (message) {
      if (noNewMessagesCount < 3) {
        setResponseText(`OTP... ${message}`);
      } else {
        setResponseText('Refreshes after 30 seconds Please be patient...');
      }
    }
  }, [message, noNewMessagesCount]);

  console.log(message);


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

      number: payment.number || subphone, // Add `subphone` if `payment.number` is missing
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
  const paginatedRows = rows
    .slice()                   // Create a shallow copy of the rows
    .reverse()                 // Reverse the entire dataset
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);  // Paginate after reversing

  const isDesktop = useMediaQuery('(min-width:600px)');


  console.log(subphone);


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
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                              src={getServiceLogoUrl(service.code)}
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
          <Table sx={{ minWidth: 10 }} aria-label="customized table">
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