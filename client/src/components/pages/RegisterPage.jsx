import Login from "../Login";
import Register from "../Register";

function RegisterPage() {
  let registered = false;
  return <>{registered ? <Login /> : <Register />}</>;
}
export default RegisterPage;
