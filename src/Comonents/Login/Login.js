import { initializeApp } from "firebase/app";
import firebaseConfig from "../Firebaseconfig/firebaseconfig";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";

const app = initializeApp(firebaseConfig)

const Login = () => {
   
  const [user, setUser] = useState([]);
  const [fbUser, setFbUser] = useState([]);
  const provider = new GoogleAuthProvider();
  const handaleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user);
        console.log(user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const fbProvider = new FacebookAuthProvider();
  const handelFacebookSingnIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, fbProvider)
      .then((result) => {
        // The signed-in user info.
        const fbUser = result.user;
        console.log(fbUser.displayName);
        setFbUser(fbUser);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };
  //For gihub
  const ghProvider = new GithubAuthProvider();
  const handelGitHubSingnIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, ghProvider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const [fruser, setFrUser] = useState({
    success: false,
    name: "",
    email: "",
    password: "",
    error: '',
  });
  const [newUser, setNewUser] = useState(false);
  const checkEmail = (e) => {
    let valueTrue = true;
    if (e.target.name === "email") {
      valueTrue = e.target.value;
    }
    if (e.target.name === "password") {
      valueTrue = e.target.value;
    }
    if (valueTrue) {
      const newUser2 = { ...fruser };
      newUser2[e.target.name] = e.target.value;
      setFrUser(newUser2);
    }
  };
  
const [loginUser, setLoginUser] = useContext(UserContext);
const navigate = useNavigate();
const location = useLocation();

  const handelSubmit = (e) => {
    e.preventDefault();
    if (newUser && fruser.email && fruser.password) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, fruser.email, fruser.password)
        .then((res) => {
          // Signed in
          const user = res.user;
          console.log(user);
          const newData = {...fruser};
          newData.success = true;
          setFrUser(newData)
          document.getElementById("mail").value = "";
          document.getElementById("password").value = "";
          // setFrUser()
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const signupError = errorCode && errorMessage;
          const newData = {...fruser};
          newData.success = false;
          newData.error = signupError;
          setFrUser(newData)
          // ..
        });
    }
    if (!newUser && fruser.email && fruser.password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, fruser.email, fruser.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log('signedIn properly')
          const newData = {...fruser};
          newData.success = true;
          setFrUser(newData)
          setLoginUser(newData)
          if(location.state?.from){
            navigate(location.state.from);
          }
          document.getElementById("mail").value = "";
          document.getElementById("password").value = "";
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const signupError = errorCode && errorMessage;
          const newData = {...fruser};
          newData.success = false;
          newData.error = signupError;
          setFrUser(newData)
        });
    }
  };
  return (
    <div style={{textAlign:'center'}}>
      <button onClick={handaleSignIn}>Sign in google</button>
      <br />
      <br />
      <img src={user.photoURL} alt="" />
      <br />
      <br />
      <button onClick={handelFacebookSingnIn}>Sing in with facebook </button>
      <br />
      <br />
      <button onClick={handelGitHubSingnIn}>Sing in with Github </button>
      <br />
      <br />
      {/* Sign up section or sing in section for new user */}
      <input
        type="checkbox"
        name="signup"
        onChange={() => setNewUser(!newUser)}
        id="signup"
      />
      <label htmlFor="signup"> Sign Up</label> <br />
      <form onSubmit={handelSubmit}>
        {newUser && <input type="text" placeholder="Your name" />}
        <br />
        <br />
        Email:
        <input
          type="email"
          name="email"
          id="mail"
          onBlur={checkEmail}
          required
        />
        <br />
        <br />
        Password:{" "}
        <input
          type="password"
          name="password"
          onBlur={checkEmail}
          id="password"
          required
        />
        <br />
        <br />
        <input type="submit" value="Sign in" />
        {/* <p>{fruser}</p> */}
        {console.log(fruser.email, fruser.password)}</form>
        {fruser.success && <p style={{color:'green'}}>signed {!newUser? 'in':'up' } properly</p>}
        {!fruser.success && <p style={{color:'red'}}>{fruser.error}</p>}
      
    </div>
  );
};

export default Login;