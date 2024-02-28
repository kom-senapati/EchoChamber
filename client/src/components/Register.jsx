import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { parseCookies, setCookie } from "nookies";

function Register() {
  const [loading, setLoading] = useState(false);
  const apiEndpoint = "http://localhost:3000/";

  const cookie = parseCookies();
  const userId = cookie["userId"];
  const navigate = useNavigate();
  if (userId !== undefined) {
    navigate("/home");
  }
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    /* console.log(data) */
    try {
      setLoading(true);
      if (data.password !== data.confirm_password) {
        setError("passwords do not match");
        return;
      }
      const resp = await axios.post(`user/register`, {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      if (resp.status == 200 && resp.statusText === "OK") {
        setLoading(false);
        console.log(resp.data);
        alert(resp.data.message);
        setCookie(null, "userId", resp.data.data._id);
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      console.log(setError);
    }

    setData({
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    });
  };
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
        <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
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
            {error !== "" && (
              <p className="text-red-500 text-sm p-1">{error}</p>
            )}
            <div className="form-control mt-3">
              <button type="submit" className="btn btn-accent">
                {loading ? (
                  <span className="loading loading-infinity loading-lg"></span>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
          <div className="card-body inline-block pt-0">
            Already a User ?{" "}
            <Link to="/login" className="hover:text-accent">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
