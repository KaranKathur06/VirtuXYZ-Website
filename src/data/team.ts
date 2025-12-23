export type SocialLinks = {
  linkedin?: string
  github?: string
}

export type TeamMember = {
  name: string
  role: string
  dept?: string
  impact?: string
  photo: string
} & SocialLinks

export const leadership: TeamMember[] = [
  {
    name: 'Tarique Mansuri',
    role: 'Co-Founder · Chief Executive Officer (CEO)',
    impact:
      'With 20+ years in business development and a decade in blockchain, AI, and global markets, he leads VirtuXYZ with seasoned vision.',
    photo: '/team/Tarique.jpeg',
  },
  {
    name: 'Yalda Bahreiny',
    role: 'Co-Founder · Chief Operating Officer (COO)',
    impact:
      '15+ years in real estate, architecture, and digital innovation, steering strategic development and board leadership from Zmud Consulting.',
    photo: '/images/team/yalda.webp',
  },
  {
    name: 'Adel Mehdizadeh',
    role: 'Co-Founder · Chief Technical Officer (CTO)',
    impact:
      'Architect and metaverse specialist in Unreal, real-time 3D, simulation, and gamified UX who single-handedly built VirtuXYZ’s MVP.',
    photo: '/images/team/adel.webp',
  },
  {
    name: 'Hardik Vyas',
    role: 'Chief Marketing Officer (CMO)',
    impact:
      '15+ years in global marketing and networking, including export leadership at Falcon Company in Rajkot.',
    photo: '/images/team/hardik.webp',
  },
]

export const coreTeam: TeamMember[] = [
  {
    name: 'Dharani Shanmugam',
    role: 'Full Stack Developer',
    dept: 'Engineering',
    impact:
      'Expert in React.js, TypeScript, Node.js, and blockchain platforms, delivering scalable, data-driven web applications.',
    photo: '/images/team/dharani.webp',
  },
  {
    name: 'Karan Kathur',
    role: 'AI Lead',
    dept: 'AI Lab',
    impact:
      'Combines Python, PostgreSQL, and task orchestration to power real-time analytics dashboards for VirtuXYZ clients.',
    photo: '/images/team/karan.webp',
  },
  {
    name: 'Carel de Wet',
    role: 'Advisor',
    dept: 'Advisory',
    impact: 'Seasoned advisor guiding operations and delivery excellence across enterprise rollouts.',
    photo: '/team/Carel.jpeg',
  },
]

export const values = [
  {
    title: 'Innovation',
    desc: 'We experiment with new ideas in weeks, not quarters.',
    icon: 'Sparkles',
  },
  {
    title: 'Transparency',
    desc: 'Clear data, clear pricing, and clear communication.',
    icon: 'Shield',
  },
  {
    title: 'Collaboration',
    desc: 'Design, data, and engineering building together.',
    icon: 'Users',
  },
  {
    title: 'Customer-First',
    desc: 'Every release is measured by customer outcomes.',
    icon: 'Heart',
  },
]


