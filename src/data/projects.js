// Edit this array to add, remove, or update portfolio projects.
// category must be one of: 'iot', 'ai', 'software'
// image_url is the image shown for the project card.
// demo_url is the link users visit when they click the project button.
//
// IMPORTANT: imgur direct-image links look like:
//   https://i.imgur.com/XXXXXXX.jpg   (note the "i." subdomain AND file extension)
// A link like https://imgur.com/XXXXXXX is the *page*, not the image, and will not render.
// Easiest way to get this right: right-click the image itself on imgur and
// choose "Copy image address" — that always gives you the correct i.imgur.com/...jpg link.

export const projects = [
  {
    id: 1,
    title: 'Smart Door Lock',
    desc: 'Biometric + remote access with ESP32.',
    category: 'iot',
    techs: ['Arduino', 'ESP32', 'MQTT'],
    image_url: 'https://i.imgur.com/MzMisUz.jpg',
    demo_url: '#',
  },
  {
    id: 2,
    title: 'Robotic Obstacle Avoidance System',
    desc: 'Autonomous navigation that detects and steers around obstacles in real time.',
    category: 'iot',
    techs: ['Arduino Uno', 'Ultrasonic Sensor', 'Relay'],
    image_url: 'https://i.imgur.com/mReIYY1.jpg', // was still a page link — fixed to direct image link
    demo_url: '#',
  },
  {
    id: 3,
    title: 'Smart Security System',
    desc: 'Real-time intrusion detection & alerting via connected sensors.',
    category: 'iot',
    techs: ['Arduino', 'PIR Sensor', 'Passive-Buzzer'],
    image_url: 'https://i.imgur.com/ZsT4itp.jpg',
    demo_url: '#',
  },
  {
    id: 4,
    title: 'Shamba Weather AI',
    desc: 'AI-driven weather forecasting & farm advisory for smallholder farmers.',
    category: 'ai',
    techs: ['Python', 'React', 'TensorFlow'],
    image_url: 'https://i.imgur.com/8KCVwWc.jpg',
    demo_url: '#',
  },
  {
    id: 5,
    title: 'AI-Powered KYC (Know Your Customer) Verification System',
    desc: 'Automated identity verification using facial recognition & document OCR for financial compliance.',
    category: 'ai',
    techs: ['Python', 'Supabase DB', 'React'],
    image_url: 'https://i.imgur.com/qyZVWc1.jpg',
    demo_url: '#',
  },
  {
    id: 6,
    title: 'Sentiment Analysis',
    desc: 'NLP-based sentiment classification for customer feedback and reviews.',
    category: 'ai',
    techs: ['Python', 'NLP', 'Hugging Face Transformers'],
    image_url: 'https://i.imgur.com/XSb10o3.jpg',
    demo_url: '#',
  },
  {
    id: 7,
    title: 'School Management System',
    desc: 'Student records, attendance, and fee management platform for schools.',
    category: 'software',
    techs: ['React', 'Supabase', 'Flask'],
    image_url: 'https://i.imgur.com/gU9JNMv.jpg',
    demo_url: '#',
  },
  {
    id: 8,
    title: 'Car Hire System',
    desc: 'Vehicle booking, fleet tracking & rental management.',
    category: 'software',
    techs: ['React', 'Supabase', 'Node.js'],
    image_url: 'https://i.imgur.com/g6CuYZU.jpg',
    demo_url: '#',
  },
  {
    id: 9,
    title: 'Mobile Development',
    desc: 'Cross-platform & native mobile apps built with Flutter and Swift.',
    category: 'software',
    techs: ['Flutter', 'PostgreSQL', 'Swift'],
    image_url: 'https://i.imgur.com/B18MSoG.jpg',
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
  title: 'Software Engineer | IoT Enthusiast & AI Engineer',
  tagline: 'Building intelligent systems at the intersection of embedded hardware and artificial intelligence. Passionate about creating solutions that bridge the physical and digital worlds.',
  about: "I'm a passionate software Engineer with expertise in IoT, AI, and full-stack development.",
  profileImageUrl: 'https://i.imgur.com/SgGxFvJ.jpg',
};