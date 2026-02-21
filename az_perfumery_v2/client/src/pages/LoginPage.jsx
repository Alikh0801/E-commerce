import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();


    // Login submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = await login({ email, password, rememberMe });

        if (result && result.ok) {
            navigate('/');
        } else {
            setError(result.message || 'Giriş zamanı xəta baş verdi!');
        }
    };

    return (
        <div className="min-h-[calc(90vh-80px)] flex items-center justify-center bg-gray-50 px-4 sm:px-6 py-6 sm:py-8">
            <div className="max-w-md w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 md:p-8 border border-gray-100">

                {/* Başlıq */}
                <div className="text-center mb-8 sm:mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Xoş Gəldiniz!</h2>
                    <p className="text-gray-500 mt-2">Davam etmək üçün hesabınıza daxil olun</p>
                </div>

                <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>

                    {/* Email */}

                    <div className="flex flex-col">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            E-mail Ünvanı
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                required
                                placeholder="xxxx@gmail.com"
                                className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Password */}

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-2">Şifrə</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="••••••••"
                                className="w-full pl-10 pr-12 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {/* Forgot-password */}

                        <div className="flex justify-end mt-2">
                            <Link to="/forgot-password" className="text-sm text-orange-600 hover:underline transition-colors">
                                Şifrəni unutmusunuz?
                            </Link>
                        </div>
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Məni xatırla</label>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-md flex items-center gap-3 animate-shake">
                            <span className="text-red-700 text-sm font-medium">{error}</span>
                        </div>
                    )}

                    {/* Daxil Ol Butonu */}
                    <button
                        type='submit'
                        className="w-full bg-black text-white py-2.5 sm:py-3 rounded-xl font-bold hover:bg-orange-600 transform transition-all active:scale-[0.98] shadow-lg shadow-orange-100 text-sm sm:text-base">
                        Daxil Ol
                    </button>
                </form>

                {/* Register */}

                <p className="text-center mt-6 sm:mt-8 text-gray-600 text-sm sm:text-base">
                    Hesabınız yoxdur?{' '}
                    <Link to="/register" className="text-orange-600 font-bold hover:underline">Qeydiyyatdan keçin </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;