import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

function VerifyEmail() {

    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const { verify } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;
    const signupToken = location.state?.signupToken;

    const handleSubmit = async (e) => {

        e.preventDefault();

        const result = await verify({ email, code, signupToken });

        if (result.ok) {
            navigate('/')
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 py-6 sm:py-12 px-4 sm:px-6">
            <div className="max-w-md w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 md:p-8 border border-gray-100 text-center">
                <div className="bg-orange-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <ShieldCheck className="text-orange-600" size={32} />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">E-maili Təsdiqləyin</h2>
                <p className="text-gray-500 mt-2 mb-6 sm:mb-8 text-sm sm:text-base">
                    <strong>{email}</strong> ünvanına 6 rəqəmli kod göndərildi.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <div className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</div>}
                    <input
                        type="text"
                        maxLength="6"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="000000"
                        className="w-full text-center tracking-[0.5em] sm:tracking-[1em] text-xl sm:text-2xl font-bold py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-orange-500 outline-none"
                        required
                    />
                    <button className="w-full bg-black text-white py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base hover:bg-orange-600 transition-all active:scale-[0.98]">
                        Təsdiqlə
                    </button>
                    <p className="text-xs text-gray-400 mt-4 sm:mt-6">
                        Kodu almamısınızsa, spam qovluğunu yoxlayın.
                    </p>
                </form>
            </div>
        </div>
    );
}

export default VerifyEmail;