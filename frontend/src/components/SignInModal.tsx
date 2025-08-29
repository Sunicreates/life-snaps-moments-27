import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function SignInModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-xs relative">
        <button className="absolute top-2 right-2" onClick={onClose}>✕</button>
        <h2 className="text-lg font-bold mb-4">Sign In</h2>
        <form onSubmit={handleEmailSignIn} className="space-y-2">
          <input className="w-full border p-2" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="w-full border p-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">Sign In</button>
        </form>
        <button className="w-full mt-2 bg-red-500 text-white p-2 rounded" onClick={handleGoogleSignIn}>Sign in with Google</button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    </div>
  );
}
