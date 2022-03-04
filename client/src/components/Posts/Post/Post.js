import React from 'react'
import { Card,CardActions,CardContent,CardMedia,Button,Typography } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import useStyles from './styles'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../actions/posts';
import { likePost } from '../../../actions/posts';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';


const Post = ({post,setCurrentId}) => {
  const dispatch = useDispatch()
  const classes = useStyles()  
  const user = JSON.parse(localStorage.getItem('profile'))

  const Likes = () =>{
    if(post.likes.length > 0){
      return post.likes.find((like)=> like===(user?.result?.googleId || user?.result?._id))
      ? (
        <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
      ) :
      (
      
      <>
      <ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
        </>
      )
    }
  }


  return (
   <Card className={classes.card}>
     <CardMedia className={classes.media} image={Post.selectedFile} title={post.title}/>
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>

    {(user?.result?.googleId === post?.creator || user?.result?._id ===post?.creator)&&(

<div className={classes.overlay2}>
<Button style={{color:'white'}} size="small" onClick={()=>setCurrentId(post._id)}>
  <MoreHorizIcon fontSize="medium"/>
</Button>
</div>
    )}
    
      <div className={classes.details}>
     <Typography variant='body2' color='textSecondary'>
    {post.tags.map((tag) => `#${tag}`)}
     </Typography>
      </div>

    <CardContent>
    <Typography className={classes.title} variant='h5' gutterBottom>
      {post.message}
    </Typography>
    </CardContent>

    <CardActions className={classes.cardActions}>
    <Button size='small' color='primary' onClick={()=>dispatch(likePost(post._id))}> 
      <ThumbUpAltIcon fontSize='small'/>
      <Likes/>
      </Button>

    {
      (user?.result?.googleId === post?.creator || user?.result?._id ===post?.creator) && (
        <Button size='small' color='primary' disabled={!user?.result} onClick={()=>dispatch(deletePost(post._id))}> 
        <DeleteIcon fontSize="medium"/>
        Delete
      </Button>
      )
    }
    </CardActions>

   </Card>
  )
}

export default Post