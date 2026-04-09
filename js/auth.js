// ============================================================
// Uplift — Anonymous Auth System
// ============================================================
// Zero-knowledge identity: no email, no phone, no password.
// Users get a random anonymous identity stored only in localStorage.
// Nothing is traceable. Nothing leaves the device.

const STORAGE_KEY = 'uplift_user';
const ADJECTIVES = [
  'quiet','cosmic','gentle','bright','swift','calm','bold','warm',
  'wild','free','deep','soft','keen','pure','true','wise','kind',
  'brave','noble','vivid','lucid','serene','radiant','humble',
  'fearless','curious','daring','steady','silent','golden',
  'crystal','velvet','amber','crimson','azure','jade','coral',
  'ivory','silver','copper','misty','frosty','sunny','breezy',
];
const NOUNS = [
  'river','mountain','forest','ocean','meadow','valley','canyon',
  'aurora','horizon','summit','harbor','garden','island','thunder',
  'breeze','ember','lotus','phoenix','cedar','willow','falcon',
  'dolphin','wolf','eagle','orchid','pebble','glacier','comet',
  'nebula','quartz','reef','tide','grove','dune','fern','moss',
  'sparrow','otter','fox','owl','coral','wave','cloud','rain',
];
const AVATAR_COLORS = [
  '#FF6B9D','#4A9EFF','#4ADF8A','#FFB84A','#A855F7','#F59E0B',
  '#EC4899','#06B6D4','#10B981','#F97316','#8B5CF6','#EF4444',
  '#14B8A6','#6366F1','#D946EF','#0EA5E9','#84CC16','#FB7185',
];

function generateId() {
  return 'u_' + crypto.randomUUID().replace(/-/g, '').substring(0, 16);
}

function generateUsername() {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const num = Math.floor(Math.random() * 99) + 1;
  return `${adj}_${noun}_${num}`;
}

function generateAvatarColor() {
  return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
}

function getInitials(name) {
  return name.split(/[_\s]+/).map(w => w[0]).join('').substring(0, 2).toUpperCase();
}

// Create a fresh anonymous user
export function createUser(interests = [], displayName = null) {
  const username = generateUsername();
  const user = {
    id: generateId(),
    username,
    displayName: displayName || username.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).replace(/\s\d+$/, ''),
    avatarColor: generateAvatarColor(),
    interests, // selected impact categories
    createdAt: new Date().toISOString(),
    // Stats
    inspired: 0,
    impactScore: 0,
    videosWatched: 0,
    timeSpent: 0, // seconds
    // Engagement
    likedVideos: [],
    savedVideos: [],
    following: [],
    comments: [],
  };
  saveUser(user);
  return user;
}

// Save user to localStorage
export function saveUser(user) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch (e) { /* storage full or unavailable */ }
}

// Load user from localStorage
export function loadUser() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    const user = JSON.parse(data);
    // Ensure user object has all expected fields (migration safety)
    if (!user.id || !user.username) return null;
    return user;
  } catch (e) {
    return null;
  }
}

// Check if user is logged in
export function isLoggedIn() {
  return loadUser() !== null;
}

// Log out (destroy local identity)
export function logout() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem('uplift_state');
}

// Update user fields
export function updateUser(updates) {
  const user = loadUser();
  if (!user) return null;
  Object.assign(user, updates);
  saveUser(user);
  return user;
}

// Toggle like
export function toggleLike(videoId) {
  const user = loadUser();
  if (!user) return false;
  const idx = user.likedVideos.indexOf(videoId);
  if (idx >= 0) {
    user.likedVideos.splice(idx, 1);
  } else {
    user.likedVideos.push(videoId);
  }
  saveUser(user);
  return idx < 0; // true if now liked
}

// Toggle save
export function toggleSave(videoId) {
  const user = loadUser();
  if (!user) return false;
  const idx = user.savedVideos.indexOf(videoId);
  if (idx >= 0) {
    user.savedVideos.splice(idx, 1);
  } else {
    user.savedVideos.push(videoId);
  }
  saveUser(user);
  return idx < 0; // true if now saved
}

// Toggle follow
export function toggleFollow(creatorId) {
  const user = loadUser();
  if (!user) return false;
  const idx = user.following.indexOf(creatorId);
  if (idx >= 0) {
    user.following.splice(idx, 1);
  } else {
    user.following.push(creatorId);
  }
  saveUser(user);
  return idx < 0; // true if now following
}

// Check states
export function isLiked(videoId) {
  const user = loadUser();
  return user ? user.likedVideos.includes(videoId) : false;
}
export function isSaved(videoId) {
  const user = loadUser();
  return user ? user.savedVideos.includes(videoId) : false;
}
export function isFollowing(creatorId) {
  const user = loadUser();
  return user ? user.following.includes(creatorId) : false;
}

// Increment watch stats
export function recordWatch() {
  const user = loadUser();
  if (!user) return;
  user.videosWatched = (user.videosWatched || 0) + 1;
  saveUser(user);
}

// Re-generate username
export function regenerateUsername() {
  const user = loadUser();
  if (!user) return null;
  user.username = generateUsername();
  user.displayName = user.username.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).replace(/\s\d+$/, '');
  saveUser(user);
  return user;
}

// Re-roll avatar color
export function rerollAvatarColor() {
  const user = loadUser();
  if (!user) return null;
  user.avatarColor = generateAvatarColor();
  saveUser(user);
  return user;
}

// Export helpers
export { getInitials, generateUsername, generateAvatarColor };
