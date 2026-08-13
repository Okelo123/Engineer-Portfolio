// Edit this array to add, remove, or update portfolio projects.
// category must be one of: 'iot', 'ai', 'software'
export const projects = [
  {
    id: 1,
    title: 'Smart Door Lock',
    desc: 'Biometric + remote access with ESP32.',
    category: 'iot',
    techs: ['Arduino', 'ESP32', 'MQTT'],
    image_url: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=400&fit=crop',
    demo_url: '#',
  },
  {
    id: 2,
    title: 'Circuit Breaker',
    desc: 'Fault detection & remote control.',
    category: 'iot',
    techs: ['ESP32', 'Current Sensor', 'Relay'],
    image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop',
    demo_url: '#',
  },
  {
    id: 3,
    title: 'Energy Dashboard',
    desc: 'Real-time monitoring & analytics.',
    category: 'iot',
    techs: ['Arduino', 'CT Sensor', 'ThingSpeak'],
    image_url: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&h=400&fit=crop',
    demo_url: '#',
  },
  {
    id: 4,
    title: 'Health Monitor AI',
    desc: 'Vital signs & risk detection.',
    category: 'ai',
    techs: ['Python', 'NLP', 'TensorFlow'],
    image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
    demo_url: '#',
  },
  {
    id: 5,
    title: 'CropCare AI',
    desc: 'Farming assistant & disease detection.',
    category: 'ai',
    techs: ['Python', 'DialogFlow', 'Node.js'],
    image_url: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7e34?w=600&h=400&fit=crop',
    demo_url: '#',
  },
  {
    id: 6,
    title: 'Recommendation Engine',
    desc: 'Collaborative filtering system.',
    category: 'ai',
    techs: ['Python', 'Scikit-learn', 'Pandas'],
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    demo_url: '#',
  },
  {
    id: 7,
    title: 'Restaurant & Hotel',
    desc: 'Mileshi Horizon reservation site.',
    category: 'software',
    techs: ['HTML/CSS', 'JS', 'Tailwind'],
    image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
    demo_url: '#',
  },
  {
    id: 8,
    title: 'Car Hire System',
    desc: 'Booking & fleet management.',
    category: 'software',
    techs: ['Node.js', 'Supabase', 'Socket.io'],
    image_url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop',
    demo_url: '#',
  },
  {
    id: 9,
    title: 'Smart To-Do List',
    desc: 'Priority & reminders.',
    category: 'software',
    techs: ['Express', 'PostgreSQL', 'Twilio'],
    image_url: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop',
    demo_url: '#',
  },
];

export const skillGroups = [
  {
    icon: 'Code2',
    color: 'var(--accent)',
    title: 'Programming',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'C/C++', level: 80 },
    ],
  },
  {
    icon: 'Cpu',
    color: '#8b5cf6',
    title: 'IoT & Embedded',
    skills: [
      { name: 'Arduino', level: 92 },
      { name: 'ESP32', level: 88 },
      { name: 'Sensor Integration', level: 85 },
    ],
  },
  {
    icon: 'Brain',
    color: '#06b6d4',
    title: 'AI & ML',
    skills: [
      { name: 'NLP / Chatbots', level: 85 },
      { name: 'ML / TensorFlow', level: 80 },
    ],
  },
  {
    icon: 'Globe',
    color: '#f59e0b',
    title: 'Web Dev',
    skills: [
      { name: 'HTML/CSS', level: 95 },
      { name: 'React / Node', level: 82 },
    ],
  },
];

// CV files live in /public/cv — replace these files (keep the same names)
// or update the paths below to point elsewhere.
export const defaultCvLinks = {
  iot: '/cv/Brian-Juma-IoT-Robotics-CV.pdf',
  ai: '/cv/Brian-Juma-AI-CV.pdf',
  software: '/cv/Brian-Juma-Software-CV.pdf',
};

export const defaultProfile = {
  name: 'Brian Juma',
  title: 'Software Engineer | IoT & AI Engineer',
  tagline: 'Building intelligent systems at the intersection of embedded hardware and AI.',
  about: "I'm a passionate software Engineer with expertise in IoT, AI, and full-stack development.",
  profileImageUrl: '',
};
