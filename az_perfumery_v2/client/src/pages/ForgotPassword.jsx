import React, { useState } from 'react'
import { Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [isWaiting, setIsWaiting] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const { sendForgotPasswordEmail } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isWaiting) return;

        setStatus({ type: 'loading', msg: 'Göndərilir...' })

        const result = await sendForgotPasswordEmail(email);

        if (result.ok) {
            setStatus({ type: 'success', msg: 'Bərpa linki emailinizə göndərildi!' });
            setIsWaiting(true);
            setCountdown(60); //60 saniyelik qadaga

            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setIsWaiting(false);
                        return 0;
                    }
                    return prev - 1;
                })
            }, 1000)

        } else {
            setStatus({ type: 'error', msg: result.message })
        }
    }

    return (
        <div className="min-h-[calc(90vh-80px)] flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800">Şifrəni unutmusunuz?</h2>
                    <p className="text-gray-500 mt-2">E-mail ünvanınızı daxil edin, sizə təlimat göndərək.</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label className="block text-sm font-medium text-gray-700 mb-2">E-mail Ünvanı</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                required
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    {status.msg && (
                        <div className={`p-4 rounded-md text-sm ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {status.msg}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={status.type === 'loading' || isWaiting}
                        className={`w-full py-3 rounded-xl font-bold transform transition-all active:scale-[0.98] shadow-lg shadow-orange-100 ${isWaiting || status.type === 'loading'
                                ? 'bg-gray-400 cursor-not-allowed text-white'
                                : 'bg-black text-white hover:bg-orange-600'
                            }`}
                    >
                        {isWaiting ? `Yenidən göndər (${countdown}s)` : 'Linki Göndər'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <Link to="/login" className="text-sm text-gray-500 hover:text-orange-600 flex items-center justify-center gap-2">
                        <ArrowLeft size={16} /> Girişə qayıt
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;