import React, { useEffect, useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import { registerUser, resetAuthState } from "../../store/slices/authSlice";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success, message } = useSelector(
    (state) => state.userData
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetAuthState());
        navigate("/login");
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch, navigate]);

  // ---------- Validation ----------
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email))
      e.email = "Invalid email";
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(form.password))
      e.password = "Password must be at least 6 characters and include letters and numbers";
    if (form.confirm !== form.password) e.confirm = "Password not matched";
    return e;
  };

  // ---------- Input change (auto error clear) ----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eObj = validate();
    if (Object.keys(eObj).length) return setErrors(eObj);

    dispatch(
      registerUser({
        fullName: form.name,
        email: form.email,
        password: form.password,
      })
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-1">Create account</h2>
        <p className="text-sm text-gray-500 mb-6">
          Start shortening links for free
        </p>

        {success && (
          <p className="mb-4 text-green-600 bg-green-50 p-3 rounded">
            {message || "Account created successfully!"}
          </p>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-700 rounded">
            {typeof error === "string" ? error : error.message || "Registration failed. Please try again."}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Full Name"
            name="name"
            value={form.name}
            error={errors.name}
            onChange={handleChange}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            error={errors.email}
            onChange={handleChange}
          />

          <InputField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            error={errors.password}
            onChange={handleChange}
            icon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            }
          />

          <InputField
            label="Confirm Password"
            name="confirm"
            type="password"
            value={form.confirm}
            error={errors.confirm}
            onChange={handleChange}
            icon={<Lock />}
          />

          <Button type="submit" variant="green" className="w-full">
            {loading ? "Creating..." : "Create Account"}
          </Button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link className="text-emerald-600 underline" to="/login">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

// ---------- Reusable Input ----------
const InputField = ({ label, error, icon, ...props }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <div
      className={`flex items-center mt-1 border rounded-lg transition
      ${
        error
          ? "border-red-400"
          : "border-gray-200 focus-within:border-emerald-400"
      }`}>
      <input {...props} className="w-full px-4 py-3 outline-none rounded-lg" />
      {icon && <div className="px-3 text-gray-400">{icon}</div>}
    </div>
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);
