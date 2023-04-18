import React, {useState} from 'react'
import './signup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Signup(){
    const navigate=useNavigate();

    const [user, setUser]=useState({
        firstName:"",
        lastName: "",
        age: "",
        gender: "",
        role: "",
        phone: "",
        email: "",
        password: "",
        reEnterPassword: ""
    });

    const handleChange = e => {
        const {name, value}=e.target;
        setUser({
            ...user,
            [name]: value,
        })
    }
    
    console.log(email);

    const signup=()=>{
        const {firstName, lastName, age, gender, role, phone, email, password, reEnterPassword}=user;
        
        if(firstName && lastName && age && gender && role && phone && email && password && (password===reEnterPassword)){
            axios.post("http://localhost:3000/users/signup", user).then(res=>console.log(res));
            alert("User created!");
            navigate('/login');
        }
        else{
            alert("Invalid input");
        }

    }

    return(
        <div className="register">
            <h1>Signup</h1>
            <input type="text" name="firstName" value={user.firstName} placeholder="Your First Name" onChange={handleChange}></input>
            <input type="text" name="lastName" value={user.lastName} placeholder="Your Last Name" onChange={handleChange}></input>
            <input type="text" name="age" value={user.age} placeholder="Your Age" onChange={handleChange}></input>
            <input type="text" name="gender" value={user.gender} placeholder="Your Gender" onChange={handleChange}></input>
            <input type="text" name="role" value={user.role} placeholder="Your Role" onChange={handleChange}></input>
            {/* <fieldset>
                <legend>Choose your gender:</legend>
                    <div>
                        <input type="checkbox" className='radio' name="gender" value="Male"></input>
                            <label for="Male">Male</label>
                    </div>

                    <div>
                        <input type="checkbox" className='radio' name="gender" value="Female"></input>
                        <label for="Female">Female</label>
                    </div>
            </fieldset>
            <fieldset>
                <legend>Choose your role:</legend>
                    <div>
                        <input type="checkbox" className='radio' name="role" value="Player"></input>
                            <label for="Male">Player</label>
                    </div>

                    <div>
                        <input type="checkbox" className='radio' name="role" value="Captain"></input>
                        <label for="Female">Captain</label>
                    </div>
            </fieldset> */}
            <input type="text" name="phone" value={user.phone} placeholder="Your 11-digit Phone No." onChange={handleChange}></input>
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handleChange}></input>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={handleChange}></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange}></input>
            <div className="button" onClick={signup}>Register</div>
            <div>or</div>
            <div className="button" onClick={()=>navigate('/login')}>Login</div>
        </div>
    );
}