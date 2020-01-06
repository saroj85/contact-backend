import React, {useState, useContext} from 'react';
import AlertContext from '../../context/alert/alertContext';


const Register = () => {
    const alertContext = useContext(AlertContext)

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })
    const {name, email, password, password2} = user;

   const onchange = (e) => {
        setUser({...user, [e.target.name] : e.target.value})
    }
    
   const onSubmit = () => {
       if(name === "" || email === "" || password === ""){
        alertContext.setAlert("please Enter all field", "danger")
       }
       if (password !== password2) {
           alertContext.setAlert("Password dose't match ", "danger")
           
       } else {
           
       }
        console.log("Register submit")
    }

    return (
        <div className="form-container">
            <h1>Account Register</h1>
            <div className="form_group">
                <label>Name</label>
                <input type="text" name="name" value={name} onChange={onchange} className="input"/>
            </div>
            <div className="form_group">
                <label>Email</label>
                <input type="email" name="email" value={email} onChange={onchange} className="input"/>
            </div>
            <div className="form_group">
                <label>Password</label>
                <input type="password" name="password" value={password} onChange={onchange} className="input" />
            </div>
            <div className="form_group">
                <label>Re Password</label>
                <input type="text" name="password2" value={password2} onChange={onchange} className="input"/>
            </div>
            <div className="form_group">
                <button className="btn edit_btn" onClick={onSubmit}>Register</button>
            </div>

        </div>
    )
}

export default Register;