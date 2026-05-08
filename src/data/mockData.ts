export interface Reward {
  id: string;
  brand: string;
  title: string;
  description: string;
  discount: string;
  channels: string[];
  expiry: string;
  lastChance?: boolean; // Shown when claims near budget threshold (from balance API)
  // Razorpay API fields
  rewardType: 'gift_card' | 'membership' | 'offer';
  cardValue?: number; // in INR, pre-configured by Spotify/Razorpay at program level
  interval?: 'Monthly' | 'Quarterly' | 'Annual'; // only for membership
  offerHasCode?: boolean; // only for offer type
  redemptionUrl?: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'full';
  eventType: 'meet_greet' | 'curated' | 'third_party';
  registrationType: 'competition' | 'fcfs'; // competition = questions, fcfs = one-click
  date: string;
  time: string;
  doorsOpen: string;
  duration: string;
  venue: string;
  address: string;
  city: string;
  mapUrl: string;
  accessNotes?: string;
  parking?: string;
  dressCode?: string;
  whatToBring: string[];
  included?: string[];
  notAllowed?: string[];
  contactWhatsApp?: string;
  spotsLeft?: number;
  totalSpots?: number;
  cancellationDeadline?: string; // e.g. "11 June 2025, 6:00 PM" — after this, no cancellations
}

export const rewards: Reward[] = [
  {
    id: 'r1',
    brand: 'Myntra',
    title: '20% off sitewide',
    description: 'Get 20% off on all fashion, beauty, and lifestyle products on Myntra. Valid on orders above Rs.999. One use per account.',
    discount: '20% off',
    channels: ['Online'],
    expiry: '30 Aug 2025',
    rewardType: 'offer',
    offerHasCode: true,
    redemptionUrl: 'https://www.myntra.com',
  },
  {
    id: 'r2',
    brand: 'Zepto',
    title: 'Rs.150 off groceries',
    description: 'Save Rs.150 on your next Zepto grocery order of Rs.599 or more. Delivered in minutes.',
    discount: 'Rs.150 off',
    channels: ['Online'],
    expiry: '15 Jul 2025',
    lastChance: true,
    rewardType: 'offer',
    offerHasCode: true,
    redemptionUrl: 'https://www.zeptonow.com',
  },
  {
    id: 'r3',
    brand: 'Nykaa',
    title: '15% off beauty and skincare',
    description: 'Get 15% off on all beauty and skincare products at Nykaa. Valid online and in-store.',
    discount: '15% off',
    channels: ['Online', 'In-store'],
    expiry: '1 Jun 2025',
    lastChance: true,
    rewardType: 'offer',
    offerHasCode: true,
    redemptionUrl: 'https://www.nykaa.com',
  },
  {
    id: 'r4',
    brand: 'Swiggy',
    title: 'Rs.100 off food delivery',
    description: 'Flat Rs.100 off on food delivery orders above Rs.399. Valid on all restaurants.',
    discount: 'Rs.100 off',
    channels: ['Online'],
    expiry: '15 Apr 2025',
    rewardType: 'offer',
    offerHasCode: false,
    redemptionUrl: 'https://www.swiggy.com',
  },
  {
    id: 'r5',
    brand: 'Lifestyle',
    title: 'Rs.500 gift card',
    description: 'Lifestyle gift card redeemable at Lifestyle, Home Centre, and select Max stores across India.',
    discount: '5% bonus',
    channels: ['Online', 'In-store'],
    expiry: '31 Jul 2025',
    rewardType: 'gift_card',
    cardValue: 500,
    redemptionUrl: 'https://www.lifestylestores.com',
  },
  {
    id: 'r6',
    brand: 'Cult.fit',
    title: '1 month free membership',
    description: 'Get a full month of Cult.fit membership free. Access gym, yoga, and group classes at any centre.',
    discount: 'Free month',
    channels: ['Online', 'In-store'],
    expiry: '30 Sep 2025',
    rewardType: 'membership',
    interval: 'Monthly',
  },
  {
    id: 'r7',
    brand: 'Uber',
    title: '3 free rides up to Rs.200 each',
    description: 'Get 3 free Uber rides, each worth up to Rs.200. Valid in all cities.',
    discount: '3 free rides',
    channels: ['Online'],
    expiry: '31 Oct 2025',
    rewardType: 'offer',
    offerHasCode: true,
    redemptionUrl: 'https://www.uber.com',
  },
];

