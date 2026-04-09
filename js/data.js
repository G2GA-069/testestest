// ============================================================
// Uplift — Mock Data
// ============================================================

export const CATEGORIES = {
  education:   { id: 'education',   name: 'Education',   color: '#4A9EFF', icon: 'graduation-cap', emoji: '\uD83C\uDF93' },
  environment: { id: 'environment', name: 'Environment', color: '#4ADF8A', icon: 'leaf',           emoji: '\uD83C\uDF31' },
  health:      { id: 'health',      name: 'Health',      color: '#FF6B9D', icon: 'heart-pulse',    emoji: '\u2764\uFE0F' },
  community:   { id: 'community',   name: 'Community',   color: '#FFB84A', icon: 'hands',          emoji: '\uD83E\uDD1D' },
  innovation:  { id: 'innovation',  name: 'Innovation',  color: '#A855F7', icon: 'lightbulb',      emoji: '\uD83D\uDCA1' },
  kindness:    { id: 'kindness',    name: 'Kindness',    color: '#F59E0B', icon: 'sparkle',        emoji: '\u2728' },
};

export const CREATORS = [
  { id: 'c1',  username: 'ocean_guardian',    displayName: 'Ocean Guardian',    avatar: null, bio: 'Marine biologist on a mission to save our oceans, one beach at a time.', followers: 124000, following: 89,  impactScore: 4.9, color: '#4ADF8A' },
  { id: 'c2',  username: 'teach_the_future',  displayName: 'Teach The Future',  avatar: null, bio: 'Making complex science simple. MIT grad turned educator.',              followers: 892000, following: 234, impactScore: 4.8, color: '#4A9EFF' },
  { id: 'c3',  username: 'mindful_maya',      displayName: 'Mindful Maya',      avatar: null, bio: 'Therapist sharing daily mental health tips that actually work.',          followers: 445000, following: 156, impactScore: 4.7, color: '#FF6B9D' },
  { id: 'c4',  username: 'community_carlos',  displayName: 'Carlos Builds',     avatar: null, bio: 'Building community gardens and connections in urban neighborhoods.',     followers: 67000,  following: 312, impactScore: 4.6, color: '#FFB84A' },
  { id: 'c5',  username: 'solar_sarah',       displayName: 'Solar Sarah',       avatar: null, bio: 'Engineer making clean energy accessible to everyone.',                   followers: 234000, following: 178, impactScore: 4.8, color: '#A855F7' },
  { id: 'c6',  username: 'kindness_kai',      displayName: 'Kindness Kai',      avatar: null, bio: 'Documenting random acts of kindness around the world.',                  followers: 567000, following: 445, impactScore: 4.9, color: '#F59E0B' },
  { id: 'c7',  username: 'dr_nutrition',      displayName: 'Dr. Nutrition',     avatar: null, bio: 'Board-certified nutritionist. Evidence-based health advice.',             followers: 345000, following: 90,  impactScore: 4.5, color: '#FF6B9D' },
  { id: 'c8',  username: 'code_for_good',     displayName: 'Code For Good',     avatar: null, bio: 'Open-source developer building tools for nonprofits.',                   followers: 189000, following: 267, impactScore: 4.7, color: '#A855F7' },
  { id: 'c9',  username: 'forest_ranger_dan', displayName: 'Ranger Dan',        avatar: null, bio: 'National park ranger sharing the wonders of our forests.',                followers: 298000, following: 134, impactScore: 4.8, color: '#4ADF8A' },
  { id: 'c10', username: 'literacy_linda',    displayName: 'Literacy Linda',    avatar: null, bio: 'Former teacher running free reading programs for kids worldwide.',        followers: 156000, following: 201, impactScore: 4.9, color: '#4A9EFF' },
];

