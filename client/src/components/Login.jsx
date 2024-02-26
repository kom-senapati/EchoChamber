import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../App";

function Login() {
  const apiEndpoint = 'http://localhost:3000/'
  const { currentUser, setCurrentUser } = useContext(userInfo);

  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(`${apiEndpoint}user/login`, data)
      console.log(resp)
      if (resp.status === 200 && resp.statusText === 'OK') {
        console.log(resp.data);
        setCurrentUser(resp.data.user);
        navigate('/home')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Welcome Back!</h1>
          <p className="py-6">
            Log in to your EchoChamber account to continue chatting with your
            friends and groups.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name='email'
                placeholder="email"
                className="input input-bordered"
                required
                value={data.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name='password'
                placeholder="password"
                className="input input-bordered"
                required
                value={data.password}
                onChange={handleChange}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
