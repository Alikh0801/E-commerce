import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const { register } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const cleanPhone = formData.phone.replace(/\s+/g, '')
        const phoneRegex = /^(50|51|55|70|77|99|10|60)\d{7}$/;

        if (!phoneRegex.test(cleanPhone)) {
            setError('Mobil nömrə və ya operator kodu yanlışdır!(Məs: 501234567)')
            return;
        }

        if (formData.password.length < 8) {
            setError('Şifrə 8 simvoldan az olmamalıdır!');
            return;
        }

        const finalData = {
            ...formData,
            phone: `+994${cleanPhone}`
        };

        const result = await register(finalData);

        if (result.ok) {
            navigate('/verify-email', {
                state: {
                    email: formData.email,
                    signupToken: result.signupToken
                }
            });
        } else {
            setError(result.message || 'Qeydiyyat zamanı xəta baş verdi!')
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] overflow-y-auto flex items-center justify-center bg-gray-50 py-6 sm:py-12 px-4 sm:px-6">
            <div className="max-w-lg w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 md:p-8 border border-gray-100">

                <div className="text-center mb-8 sm:mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Hesab Yaradın</h2>
                    <p className="text-gray-500 mt-2">Sürətli alış-veriş üçün qeydiyyatdan keçin</p>
                </div>

                <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 text-red-700 text-sm rounded">
                            {error}
                        </div>
                    )}

                    {/* Fullname */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-2">Ad və Soyad</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                name='fullName'
                                value={formData.fullName}
                                onChange={handleChange}
                                type="text"
                                required
                                placeholder="Ad və Soyad məlumatlarınızı daxil edin"
                                className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-2">E-mail</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                placeholder="xxxx@gmail.comm"
                                className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    {/* Telefon (Azerbaycan kodu mecburi) */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-2">Mobil Telefon</label>
                        <div className="relative flex items-center">
                            <Phone className="absolute left-3 text-gray-400" size={20} />
                            {/* Tel code */}
                            <span className="absolute left-10 text-gray-700 font-medium border-r pr-2 border-gray-300">
                                +994
                            </span>
                            <input
                                name='phone'
                                value={formData.phone}
                                onChange={handleChange}
                                type="tel"
                                required
                                placeholder="50 000 00 00"
                                className="w-full pl-24 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-2">Şifrə</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-12 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Accept terms */}
                    <div className="flex items-start gap-2 py-2">
                        <input type="checkbox" required id="terms" className="mt-1 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer" />
                        <label htmlFor="terms" className="text-sm text-gray-600 leading-tight">
                            <a href="/terms" className="text-orange-600 hover:underline">İstifadəçi qaydaları</a> ilə razıyam.
                        </label>
                    </div>

                    {/* Regisrer Buton */}
                    <button className="w-full bg-black text-white py-2.5 sm:py-3.5 rounded-xl font-bold hover:bg-orange-600 transform transition-all active:scale-[0.98] shadow-lg shadow-gray-200 text-sm sm:text-base">
                        Qeydiyyatı Tamamla
                    </button>
                </form>

                {/* Rout Login */}
                <p className="text-center mt-6 sm:mt-8 text-gray-600 text-sm sm:text-base">
                    Artıq hesabınız var?{' '}
                    <a href="/login" className="text-orange-600 font-bold hover:underline">Daxil olun</a>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;