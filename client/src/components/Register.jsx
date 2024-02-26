import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  const [error, setError] = useState('');

  const handleOnChange = (e) => {
    setData((prev) => ({...prev, [e.target.name] : e.target.value}))
    console.log(data)
  }
  const handleOnSubmit = async(e) => {
    e.preventDefault()
    console.log(data)

   
    try {
      if(data.password !== data.confirm_password){
        setError('passwords do not match');
        return
      }

      const resp = await axios.post('/user/register',{
        username: data.username,
        email: data.email,
        password: data.password
      })
      console.log(resp)
      navigate('/login')
    } catch (error) {
      console.log(setError)
    }
    
    setData({
      username: '',
      email: '',
    password: '',
    confirm_password: ''
    })
  }
console.log(data)
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Join EchoChamber!</h1>
          <p className="py-6">
            Join our community today and start chatting with your friends and
            groups in real-time.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleOnSubmit}>
          <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="username"
                name="username"
                placeholder="Username"
                className="input input-bordered"
                required
                value={data.username}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                required
                value={data.email}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered"
                required
                value={data.password}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                className="input input-bordered"
                required
                value={data.confirm_password}
                onChange={handleOnChange}
              />
            </div>
            {
              error !== '' &&
            <p className="text-red-500 text-sm p-1">{error}</p>
            }
            <div className="form-control mt-3">
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
