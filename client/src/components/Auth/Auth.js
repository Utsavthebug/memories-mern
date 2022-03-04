import React,{useState} from 'react'
import { Avatar,Button,Paper,Grid,Typography,Container} from '@material-ui/core'
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'
import {GoogleLogin} from 'react-google-login';
import Icon from './icon'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import {signin,signup} from '../../actions/auth';

const initialState = {firstName:'',lastName:'',email:'',password:'',confirmPassword:''}



const Auth = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  let navigate = useNavigate(initialState);

  const [showPassword,setshowPassword] = useState(false)
  const [isSignup,setSignup] = useState(false)
  const [formData,setFormData] = useState()

  const handleShowPassword = () => setshowPassword((prev)=>!prev)
  const handleSubmit =(e)=> {
    e.preventDefault()

  }

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
    
    if(isSignup){
      dispatch(signup(formData))
    }
    else{
      dispatch(signin(formData))
    }
  
  }

  const switchMode = () => setSignup(((prev)=>!prev))

  const googleFailure =()=> {
    console.log('Google sign in Failure')
  }

  const googleSuccess =async (res) => {
    //optional chaining 
    const result = res?.profileObj
    const token = res?.tokenId

    try {
      dispatch({type:'AUTH',data:{result,token}})
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <Container component="main"  maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
        <LockOutlinedIcon/>      
        </Avatar>
      <Typography variant="h5">
       {isSignup ? 'Sign Up' : 'Sign In '} 
      </Typography>

    <form className={classes.form} onSubmit={handleSubmit}>
    <Grid container spacing={2}>
    { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
    </Grid>
    <Button type="submit" variant="contained" color='primary' fullWidth className={classes.submit}>
      {isSignup ? 'Sign up' : 'Sign in'}
    </Button>

    <GoogleLogin
    clientId="562178873949-jbrqb55idhtjtb4193dhbsn4hbtgiaiu.apps.googleusercontent.com"
     render={renderProps => (
      <Button
      className={classes.googleButton} 
      color="primary"
      onClick={renderProps.onClick} 
      disabled={renderProps.disabled}
      startIcon={<Icon/>}
      fullWidth
      variant="contained"
      >
        Google Sign In 
      </Button>
    )}
    onSuccess={googleSuccess}
    onFailure={googleFailure}
    cookiePolicy={'single_host_origin'}
    />

    </form>
      <Grid container>
      <Grid item>
      <Button onClick={switchMode}>
      {isSignup ? 'Already have an account? Sign In':"Don't have an account ? Sign Up"}
      </Button>
      </Grid>
      </Grid>
      </Paper>
    </Container>
  )
}

export default Auth