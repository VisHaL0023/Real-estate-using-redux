import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isOTPEnable, setIsOTPEnable] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const handleOTPSend = async (e) => {
        e.preventDefault();
        console.log("otp");
        try {
            if (!(formData.email && formData.email.match(isValidEmail))) {
                return false;
            }
            setLoading(true);
            const res = await fetch("/v1/auth/sendotp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log(data);
            if (data.success === false) {
                setLoading(false);
                setError(data.message);
                return;
            }
            setLoading(false);
            setError(null);
            setIsOTPEnable(true);
            // navigate("/sign-in");
        } catch (error) {
            setLoading(false);
            setError(error.message);
            setIsOTPEnable(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("form", formData);
        try {
            setLoading(true);
            const res = await fetch("/v1/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log(data);
            if (data.success === false) {
                setLoading(false);
                setError(data.message);
                return;
            }
            setLoading(false);
            setError(null);
            navigate("/sign-in");
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {!isOTPEnable ? (
                    <>
                        <input
                            type="text"
                            placeholder="First name"
                            className="border p-3 rounded-lg"
                            id="firstName"
                            required
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="border p-3 rounded-lg"
                            id="lastName"
                            required
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            placeholder="email"
                            className="border p-3 rounded-lg"
                            id="email"
                            name="email"
                            required
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder="password"
                            className="border p-3 rounded-lg"
                            id="password"
                            name="password"
                            required
                            onChange={handleChange}
                        />
                    </>
                ) : (
                    <input
                        type="text"
                        placeholder="Enter OTP here"
                        className="border p-3 rounded-lg"
                        id="otp"
                        minLength={6}
                        maxLength={6}
                        onChange={handleChange}
                    />
                )}

                <button
                    disabled={loading}
                    onClick={!isOTPEnable ? handleOTPSend : handleSubmit}
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                >
                    {loading
                        ? "Loading..."
                        : !isOTPEnable
                        ? "Verify Email"
                        : "Sign Up"}
                </button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Have an account?</p>
                <Link to={"/sign-in"}>
                    <span className="text-blue-700">Sign in</span>
                </Link>
            </div>
            {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
    );
}
