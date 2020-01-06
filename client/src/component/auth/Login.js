import React, {useState} from 'react';

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const {email, password} = user;


   const onchange = (e) => {
        setUser({...user, [e.target.name] : e.target.value})
    }

   const onSubmit = () => {
        console.log("Login submit")
    }

    return (
        <div className="form-container">
            <h1>Account Login</h1>
  
            <div className="form_group">
                <label>Email</label>
                <input type="email" name="email" value={email} onChange={onchange}  className="input"/>
            </div>
            <div className="form_group">
                <label>Password</label>
                <input type="password" name="password" value={password} onChange={onchange} className="input"/>
            </div>

            <div className="form_group">
                <button className="btn edit_btn">Login</button>
            </div>

        </div>
    )
}

export default Login;