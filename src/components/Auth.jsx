"use client"
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

const Auth = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const router = useRouter();

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError("make sure passwords match!");
      return;
    } 
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/${endpoint}`,
      {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();

    if (data.msg){
      setError(data.msg);
      return
    }
    try {
      await navigationAndCookiesLoader(data)
    } catch (error) {
      console.error('Error setting cookies:', error);
      setError('An error occurred while logging in.');
    }
};

//make a function which takes the cookies and check if they're already setted up
  const navigationAndCookiesLoader = async (cookies) =>{
      if(cookies && cookies.email && cookies.token){
        setCookie("Email", cookies.email);
        setCookie("AuthToken", cookies.token);
        await pushPath()
        
        // if(cookies.token.length && cookies.email.length){
        //   router.push(`${process.env.NEXT_PUBLIC_PAGE_URL}/todos/${cookies.email}`)
        // }
      }
      else{
        setError("There was a problem! be patience, we're working for you (:")
      }
  };

  const pushPath = async (obj) => {
    if(obj.token.length && obj.email.length){
      router.push(`${process.env.NEXT_PUBLIC_PAGE_URL}/todos/${cookies.email}`)
    }
    else{
      router.push(`${process.env.NEXT_PUBLIC_PAGE_URL}`)
    }
  }
  
  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          {isLogin ? "log in" : "sign up"}
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            className="create"
            onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}
            value='submit'
          />
          {error && <p style={{ color: "red" }}>something happend!: {error}</p>}
        </form>

        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor: !isLogin
                ? "rgb(94, 119, 243)"
                : "rgb(188,188,188)",
            }}
          >
            sign up
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor: isLogin
                ? "rgb(94, 119, 243)"
                : "rgb(188,188,188)",
            }}
          >
            log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
