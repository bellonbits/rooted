import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="app-shell bg-cream-50 flex flex-col">
      <div className="px-7 pt-14 pb-8">
        <h1 className="font-serif text-[26px] text-ink">Welcome Back</h1>
        <p className="mt-2 text-[14px] text-ink/55">
          Sign in to grow and connect with other Christian families.
        </p>
      </div>

      <form
        className="px-7 flex-1 flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/home");
        }}
      >
        <label className="text-[13px] font-medium text-ink/70 mb-1.5">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="sarah@example.com"
          className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-[14px] mb-4 outline-none focus:border-forest-400 placeholder:text-ink/30"
        />

        <label className="text-[13px] font-medium text-ink/70 mb-1.5">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-[14px] outline-none focus:border-forest-400 placeholder:text-ink/30"
        />

        <button type="button" className="self-end mt-2 text-[13px] text-forest-600 font-medium">
          Forgot Password?
        </button>

        <button
          type="submit"
          className="w-full bg-forest-500 hover:bg-forest-600 text-cream-50 rounded-full py-3.5 font-medium text-[15px] mt-6 transition-colors"
        >
          Sign In
        </button>

        <div className="flex items-center gap-3 my-5">
          <div className="h-px flex-1 bg-cream-300" />
          <span className="text-xs text-ink/40">or continue with</span>
          <div className="h-px flex-1 bg-cream-300" />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="flex-1 border border-cream-300 rounded-full py-3 text-[13px] font-medium text-ink/70"
          >
            Continue with Google
          </button>
          <button
            type="button"
            className="flex-1 border border-cream-300 rounded-full py-3 text-[13px] font-medium text-ink/70"
          >
            Continue with Apple
          </button>
        </div>

        <p className="text-center text-[13px] text-ink/55 mt-auto pb-8">
          New to GraceRoots?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-forest-600 font-medium"
          >
            Create Account
          </button>
        </p>
      </form>
    </div>
  );
}
