import { Mail, Home, Navigation2, MessageCircle, Gift, Columns, Map, PlayCircle, Circle, HelpCircle, User, Activity, BookOpen, Plus, AlertCircle, CreditCard, Edit, Briefcase } from 'react-feather'

export default [
  {
    id: 'Dashboard',
    title: 'Dashboard',
    icon: <Home size={12} />,
    navLink: '/student/Dashboard/'
  },  
  {
    id: 'Study',
    title: 'Study',
    icon: <BookOpen size={12} />,
    navLink: '/student/Study/'
  },
  {
    id: 'StudentProfile',
    title: 'StudentProfile',
    icon: <User size={12} />,
    navLink: '/student/StudentProfile'
  },
  {
    id: 'GettingStarted',
    title: 'Getting Started',
    icon: <Navigation2 size={12} />,
    navLink: '/student/GettingStarted/'
  },
  {
    id: 'Attendance',
    title: 'Attendance',
    icon: <Activity size={12} />,
    navLink: '/student/Attendance/'
  },
  {
    id: 'Assignment',
    title: 'Assignment',
    icon: <Edit size={12} />,
    navLink: '/student/Assignment/'
  },
  {
    id: 'Request',
    title: 'Request',
    icon: <Plus size={12} />,
    navLink: '/student/Request/'
  },
  {
    id: 'CSIQ',
    title: 'CSIQ',
    icon: <AlertCircle size={12} />,
    navLink: '/student/CSIQ/'
  },
  {
    id: 'Wallet',
    title: 'Wallet',
    icon: <CreditCard size={12} />,
    navLink: '/student/Wallet/'
  },
  // {
  //   id: 'jobs',
  //   title: 'jobs',
  //   icon: <Briefcase size={12} />,
  //   navLink: '/student/jobs/'
  // },
  {
    id: 'SelfIntro',
    title: 'Self Intro',
    icon: <User size={12} />,
    navLink: '/student/SelfIntro/'
  },
  {
    id: 'StudentTestimonials',
    title: 'Student Testimonials',
    icon: <MessageCircle size={12} />,
    navLink: '/student/StudentTestimonial/'
  },
  // {
  // id: 'CVPoints',
  // title: 'CV Points',
  // icon: <Columns size={12} />,
  // navLink: '/student/CVPoints/'
  // },
  {
  id: 'Certificate',
  title: 'Certificate',
  icon: <Gift size={12} />,
  navLink: '/student/Certificate/'
  },
  {
  id: 'CyberNews',
  title: 'Cyber News',
  icon: <Map size={12} />,
  navLink: '/student/CyberNews/'
  },
  {
    id: 'FAQ',
    title: 'FAQ',
    icon: <HelpCircle size={12} />,
    navLink: '/student/FAQ/'
  }
]
