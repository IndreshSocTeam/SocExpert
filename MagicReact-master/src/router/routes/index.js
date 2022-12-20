import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Magic React Admin Template'

// ** Default Route
const DefaultRoute = '/Login'
const Routes = [
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
{
  path: '/student/StudentProfile/',
  component: lazy(() => import('../../views/student/StudentProfile/'))
},
{
  path: '/student/GettingStarted/',
  component: lazy(() => import('../../views/student/GettingStarted/'))
},
{
  path: '/student/SelfIntro/',
  component: lazy(() => import('../../views/student/SelfIntro/'))
},
{
  path: '/student/FAQ/',
  component: lazy(() => import('../../views/student/FAQ/'))
},
 {
    path: '/student/Dashboard/',
    component: lazy(() => import('../../views/student/Dashboard/'))
},
{
  path: '/student/ProgressDashboard/',
  component: lazy(() => import('../../views/student/Dashboard/ProgressDashboard/'))
},
{
  path: '/student/Attendance/',
  component: lazy(() => import('../../views/student/Attendance/'))
},
{
  path: '/student/Assignment/',
  component: lazy(() => import('../../views/student/Assignment/'))
},
{
  path: '/student/Request/',
  component: lazy(() => import('../../views/student/Request/'))
},
{
  path: '/student/RequestDetails/:ticketNumberid',
  component: lazy(() => import('../../views/student/Request/MyRequest/RequestDetails/IndividualRequestDetails'))
},
{
  path: '/student/Wallet/api/razorpay/',
  component: lazy(() => import('../../views/student/Wallet/api/razorpay'))
},
{
  path: '/student/CSIQ/',
  component: lazy(() => import('../../views/student/CSIQ/'))
},
{
  path: '/student/jobs/',
  component: lazy(() => import('../../views/student/jobs/'))
},
{
  path: '/student/StudentTestimonial/',
  component: lazy(() => import('../../views/student/StudentTestimonial/'))
},
{
  path: '/student/Wallet/',
  component: lazy(() => import('../../views/student/Wallet/'))
},
{
  path: '/student/CVPoints/',
  component: lazy(() => import('../../views/student/CVPoints/'))
},
{
  path: '/student/CyberNews/',
  component: lazy(() => import('../../views/student/CyberNews/'))
},
{
  path: '/student/Certificate/',
  component: lazy(() => import('../../views/student/Certificate/'))
},
{
  path: '/student/downloadCertificate/:CertificateId',
  component: lazy(() => import('../../views/student/Certificate/downloadCertificate'))
},
{
  path: '/error',
  component: lazy(() => import('../../views/Error')),
  layout: 'BlankLayout'
},
{
  path: '/forgotPassword',
  component: lazy(() => import('../../views/forgotPassword')),
  layout: 'BlankLayout'
},
{
  path: '/verifyAccount',
  component: lazy(() => import('../../views/verifyAccount')),
  layout: 'BlankLayout'
}
]

export { DefaultRoute, TemplateTitle, Routes }
