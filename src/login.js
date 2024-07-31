 
import { useState, useEffect } from 'react';
import { waveform } from 'ldrs'; 
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios';
import useApiRequest from './hooks/makerequest';
import { useNavigate } from 'react-router-dom';

const Login = () => {  
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');   
const [isLoading, setisLoading] = useState(false);
// const token = sessionStorage.getItem('accessToken') ?? ''; 
const { data , error, loading, makeRequest } = useApiRequest()
const navigate = useNavigate();
const url = process.env.REACT_APP_API;
 // eror of unauthorized access

 

 useEffect(() =>{
  let login = sessionStorage.getItem("accessToken");
    if (login && login !== undefined) {
      navigate("/dashboard");
    }

    let loginstatus = localStorage.getItem("login_error");
    if (loginstatus) {
      toast.error(loginstatus);
      setTimeout(() => {
        localStorage.removeItem('login_error');
      }, 3000);
    }
 }, []);


const handleLogin = async (e) => {
  e.preventDefault(); 
  if (email.trim() === '') { 
    toast.error("Fill in the Email Address")
  }else if(password.trim() === '') {
    toast.error("Fill in the Password")
  }else{  
    const formdata = new FormData(); 
    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('action', 'login');
    setisLoading(true)
    try {
      await toast.promise(
        axios.post(`${url}/login`, formdata),
        {
          loading: 'Logging in...',
          success: (response) => {
            if(response.data.status === 0){
              throw new Error(response.data.message);
            }else{
              console.log(response.data);
              sessionStorage.setItem('accessToken', response.data.token);
              // return 'Login Successful!';
              navigate('/dashboard');
            }
          },
          error: (error) => {
            // console.error(error);
            return `${error.message}`;
          }
        }
      );
      
    } catch(error) {
      console.error(error);
      toast.error(error.message);
    }finally { 
      setPassword('');
      setisLoading(false)
    }
 

  }
}
waveform.register()
  return (
    <div> 
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <div className="themes-wrapper bg-background w-full h-screen flex items-center justify-center px-4">
        <form>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold tracking-tight text-2xl primary">Login</h3>
            <p className="text-sm text-muted-foreground">
              Enter your email below to login to your account.
            </p>
          </div>
          <div className="p-6 pt-0 grid gap-4">
            <div className="grid gap-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="m@example.com"
                required
                value={email}
              />
            </div>
            <div className="grid gap-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder='.....'
                required
              />
            </div>
          </div>
          <div className="flex items-center p-6 pt-0">
            <button type='submit' disabled={isLoading} onClick={handleLogin} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full btn-primary">
              {isLoading ? (
                <l-waveform
                size="35"
                stroke="3.5"
                speed="1" 
                color="white" 
              ></l-waveform>
              ): (
                'Log In'
              )}
            </button>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
