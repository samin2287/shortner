import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";

// -------------------- Login Form Component --------------------
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    const err = {};
    if (!email.trim()) err.email = "Email is required";
    if (!password) err.password = "Password is required";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;

    setLoading(true);
    setErrorMessage("");

    // Fake auth call
    setTimeout(() => {
      setLoading(false);
      if (email === "user@example.com" && password === "password") {
        // success -> navigate to home
        navigate("/", { replace: true });
      } else {
        setErrorMessage(
          "Invalid email or password. Try user@example.com / password for demo."
        );
      }
    }, 900);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-green-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome back</h2>
        <p className="text-sm text-gray-500 mb-6">
          Log in to access your dashboard and shorten URLs.
        </p>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-700 rounded">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div
              className={`flex items-center border ${
                errors.email ? "border-red-200" : "border-gray-200"
              } rounded-lg overflow-hidden`}>
              <div className="p-3 bg-gray-50">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 outline-none"
                type="email"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div
              className={`flex items-center border ${
                errors.password ? "border-red-200" : "border-gray-200"
              } rounded-lg overflow-hidden`}>
              <div className="p-3 bg-gray-50">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full px-4 py-3 outline-none"
                type="password"
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <Button type="submit" variant="green" size="lg" className="w-full">
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </div>

          <p className="text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-emerald-600 underline">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