export const VIDEOS = [
  {
    id: 'v1', creatorId: 'c1', category: 'environment',
    title: 'This beach was covered in plastic 6 months ago',
    description: 'Our team of 200 volunteers transformed this coastline. Here\'s how you can organize a cleanup in your area. #oceancleanup #environment #volunteer',
    videoUrl: null,
    gradientColors: ['#064e3b', '#059669', '#34d399'],
    duration: 15, likes: 45200, comments: 1890, shares: 12400,
    saves: 8900, impactScore: 4.9, inspired: 28400, isLive: false,
    sound: 'Original Sound - ocean_guardian',
  },
  {
    id: 'v2', creatorId: 'c2', category: 'education',
    title: 'Quantum physics explained with a cup of coffee',
    description: 'You don\'t need a PhD to understand quantum mechanics. Let me show you with your morning coffee. #science #education #quantum',
    videoUrl: null,
    gradientColors: ['#1e3a5f', '#3b82f6', '#93c5fd'],
    duration: 18, likes: 89300, comments: 4200, shares: 23100,
    saves: 15600, impactScore: 4.8, inspired: 52000, isLive: false,
    sound: 'Original Sound - teach_the_future',
  },
  {
    id: 'v3', creatorId: 'c3', category: 'health',
    title: '5-second trick to stop a panic attack',
    description: 'As a therapist, I teach this to every client. It works because it activates your vagus nerve. Save this for when you need it. #mentalhealth #anxiety #wellness',
    videoUrl: null,
    gradientColors: ['#831843', '#ec4899', '#f9a8d4'],
    duration: 12, likes: 234000, comments: 8900, shares: 67000,
    saves: 89000, impactScore: 4.9, inspired: 145000, isLive: false,
    sound: 'Calm Piano - Wellness Beats',
  },
  {
    id: 'v4', creatorId: 'c4', category: 'community',
    title: 'We turned an abandoned lot into a community garden',
    description: 'What started with 3 neighbors is now feeding 40 families. Here\'s month 1 to month 6 timelapse. #community #garden #neighborhood',
    videoUrl: null,
    gradientColors: ['#78350f', '#f59e0b', '#fcd34d'],
    duration: 20, likes: 67800, comments: 3400, shares: 18900,
    saves: 12300, impactScore: 4.8, inspired: 34000, isLive: false,
    sound: 'Good Vibes - Community Sounds',
  },
  {
    id: 'v5', creatorId: 'c5', category: 'innovation',
    title: 'This solar panel costs $50 and powers a whole home',
    description: 'We open-sourced the design. Anyone with basic tools can build it. Link in bio for the full plans. #solar #cleanenergy #innovation #opensource',
    videoUrl: null,
    gradientColors: ['#581c87', '#a855f7', '#d8b4fe'],
    duration: 16, likes: 156000, comments: 7800, shares: 45000,
    saves: 34000, impactScore: 4.9, inspired: 89000, isLive: false,
    sound: 'Original Sound - solar_sarah',
  },
  {
    id: 'v6', creatorId: 'c6', category: 'kindness',
    title: 'He\'s been delivering free meals for 30 years',
    description: 'Meet Mr. Johnson. Every single day for 30 years, rain or shine, he delivers meals to elderly neighbors. This is what a hero looks like. #kindness #hero #community',
    videoUrl: null,
    gradientColors: ['#92400e', '#f59e0b', '#fde68a'],
    duration: 22, likes: 345000, comments: 12000, shares: 89000,
    saves: 67000, impactScore: 5.0, inspired: 210000, isLive: false,
    sound: 'Heartwarming - Uplift Originals',
  },
  {
    id: 'v7', creatorId: 'c7', category: 'health',
    title: 'The breakfast mistake 90% of people make',
    description: 'It\'s not about skipping breakfast. It\'s about what you eat first. Here\'s the science-backed order that stabilizes your blood sugar all day. #nutrition #health',
    videoUrl: null,
    gradientColors: ['#9d174d', '#f472b6', '#fbcfe8'],
    duration: 14, likes: 78000, comments: 5600, shares: 21000,
    saves: 45000, impactScore: 4.5, inspired: 42000, isLive: false,
    sound: 'Original Sound - dr_nutrition',
  },
  {
    id: 'v8', creatorId: 'c8', category: 'innovation',
    title: 'I built an app that connects food waste to food banks',
    description: 'Restaurants throw away tons of food daily. Food banks need donations. This app bridges the gap. It\'s free and open source. #tech4good #foodwaste #innovation',
    videoUrl: null,
    gradientColors: ['#4c1d95', '#8b5cf6', '#c4b5fd'],
    duration: 17, likes: 123000, comments: 6700, shares: 34000,
    saves: 28000, impactScore: 4.8, inspired: 67000, isLive: false,
    sound: 'Code & Create - Tech Beats',
  },
  {
    id: 'v9', creatorId: 'c9', category: 'environment',
    title: 'This 500-year-old tree almost didn\'t survive',
    description: 'The story of how a community came together to save an ancient redwood from being cut down. And why old-growth forests matter more than you think. #trees #nature #conservation',
    videoUrl: null,
    gradientColors: ['#14532d', '#22c55e', '#86efac'],
    duration: 19, likes: 98000, comments: 4100, shares: 27000,
    saves: 19000, impactScore: 4.7, inspired: 56000, isLive: false,
    sound: 'Forest Ambience - Nature Sounds',
  },
  {
    id: 'v10', creatorId: 'c10', category: 'education',
    title: 'She couldn\'t read at age 8. Now she\'s a published author.',
    description: 'Maria joined our free reading program 4 years ago. Today she published her first book. This is why literacy programs change lives. #literacy #education #inspiration',
    videoUrl: null,
    gradientColors: ['#1e40af', '#60a5fa', '#bfdbfe'],
    duration: 21, likes: 267000, comments: 9800, shares: 56000,
    saves: 43000, impactScore: 4.9, inspired: 134000, isLive: false,
    sound: 'Inspiring Journey - Uplift Originals',
  },
  {
    id: 'v11', creatorId: 'c6', category: 'kindness',
    title: 'What happens when you pay for a stranger\'s groceries',
    description: 'I\'ve been doing this for a year. The reactions never get old. But what happened today made me cry. Watch to the end. #payitforward #kindness',
    videoUrl: null,
    gradientColors: ['#854d0e', '#eab308', '#fef08a'],
    duration: 15, likes: 189000, comments: 7600, shares: 45000,
    saves: 34000, impactScore: 4.8, inspired: 98000, isLive: false,
    sound: 'Feel Good - Happy Acoustics',
  },
  {
    id: 'v12', creatorId: 'c3', category: 'health',
    title: '3 things I wish I knew before burnout hit me',
    description: 'I\'m a therapist and I still burned out. These are the warning signs I missed and what actually helped me recover. #burnout #mentalhealth #selfcare',
    videoUrl: null,
    gradientColors: ['#701a75', '#d946ef', '#f0abfc'],
    duration: 16, likes: 145000, comments: 8200, shares: 38000,
    saves: 56000, impactScore: 4.7, inspired: 78000, isLive: false,
    sound: 'Gentle Reflection - Calm Sounds',
  },
  {
    id: 'v13', creatorId: 'c5', category: 'innovation',
    title: 'This filter turns dirty water clean using sunlight',
    description: 'No electricity. No chemicals. Just sunlight and a $3 filter. We\'re distributing 10,000 of these in communities without clean water access. #cleanwater #innovation',
    videoUrl: null,
    gradientColors: ['#3730a3', '#818cf8', '#c7d2fe'],
    duration: 13, likes: 198000, comments: 9100, shares: 67000,
    saves: 45000, impactScore: 5.0, inspired: 112000, isLive: true,
    sound: 'Original Sound - solar_sarah',
  },
  {
    id: 'v14', creatorId: 'c4', category: 'community',
    title: 'The neighborhood that banned loneliness',
    description: 'In this neighborhood, every new resident gets welcomed by 10 families. No one eats alone on holidays. Here\'s how they built this culture. #community #belonging #connection',
    videoUrl: null,
    gradientColors: ['#9a3412', '#fb923c', '#fed7aa'],
    duration: 18, likes: 234000, comments: 11000, shares: 78000,
    saves: 56000, impactScore: 4.9, inspired: 145000, isLive: false,
    sound: 'Home & Heart - Acoustic Vibes',
  },
];

