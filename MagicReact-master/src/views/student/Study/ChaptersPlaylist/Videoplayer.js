import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import {Clock} from 'react-feather'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Button, CardActionArea, CardActions } from '@mui/material'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { DefaultPlayer as Video } from 'react-html5video'
import 'react-html5video/dist/styles.css'
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar'
//import 'react-pro-sidebar/dist/scss/styles.scss'
import './sideMenuStyle.scss'
import ReactPlayer from 'react-player'
import {axiosClient} from '../../../../Client'
import defaultThumbNail from "@src/assets/images/student/newMagicLogo.png"
import Checkbox from '@mui/material/Checkbox'


const Videoplayer = () => {

  const {CourseId} = useParams()
  const [loadCourseName, setloadCourseName] = useState([])
  const [activeTab, setActiveTab] = useState(0)

  const [Chapters, setChapters] = useState([])
  const [ChapterName, setChapterName] = useState('')

  const [Resources, setResources] = useState([])
  const [videoDetails, setVideoDetails] = useState('')

  const [open, setOpen] = useState('')
  
  const [openSubmenu, setOpenSubMenu] = useState(false)
  const [Checked, setChecked] = useState(false)
  
  useEffect(() => {
    axiosClient.get(`study/getCourseNameOnCourseId?CourseId=${CourseId}`).then((res) => {
      setloadCourseName(res.data)
        axiosClient.get(`study/getChaptersOnCourseId?CourseId=${CourseId}`).then((ch) => {
        setChapters(ch.data)
      })      
    })
  }, [CourseId])
  

  const getResourcesOnChapterClick = (ChapterId, ChapterName) => {
    //const ChapterId = e.target.value
    axiosClient.get(`study/getAllResourcesOnChapterId?ChapterId=${ChapterId}`).then((rs) => {
      setResources(rs.data)
      setOpen(ChapterId)
      setChapterName(ChapterName)
    })
  }
  
  const tabClick = (e, val) => {
    setActiveTab(val)
  }
  
const TabPanel = (props) => {
  const {children, value, index} = props
  return (
    <div>   
    {
      value === index && (
        <Box className='p-1' sx={{
          height:'100%',
          textAlign: 'justify',
          textJustify: 'inter-word'  
        }}>{children}</Box>
      )
    }
    </div>
    )
}

  return (
    <div> 
    <Grid container spacing={1}>
    <Grid item md={12} lg={8}>
        <Box
        sx={{
          '&:hover': {
            opacity: [0.9]
          }
        }}
      >
    <Card variant="outlined">
    <CardActionArea className='p-1 border-bottom'>
    <div style={{position: 'relative', paddingTop: '56.25%'}}>
    <ReactPlayer width='100%' height="100%" style={{position: 'absolute', top: '0', left: '0', border:'1px solid #fff', boxShadow: 'rgba(0, 0, 0, 0.76) 0px 1px 2px'}} controls url={videoDetails.videoPath === undefined ? 'https://www.youtube.com/watch?v=nLCS31uSh34' : videoDetails.videoPath} light={defaultThumbNail} onEnded={() => setChecked(true)}/>
   </div>
    {/* <Video loop
    controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
    poster="https://df93jn2oarhia.cloudfront.net/res/images/screenshots/homepage/tab-sharing.png"
    onCanPlayThrough={() => {
        // Do stuff
    }}>
    {/*<source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/webm" />
    <source preload="none" src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/webm" />
    <track label="English" kind="subtitles" srcLang="en" src="http://source.vtt" default />
</Video>*/}
    </CardActionArea>    
    <CardContent>
    <Typography variant="h5">
    Week 1 {ChapterName}
    </Typography>        
    
    <Typography variant="h6">
    {videoDetails.videoName}
    </Typography>        
  </CardContent>
    <CardActions>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs  value={activeTab} onChange={tabClick}>
          <Tab label="OverView" />
          <Tab label="Q & A"/>
          <Tab label="Notes" />
          <Tab label="Announcements" />
          <Tab label="Resouces" />
        </Tabs>
      </Box>      
      <TabPanel value={activeTab} index={0}>OverView</TabPanel>
      <TabPanel value={activeTab} index={1}>Q & A</TabPanel>
      <TabPanel value={activeTab} index={2}>Notes</TabPanel>
      <TabPanel value={activeTab} index={3}>Announcements</TabPanel>
      <TabPanel value={activeTab} index={4}>AResouces</TabPanel>
    </Box>
    </CardActions>
  </Card>
  </Box>
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={4}>

{/*
 <ProSidebar>
  <SidebarContent>
  <Menu>  
  <MenuItem>
  {
    loadCourseName.map((res, index) => (     
      <h4 key={index} >{res.CourseName}</h4>
      ))
  } 
      </MenuItem>
  <MenuItem>Course Contents</MenuItem>
  {
    Chapters.map((ch, index) => (    
  <SubMenu key={index} title={ch.ChapterName} onClick={() => getResourcesOnChapterClick(ch.ChapterId, ch.ChapterName)}>
  {
    Resources.map((rs, index) => ( 
          open === ch.ChapterId && (
      <MenuItem key={index} onClick={() => setVideoDetails({videoPath:rs.ResourcePath, videoName:rs.ResourceName })}><p >{rs.ResourceName}</p><article><Clock size={15}/> 1 min</article></MenuItem>
          )
      ))
  } 
  </SubMenu>    
  ))
}
</Menu>
  </SidebarContent>
</ProSidebar>

*/}

<nav className='sidebar-menu'>
         <div className='sidebar-menu-header'>
         {
          loadCourseName.map((res, index) => (     
            <h4 key={index} >{res.CourseName}</h4>
            ))
        } 
         </div>
         <div className='menu' onClick={() => setOpenSubMenu(true)}>
         {
    Chapters.map((ch, index) => (    
            <div className='menu-item' key={index}  onClick={() => getResourcesOnChapterClick(ch.ChapterId, ch.ChapterName)}>
               {ch.ChapterName}<span className={openSubmenu && open === ch.ChapterId ? 'arrow-up' : 'arrow'}></span>
               {
                Resources.map((rs, index) => ( 
               <div className={openSubmenu && open === ch.ChapterId ? 'sub-menu-show' : 'sub-menu'} key={index} onClick={() => setVideoDetails({videoPath:rs.ResourcePath, videoName:rs.ResourceName })}>
               <div className='sub-menu-item'><Checkbox defaultChecked={Checked === true} color="primary" style={{ marginLeft: '-30px'}}/> {rs.ResourceName}<p className='duration'><Clock size={15}/> 1 min</p></div>
               </div>
               ))
              }         
            </div>   
            ))
          }     
         </div>
      </nav>
      {/*
      <nav className='sidebar-menu'>
         <div class="sidebar-menu-header">
            Side Menu
         </div>
         <div className='menu' onClick={showSubMenu}>   
            <div className='menu-item'>
               ch.ChapterName<span className={openSubmenu ? 'arrow-up' : 'arrow'}></span>
               <div className={openSubmenu ? 'sub-menu-show' : 'sub-menu'} >
               <div className='sub-menu-item'> <Checkbox color="secondary" /> rs.ResourceName<p className='duration'><Clock size={15}/> 1 min</p></div>
               </div>  
               <div className='sub-menu'>
               <div className='sub-menu-item'>rs.ResourceName<p className='duration'><Clock size={15}/> 1 min</p></div>
            </div>  
            <div className='sub-menu'>
            <div className='sub-menu-item'>rs.ResourceName<p className='duration'><Clock size={15}/> 1 min</p></div>
         </div>  

         <div className='sub-menu'>
         <div className='sub-menu-item'>rs.ResourceName<p className='duration'><Clock size={15}/> 1 min</p></div>
      </div>  

            </div>  
            <div className='menu-item'>
               ch.ChapterName<span className='arrow'></span>
               <div className='sub-menu'>
                  <div className='sub-menu-item'>rs.ResourceName<p className='duration'><Clock size={15}/> 1 min</p></div>
               </div>  
               <div className='sub-menu'>
               <div className='sub-menu-item'>rs.ResourceName<p className='duration'><Clock size={15}/> 1 min</p></div>
            </div>  
            <div className='sub-menu'>
            <div className='sub-menu-item'>rs.ResourceName<p className='duration'><Clock size={15}/> 1 min</p></div>
         </div>  

         <div className='sub-menu'>
         <div className='sub-menu-item'>rs.ResourceName<p className='duration'><Clock size={15}/> 1 min</p></div>
      </div>  
      
            </div>  
         </div>
      </nav>
*/}
      </Grid>
    </Grid>
    </div>
  )
}

export default Videoplayer
