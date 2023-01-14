import React, {useState, useEffect} from 'react'
import {axiosClient} from '../../../Client'
import { Link } from "react-router-dom"
import {Clock} from 'react-feather'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Button, CardActionArea, CardActions } from '@mui/material'
import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import Rating from '@mui/material/Rating'


const Courses = () => {
    const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }


const [courses, setCourses] = useState([])

useEffect(() => {
  axiosClient.get('study/GetAllCourses').then((c) => {
    setCourses(c.data)
  })
}, [])

  return (
    <div>
    <Grid container spacing={2}>
  
    {
      courses.map((c, index) => (
        <Grid item xs={12} sm={6} lg={4}>
        <Box
        sx={{
          '&:hover': {
            opacity: [0.8]
          }
        }}
      >
          
    <Card key={index} sx={{ maxWidth: 345 }} aria-owns={open ? 'mouse-over-popover' : undefined}
    aria-haspopup="true"
    onMouseEnter={handlePopoverOpen}
    onMouseLeave={handlePopoverClose}>
    <CardActionArea>    
      <CardMedia
        component="img"
        height="200"
        image={c.CoursePath}
        alt={c.CourseName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {c.CourseName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <Rating name="read-only" value={4} readOnly />
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Course Duration:  <b><Clock size={15}/> {c.CourseDuration}</b>
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
    <Link to={`/student/ChaptersPlaylist/${c.CourseId}`} target='_blank'>Visit</Link>
    </CardActions>
    </Card>
  </Box>
  <Popover
  id="mouse-over-popover"
  sx={{
    pointerEvents: 'none'
  }}
  open={Boolean(anchorEl)}
  anchorEl={anchorEl}
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'right'
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'left'
  }}
  onClose={handlePopoverClose}
  disableRestoreFocus
>
<Box sx={{ width: '100%', maxWidth: 300, p:2 }}>
<Typography variant="subtitle1" gutterBottom>
 Course Name
</Typography>
<Typography variant="subtitle2" gutterBottom>
  Course Author
</Typography>
<Rating name="read-only" value={3} readOnly />
<Typography variant="body1" gutterBottom>
  body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
  blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
  neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
  quasi quidem quibusdam.
</Typography>
<Typography variant="button" display="block" gutterBottom>
  Course Duration
</Typography>
<Typography variant="caption" display="block" gutterBottom>
Course Start Date
</Typography>
<Typography variant="overline" display="block" gutterBottom>
Course End Date
</Typography>
</Box>
</Popover>
</Grid>
  ))
}
</Grid>
    </div>
  )
}

export default Courses
