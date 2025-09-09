import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
	const [isLogin, setIsLogin] = useState(true);
	const [form, setForm] = useState({ email: "", password: "" });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
			const res = await fetch(endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Auth failed");
			localStorage.setItem("jwt", data.token);

					// Always clear old clubData before fetching new
					localStorage.removeItem("clubData");
					// Fetch club info by email (adjust endpoint as needed)
					const clubRes = await fetch(`/api/clubs/by-email/${encodeURIComponent(form.email)}`, {
						headers: { Authorization: `Bearer ${data.token}` },
					});
					const clubData = await clubRes.json();
					if (!clubRes.ok) throw new Error(clubData.message || "Failed to fetch club info");
					// Store only needed fields for Sidebar
					localStorage.setItem("clubData", JSON.stringify({
						name: clubData.clubName,
						logo: clubData.clubLogo,
						id: clubData._id,
					}));
					// Force reload to ensure Sidebar picks up new clubData
					window.location.href = "/dashboard";
		} catch (err) {
			setError(err.message);
		}
		setLoading(false);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-900">
			<form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
				<h2 className="text-2xl font-bold text-white mb-4">{isLogin ? "Club Login" : "Club Registration"}</h2>
				<input
					className="w-full p-2 rounded bg-gray-700 text-white"
					name="email"
					type="email"
					placeholder="Email"
					value={form.email}
					onChange={handleChange}
					required
				/>
				<input
					className="w-full p-2 rounded bg-gray-700 text-white"
					name="password"
					type="password"
					placeholder="Password"
					value={form.password}
					onChange={handleChange}
					required
				/>
				{error && <div className="text-red-400 text-sm">{error}</div>}
				<button
					type="submit"
					className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
					disabled={loading}
				>
					{loading ? (isLogin ? "Logging in..." : "Registering...") : (isLogin ? "Login" : "Register")}
				</button>
				<div className="text-gray-400 text-sm text-center">
					{isLogin ? (
						<>
							Don't have an account?{' '}
							<button type="button" className="underline" onClick={() => setIsLogin(false)}>Register</button>
						</>
					) : (
						<>
							Already have an account?{' '}
							<button type="button" className="underline" onClick={() => setIsLogin(true)}>Login</button>
						</>
					)}
				</div>
			</form>
		</div>
	);
}