export const COMMENTS = {
  v1: [
    { id: 'cm1',  username: 'green_warrior',    text: 'This is incredible! Starting one in my city next month.', likes: 234, timestamp: '2h ago' },
    { id: 'cm2',  username: 'beach_lover_99',   text: 'I was part of this cleanup! Best day of my life.', likes: 189, timestamp: '3h ago' },
    { id: 'cm3',  username: 'eco_emma',         text: 'How do I find cleanup groups near me?', likes: 67, timestamp: '4h ago' },
    { id: 'cm4',  username: 'planet_first',     text: 'We need more people like you. Shared with everyone I know.', likes: 445, timestamp: '5h ago' },
    { id: 'cm5',  username: 'surf_dude',        text: 'This is my local beach! Thank you so much!', likes: 312, timestamp: '6h ago' },
  ],
  v2: [
    { id: 'cm6',  username: 'curious_cat',      text: 'Finally someone explains this so I can actually understand!', likes: 567, timestamp: '1h ago' },
    { id: 'cm7',  username: 'physics_fan',      text: 'This is actually a great analogy. Well done!', likes: 234, timestamp: '2h ago' },
    { id: 'cm8',  username: 'student_life',     text: 'Wish my professor explained it like this.', likes: 890, timestamp: '3h ago' },
    { id: 'cm9',  username: 'coffee_addict',    text: 'Now I think about quantum physics every morning lol', likes: 123, timestamp: '4h ago' },
  ],
  v3: [
    { id: 'cm10', username: 'anxiety_free',     text: 'I tried this during a meeting and it actually worked!', likes: 1200, timestamp: '30m ago' },
    { id: 'cm11', username: 'wellness_journey', text: 'Saving this forever. Thank you.', likes: 890, timestamp: '1h ago' },
    { id: 'cm12', username: 'mama_bear',        text: 'Teaching this to my kids. So important.', likes: 567, timestamp: '2h ago' },
    { id: 'cm13', username: 'therapist_too',    text: 'Can confirm, vagus nerve activation is powerful. Great tip!', likes: 2100, timestamp: '3h ago' },
    { id: 'cm14', username: 'grateful_heart',   text: 'Just used this in the grocery store. Game changer.', likes: 345, timestamp: '4h ago' },
    { id: 'cm15', username: 'new_to_this',      text: 'Is this safe for everyone to try?', likes: 78, timestamp: '5h ago' },
  ],
  v4: [
    { id: 'cm16', username: 'garden_lover',     text: 'This is the most beautiful thing I\'ve seen today.', likes: 456, timestamp: '1h ago' },
    { id: 'cm17', username: 'urban_farmer',     text: 'We did this in Detroit! It changed our whole block.', likes: 678, timestamp: '2h ago' },
    { id: 'cm18', username: 'seed_saver',       text: 'What crops work best in small spaces?', likes: 123, timestamp: '3h ago' },
  ],
  v5: [
    { id: 'cm19', username: 'diy_enthusiast',   text: 'Just downloaded the plans. Building this weekend!', likes: 890, timestamp: '45m ago' },
    { id: 'cm20', username: 'off_grid_life',    text: 'This could change everything for remote communities.', likes: 1500, timestamp: '2h ago' },
    { id: 'cm21', username: 'engineer_mom',     text: 'The design is brilliant. Simple but effective.', likes: 567, timestamp: '3h ago' },
  ],
  v6: [
    { id: 'cm22', username: 'crying_rn',        text: 'I\'m not crying, you\'re crying. What an amazing human.', likes: 3400, timestamp: '20m ago' },
    { id: 'cm23', username: 'inspired_daily',   text: 'This is what social media should be about.', likes: 2100, timestamp: '1h ago' },
    { id: 'cm24', username: 'volunteer_vic',    text: 'How can we help Mr. Johnson? Is there a GoFundMe?', likes: 1800, timestamp: '2h ago' },
    { id: 'cm25', username: 'neighbor_nancy',   text: 'He delivered to my grandmother for 10 years. A true saint.', likes: 4500, timestamp: '3h ago' },
  ],
  v7: [
    { id: 'cm26', username: 'breakfast_club',   text: 'Wait, I\'ve been doing it wrong this whole time?!', likes: 345, timestamp: '1h ago' },
    { id: 'cm27', username: 'health_first',     text: 'Protein first, then veggies, then carbs. Got it!', likes: 234, timestamp: '2h ago' },
  ],
  v8: [
    { id: 'cm28', username: 'dev_for_change',   text: 'Contributing to this repo tonight. Amazing work!', likes: 678, timestamp: '1h ago' },
    { id: 'cm29', username: 'restaurant_owner', text: 'We\'d love to use this! How do we sign up?', likes: 456, timestamp: '2h ago' },
  ],
  v9: [
    { id: 'cm30', username: 'tree_hugger',      text: 'Old growth forests are irreplaceable. Thank you for sharing.', likes: 567, timestamp: '2h ago' },
    { id: 'cm31', username: 'nature_nerd',      text: '500 years of growth can never be replicated. Protect our forests!', likes: 890, timestamp: '3h ago' },
  ],
  v10: [
    { id: 'cm32', username: 'proud_teacher',    text: 'This made me remember why I became a teacher. Beautiful story.', likes: 1200, timestamp: '1h ago' },
    { id: 'cm33', username: 'book_worm',        text: 'What\'s the title of her book? I want to buy it!', likes: 890, timestamp: '2h ago' },
    { id: 'cm34', username: 'donate_to_read',   text: 'Donating to the literacy program right now.', likes: 2300, timestamp: '3h ago' },
  ],
  v11: [
    { id: 'cm35', username: 'faith_in_humanity', text: 'This restored my faith in humanity today.', likes: 1500, timestamp: '30m ago' },
    { id: 'cm36', username: 'pay_it_forward',   text: 'I did this last week and the lady started crying. So worth it.', likes: 890, timestamp: '1h ago' },
  ],
  v12: [
    { id: 'cm37', username: 'recovering_now',   text: 'I needed to hear this today. Thank you.', likes: 2100, timestamp: '45m ago' },
    { id: 'cm38', username: 'work_life',        text: 'The warning signs are so easy to miss when you\'re in it.', likes: 1300, timestamp: '2h ago' },
  ],
  v13: [
    { id: 'cm39', username: 'clean_water_now',  text: 'This technology could save millions of lives.', likes: 3400, timestamp: '15m ago' },
    { id: 'cm40', username: 'ngo_worker',       text: 'We want to distribute these in our project areas. How to connect?', likes: 2100, timestamp: '1h ago' },
    { id: 'cm41', username: 'science_rocks',    text: 'The UV purification method is proven effective. Great implementation!', likes: 890, timestamp: '2h ago' },
  ],
  v14: [
    { id: 'cm42', username: 'lonely_no_more',   text: 'I wish every neighborhood was like this.', likes: 2800, timestamp: '1h ago' },
    { id: 'cm43', username: 'community_first',  text: 'Starting this tradition on my street. Who\'s with me?', likes: 1900, timestamp: '2h ago' },
  ],
};

// Helper to get creator by ID
export function getCreator(id) {
  return CREATORS.find(c => c.id === id);
}

// Helper to get comments for a video
export function getComments(videoId) {
  return COMMENTS[videoId] || [];
}

// Format large numbers (e.g., 45200 -> "45.2K")
export function formatCount(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(n);
}
