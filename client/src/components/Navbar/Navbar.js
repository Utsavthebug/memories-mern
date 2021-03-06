import {AppBar,Avatar,Button,Toolbar,Typography} from "@material-ui/core"
import useStyles from './styles'
import React,{useState,useEffect} from 'react'
import memories from '../../images/memories.png'
import { useDispatch } from "react-redux"
import { Link,useNavigate,useLocation} from "react-router-dom"

const Navbar = () => {
    const classes = useStyles();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const logout = ()=> {
      dispatch({type:"LOGOUT"})
      navigate("/")
      setUser(null)
    }


    useEffect(()=>{
      const token = user?.token
      console.log(token)
      //JWT...
      
      setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
    <div className={classes.brandContainer}>
    <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>
      Memories
    </Typography>
    <img className={classes.image} src={memories} alt='memories' height="60"/>
    </div>

    <Toolbar className={classes.toolbar}>
    {user ? (
        <div className={classes.profile}>
           <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
               {user.result.name.charAt[0]}
               </Avatar>      
       <Typography variant="h6" className={classes.userName}>{user.result.name}</Typography>
       <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
        </div>
    ) : (
    <Button component={Link} to="/auth" variant="container" color="primary">Sign up</Button>
    )}
    </Toolbar>
    </AppBar>
  )
}

export default Navbar