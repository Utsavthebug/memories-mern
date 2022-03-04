import React,{useEffect, useState} from 'react'
import useStyles from './styles'
import { TextField,Button,Typography,Paper } from '@material-ui/core'
import FileBase64 from 'react-file-base64';
import {useDispatch,useSelector} from 'react-redux';
import {createPost,updatedPost} from "../../actions/posts"


const Form = ({currentId,setCurrentId}) => {
  const classes = useStyles()
  const post = useSelector((state)=> currentId? state.posts.find((p)=>p._id === currentId):null)
  const [postData,setPostData] = useState({
    creator : '',
    title:'',
    message:'',
    tags:'',
    selectedFile:''
  })
  const user = JSON.parse(localStorage.getItem('profile'))



  useEffect(()=>{
    if(post) setPostData(post)
  },[post])

  const dispatch = useDispatch()

  const handleSubmit = (e)=>{
    e.preventDefault()

    if(currentId){
      dispatch(updatedPost(currentId,{...postData,name:user?.result?.name}))
    }

    else {
      dispatch(createPost({...postData,name:user?.result?.name}))
    }
    clear();
    
  }

  const clear = ()=> {
    setCurrentId(null)
    setPostData(
      {
        creator : '',
        title:'',
        message:'',
        tags:'',
        selectedFile:''
      }
    )
  }
  
  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' className={`${classes.root} ${classes.form}`} noValidate className='classes.form' onSubmit={handleSubmit}>
      <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'}</Typography>

      <TextField 
      name="creator" 
      variant='outlined'
       label="Creator" 
       fullWidth
       value={postData.creator}
       onChange={(e)=>setPostData({...postData,creator:e.target.value})}
       />

<TextField 
      name="title" 
      variant='outlined'
       label="Title" 
       fullWidth
       value={postData.title}
       onChange={(e)=>setPostData({...postData,title:e.target.value})}
       />


<TextField 
      name="message" 
      variant='outlined'
       label="Message" 
       fullWidth
       value={postData.message}
       onChange={(e)=>setPostData({...postData,message:e.target.value})}
       />


<TextField 
      name="tags" 
      variant='outlined'
       label="Tags" 
       fullWidth
       value={postData.tags}
       onChange={(e)=>setPostData({...postData,tags:e.target.value.split(',')})}
       />

    <div className={classes.fileInput}>
    <FileBase64
        type="file"
        multiple={ false }
        onDone={({base64})=>setPostData({...postData,selectedFile:base64})}/>
    </div>

    <Button className={classes.buttonSubmit} variant="contained" type='submit' color='primary' size='large' fullWidth>submit</Button>
    <Button  variant="contained" type='submit' color='primary' size='large' fullWidth>clear</Button>
      </form>

    </Paper>
  )
}

export default Form