
import { useNavigate } from 'react-router-dom';
import { Hammer, ArrowLeft, Construction } from 'lucide-react';

function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
            <div className="max-w-md w-full text-center space-y-6 sm:space-y-8 animate-in fade-in zoom-in duration-500">

                {/* icon */}
                <div className="relative flex justify-center">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-red-50 rounded-full flex items-center justify-center animate-bounce duration-2000">
                        <Construction size={48} className="text-[#800000]" />
                    </div>
                    <div className="absolute top-0 right-1/4">
                        <Hammer size={24} className="text-amber-500 animate-pulse" />
                    </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                    <h1 className="text-5xl sm:text-6xl font-black text-gray-900">404</h1>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 italic">Bu bölmə üzərində işləyirik</h2>
                    <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
                        Axtardığınız səhifə hazırda yenilənmə mərhələsindədir və ya hələ istifadəyə verilməyib.
                        Sizə daha yaxşı təcrübə təqdim etmək üçün var gücümüzlə çalışırıq!
                    </p>
                </div>

                <div className="pt-4 sm:pt-6">
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-[#800000] text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-red-100 hover:shadow-xl active:scale-95"
                    >
                        <ArrowLeft size={20} />
                        Ana Səhifəyə Qayıt
                    </button>
                </div>

                <p className="text-xs text-gray-400 font-medium tracking-widest uppercase">
                    Tezliklə Xidmətinizdə Olacaq
                </p>
            </div>
        </div>
    )
}

export default NotFound;