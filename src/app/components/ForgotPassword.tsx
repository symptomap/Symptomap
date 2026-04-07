import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Logo } from "./Logo";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Email validation
    if (!email) {
      setError("Email is required");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Simulate sending password reset email
    console.log("Password reset email would be sent to:", email);
    
    // In a real app, this would call your backend API
    // Example: await sendPasswordResetEmail(email);
    
    setEmailSent(true);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Success Icon */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Check Your Email
              </h1>
              <p className="text-gray-600 mb-2">
                We've sent a password reset link to
              </p>
              <p className="text-gray-900 font-medium">{email}</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-900">
                <span className="font-medium">📧 Next Steps:</span>
              </p>
              <ul className="text-sm text-blue-900 mt-2 ml-4 space-y-1 list-disc">
                <li>Check your inbox (and spam folder)</li>
                <li>Click the reset link in the email</li>
                <li>Create a new password</li>
              </ul>
            </div>

            <Button
              type="button"
              variant="primary"
              className="w-full mb-3"
              onClick={() => navigate("/")}
            >
              Back to Sign In
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => {
                setEmailSent(false);
                setEmail("");
              }}
            >
              Try a Different Email
            </Button>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            Didn't receive the email?{" "}
            <button
              onClick={() => {
                setEmailSent(false);
                console.log("Resending password reset email to:", email);
                setTimeout(() => setEmailSent(true), 100);
              }}
              className="text-blue-600 hover:underline font-medium"
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Logo />
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Forgot Your Password?
            </h1>
            <p className="text-gray-600">
              No worries! Enter your email and we'll send you a reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
            />

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-yellow-900">
                <span className="font-medium">💡 Tip:</span> Make sure to use
                the email address you registered with.
              </p>
            </div>

            <Button type="submit" variant="primary" className="w-full mt-6">
              Send Reset Link
            </Button>
          </form>

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 w-full mt-6 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}