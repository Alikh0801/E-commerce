import React, { useEffect, useState } from 'react';
import { User, Mail, Package, Lock, LogOut, Camera, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { updateMe, updatePassword } from '../api/authService';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
    const { user, loading: authLoading, logout, uptadeLocalUser } = useAuth();
    const navigate = useNavigate();

    const [fullName, setFullName] = useState(user?.fullName || '');
    const [isEditing, setIsEditing] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [activeTab, setActiveTab] = useState('profile');
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordLoading, setPasswordLoading] = useState(false);

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/');
        }
    }, [user, authLoading, navigate]);

    if (authLoading || !user) {
        return null;
    }

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setUpdateLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await updateMe({ fullName });
            if (response.data.ok) {
                uptadeLocalUser({ fullName: response.data.user.fullName });
                setStatus({ type: 'success', message: 'Məlumatlarınız uğurla yeniləndi!' });
                setIsEditing(false);
                setTimeout(() => setStatus({ type: '', message: '' }), 3000);
            }
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.message || 'Xəta baş verdi.'
            });
        } finally {
            setUpdateLoading(false);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setStatus({ type: '', message: '' });

        if (passwordData.newPassword.length < 8) {
            setStatus({
                type: 'error',
                message: 'Yeni şifrə ən azı 8 simvoldan ibarət olmalıdır!'
            });
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setStatus({ type: 'error', message: 'Yeni şifrələr eyni deyil!' });
            return;
        }

        setPasswordLoading(true);
        try {
            const response = await updatePassword(passwordData);
            if (response.data.ok) {
                setStatus({ type: 'success', message: 'Şifrəniz uğurla yeniləndi!' });
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                setTimeout(() => setStatus({ type: '', message: '' }), 3000);
            }
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.message || 'Xəta baş verdi!'
            });
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 min-h-[80vh]">
            <div className="flex flex-col md:flex-row gap-6 lg:gap-8">

                {/* --- left nav --- */}
                <div className="w-full md:w-64 lg:w-1/4 shrink-0 space-y-4">
                    <div className="bg-white rounded-2xl sm:rounded-4xl shadow-sm border border-gray-100 p-4 sm:p-6 text-center">
                        <div className="relative inline-block mb-3 sm:mb-4">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-linear-to-tr from-[#800000] to-amber-500 p-1 rounded-full shadow-xl">
                                <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-white">
                                    <span className="text-2xl sm:text-3xl font-black text-[#800000]">
                                        {user?.fullName?.[0].toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-gray-100 text-gray-600 hover:text-[#800000] transition-transform hover:scale-110">
                                <Camera size={16} />
                            </button>
                        </div>
                        <h2 className="font-bold text-gray-800 text-base sm:text-lg truncate px-2">{user?.fullName}</h2>
                    </div>

                    <nav className="bg-white rounded-2xl sm:rounded-4xl shadow-sm border border-gray-100 p-2 sm:p-3 space-y-1">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-2xl transition-all ${activeTab === 'profile' ? 'bg-[#800000] text-white shadow-lg shadow-red-100' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            <User size={18} /> Profilim
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-2xl transition-all ${activeTab === 'orders' ? 'bg-[#800000] text-white shadow-lg shadow-red-100' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            <Package size={18} /> Sifarişlərim
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-2xl transition-all ${activeTab === 'security' ? 'bg-[#800000] text-white shadow-lg shadow-red-100' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            <Lock size={18} /> Təhlükəsizlik
                        </button>
                    </nav>
                </div>

                {/* --- right nav --- */}
                <div className="flex-1">
                    <div className="bg-white rounded-2xl sm:rounded-[2.5rem] shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8 lg:p-12 min-h-125">

                        {status.message && (
                            <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in zoom-in ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                                {status.type === 'success' && <CheckCircle2 size={18} />}
                                <span className="text-sm font-medium">{status.message}</span>
                            </div>
                        )}

                        {/* Orders Tab */}
                        {activeTab === 'profile' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 sm:mb-10">
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Şəxsi Məlumatlar</h3>
                                        <p className="text-gray-400 text-sm mt-1">Hesab məlumatlarınızı buradan idarə edə bilərsiniz.</p>
                                    </div>
                                    {!isEditing && (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="self-start sm:self-auto px-5 py-2 text-sm font-bold text-[#800000] border border-red-100 rounded-full hover:bg-red-50 transition-colors shrink-0"
                                        >
                                            Düzəliş Et
                                        </button>
                                    )}
                                </div>

                                <form onSubmit={handleUpdateProfile} className="space-y-6 sm:space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Tam Ad Soyad</label>
                                            <input
                                                type="text"
                                                disabled={!isEditing || updateLoading}
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className={`w-full px-6 py-4 rounded-[1.2rem] border-2 outline-none transition-all ${isEditing ? 'bg-white border-[#800000]/20 focus:border-[#800000] shadow-sm' : 'bg-gray-50 border-transparent text-gray-500 cursor-not-allowed'}`}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">E-mail Ünvanı</label>
                                            <div className="relative">
                                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                                <input
                                                    type="email"
                                                    disabled
                                                    value={user?.email}
                                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.2rem] text-gray-400 cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {isEditing && (
                                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-4">
                                            <button
                                                type="submit"
                                                disabled={updateLoading}
                                                className="sm:min-w-35 flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-black text-white rounded-2xl font-bold hover:bg-[#800000] transition-all disabled:opacity-50"
                                            >
                                                {updateLoading ? <Loader2 className="animate-spin" size={20} /> : 'Yadda Saxla'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => { setIsEditing(false); setFullName(user.fullName); }}
                                                className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                                            >
                                                Ləğv Et
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </div>
                        )}

                        {/* Orders Tab */}
                        {activeTab === 'orders' && (
                            <div className="flex flex-col items-center justify-center py-12 sm:py-20 animate-in fade-in zoom-in duration-300">
                                <Package size={56} className="text-gray-100 mb-4" />
                                <h3 className="text-lg font-bold text-gray-800">Sifarişiniz yoxdur</h3>
                                <p className="text-gray-400">Hələ ki, heç bir alış-veriş etməmisiniz.</p>
                            </div>
                        )}

                        {/* Security Tab */}
                        {activeTab === 'security' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-6 sm:mb-8">Təhlükəsizlik Ayarları</h3>
                                <form onSubmit={handleUpdatePassword} className="space-y-6 max-w-md">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Cari Şifrə</label>
                                        <input
                                            type="password"
                                            required
                                            value={passwordData.currentPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                            className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 outline-none focus:border-[#800000] transition-all"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Yeni Şifrə</label>
                                        <input
                                            type="password"
                                            required
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                            className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 outline-none focus:border-[#800000] transition-all"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Yeni Şifrə (Təkrar)</label>
                                        <input
                                            type="password"
                                            required
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                            className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 outline-none focus:border-[#800000] transition-all"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={passwordLoading}
                                        className="w-full py-4 bg-[#800000] text-white rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {passwordLoading ? <Loader2 className="animate-spin" size={20} /> : 'Şifrəni Yenilə'}
                                    </button>
                                </form>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;