export const events: Event[] = [
  {
    id: 'e1',
    name: 'Arijit Singh meet and greet',
    description: 'An exclusive backstage experience with Arijit Singh before his Mumbai concert. Limited to 20 Premium members. Includes photo opportunity, signed poster, and 15 minutes of conversation in an intimate setting.',
    status: 'active',
    eventType: 'meet_greet',
    registrationType: 'competition',
    date: 'Saturday, 14 June 2025',
    time: '6:00 PM IST',
    doorsOpen: '5:30 PM',
    duration: '45 minutes',
    venue: 'NSCI Dome',
    address: 'NSCI SVP Stadium, Lala Lajpatrai Marg, Haji Ali, Worli, Mumbai 400018',
    city: 'Mumbai',
    mapUrl: 'https://maps.google.com/?q=NSCI+Dome+Mumbai',
    accessNotes: 'Enter via Gate 3 (artist entrance) on the Haji Ali side. Show your confirmation email and government-issued photo ID at the security desk. You will be escorted backstage.',
    parking: 'Limited parking available at NSCI basement (entry from Lala Lajpatrai Marg). Rs.100/hour. We recommend using a cab.',
    whatToBring: ['Government-issued photo ID (Aadhaar, PAN, or Passport)', 'Confirmation email (printed or on phone)', 'Your phone for photos'],
    included: ['Photo opportunity with Arijit Singh', 'Signed poster', 'Complimentary beverages', 'Priority entry to the main concert after'],
    notAllowed: ['Professional cameras or recording equipment', 'Bags larger than A4 size', 'Outside food or beverages'],
    contactWhatsApp: '+91 98200 12345',
    spotsLeft: 20,
    totalSpots: 20,
    cancellationDeadline: '12 June 2025, 6:00 PM IST',
  },
  {
    id: 'e2',
    name: 'Prateek Kuhad live - early access tickets',
    description: 'Get your tickets 48 hours before general sale. Premium members get first pick of seats. Intimate acoustic set in a 200-capacity venue.',
    status: 'active',
    eventType: 'curated',
    registrationType: 'fcfs',
    date: 'Saturday, 28 June 2025',
    time: '8:00 PM IST',
    doorsOpen: '7:00 PM',
    duration: '2 hours (approx.)',
    venue: 'Phoenix Marketcity - The Arena',
    address: 'Phoenix Marketcity, Whitefield Main Road, Mahadevapura, Bangalore 560048',
    city: 'Bangalore',
    mapUrl: 'https://maps.google.com/?q=Phoenix+Marketcity+Bangalore',
    accessNotes: 'Enter through the main mall entrance (Ground Floor, North Wing). Follow signs to The Arena on Level 3. Elevator access available.',
    parking: 'Free parking at Phoenix Marketcity basement (B1 and B2 levels). Entry from Whitefield Main Road.',
    whatToBring: ['Government-issued photo ID', 'Confirmation email or QR code', 'Comfortable shoes (standing event)'],
    included: ['Entry to acoustic set', 'One complimentary drink', 'Exclusive Spotify x Prateek Kuhad tote bag'],
    notAllowed: ['Professional cameras', 'Laptops or tablets', 'Outside food or beverages'],
    contactWhatsApp: '+91 98450 67890',
    spotsLeft: 84,
    totalSpots: 200,
    cancellationDeadline: '27 June 2025, 12:00 PM IST',
  },
  {
    id: 'e3',
    name: 'AP Dhillon listening party',
    description: 'Be the first to hear AP Dhillon\'s unreleased album in an intimate rooftop setting. Drinks and canapes included. Strictly limited capacity.',
    status: 'active',
    eventType: 'curated',
    registrationType: 'competition',
    date: 'Saturday, 5 July 2025',
    time: '9:00 PM IST',
    doorsOpen: '8:30 PM',
    duration: '3 hours',
    venue: 'Soho House Mumbai - Rooftop',
    address: 'Soho House, 16th Floor, Aman Chambers, Juhu Tara Road, Juhu, Mumbai 400049',
    city: 'Mumbai',
    mapUrl: 'https://maps.google.com/?q=Soho+House+Mumbai',
    accessNotes: 'Enter the building lobby and take the dedicated Soho House elevator to the 16th floor. Give your name at reception -- you do NOT need a Soho House membership for this event.',
    parking: 'Valet parking available at building entrance (Rs.200). Street parking on Juhu Tara Road is limited after 8 PM.',
    dressCode: 'Smart casual. No sportswear, flip-flops, or shorts.',
    whatToBring: ['Government-issued photo ID', 'Confirmation email', 'Dress code compliance'],
    included: ['Unlimited drinks (beer, wine, cocktails)', 'Canapes and light bites', 'First listen of unreleased album', 'Exclusive merch drop access'],
    notAllowed: ['Recording devices', 'Sharing audio/video on social media (NDA signed on entry)', 'Plus-ones (invite is non-transferable)'],
    contactWhatsApp: '+91 98765 11111',
    spotsLeft: 3,
    totalSpots: 50,
  },
  {
    id: 'e4',
    name: 'Diljit Dosanjh concert - VIP upgrade',
    description: 'Win a VIP upgrade for Diljit\'s Dil-Luminati tour. Front row seats, backstage pass, and signed merch. 10 winners selected.',
    status: 'full',
    eventType: 'third_party',
    registrationType: 'competition',
    date: 'Sunday, 20 July 2025',
    time: '7:00 PM IST',
    doorsOpen: '5:00 PM',
    duration: '4 hours',
    venue: 'JLN Stadium',
    address: 'Jawaharlal Nehru Stadium, Lodhi Road, Pragati Vihar, New Delhi 110003',
    city: 'Delhi',
    mapUrl: 'https://maps.google.com/?q=JLN+Stadium+Delhi',
    accessNotes: 'VIP entrance is Gate 14 (south side, facing Lodhi Road). Regular ticket holders use Gates 1-6. Arrive early -- security screening takes 20-30 minutes.',
    parking: 'No on-site parking for this event. Nearest metro: JLN Stadium (Violet Line). Drop-off zone on Lodhi Road.',
    whatToBring: ['Government-issued photo ID', 'Original concert ticket (digital or printed)', 'VIP confirmation from Rewards Club'],
    included: ['Front row seats (Row A)', 'Backstage pass (post-show)', 'Signed merch package', 'Complimentary food and drinks in VIP lounge'],
    notAllowed: ['Professional cameras', 'Drones', 'Glass bottles', 'Weapons of any kind'],
    contactWhatsApp: '+91 99100 22222',
    spotsLeft: 0,
    totalSpots: 10,
  },
];

// Aliased exports for screen imports
export const mockRewards = rewards;
export const mockEvents = events;
