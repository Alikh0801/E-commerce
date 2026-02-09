import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function ResetPassword() {
    const { token } = useParams();
    const { updatePassword } = useAuth();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 8) {
            return setError('Şifrə ən az 8 simvoldan ibarət olmalıdır!')
        }

        const result = await updatePassword(token, password);

        if (result.ok) {
            alert('Şifrə uğurla yeniləndi!');
            navigate('/login')
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-[calc(90vh-80px)] flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800">Yeni Şifrə</h2>
                    <p className="text-gray-500 mt-2">Yeni şifrənizi daxil edin</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {error && <div className="text-red-600 text-sm text-center">{error}</div>}
                    <button type="submit" className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-all">
                        Şifrəni Yenilə
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword;