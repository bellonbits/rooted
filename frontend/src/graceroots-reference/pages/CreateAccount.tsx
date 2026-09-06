import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(true);

  return (
    <div className="app-shell bg-cream-50 flex flex-col">
      <div className="px-7 pt-12 pb-6">
        <h1 className="font-serif text-[26px] text-ink">Create Account</h1>
        <p className="mt-2 text-[14px] text-ink/55">
          Join our warm, faith-filled parent community today.
        </p>
      </div>

      <form
        className="px-7 flex-1 flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/home");
        }}
      >
        <label className="text-[13px] font-medium text-ink/70 mb-1.5">Full Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Sarah Jenkins"
          className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-[14px] mb-4 outline-none focus:border-forest-400 placeholder:text-ink/30"
        />

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
          className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-[14px] mb-4 outline-none focus:border-forest-400 placeholder:text-ink/30"
        />

        <label className="flex items-start gap-2.5 text-[13px] text-ink/55 mb-6 leading-relaxed">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 accent-forest-500"
          />
          I agree to the <span className="text-forest-600 underline">Terms of Service</span> &{" "}
          <span className="text-forest-600 underline">Privacy Policy</span>
        </label>

        <button
          type="submit"
          className="w-full bg-forest-500 hover:bg-forest-600 text-cream-50 rounded-full py-3.5 font-medium text-[15px] transition-colors"
        >
          Create Account
        </button>

        <div className="flex items-center gap-3 my-5">
          <div className="h-px flex-1 bg-cream-300" />
          <span className="text-xs text-ink/40">or sign up with</span>
          <div className="h-px flex-1 bg-cream-300" />
        </div>

        <div className="flex gap-3 mb-6">
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
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="text-forest-600 font-medium"
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
}
