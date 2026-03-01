import React from 'react';
import { ShieldCheck, Truck, Headphones, Award } from 'lucide-react';

const features = [
    {
        icon: ShieldCheck,
        title: 'Orijinal məhsullar',
        description: 'Bütün ətirlər rəsmi təchizatçılardan, zəmanətli orijinallıq.',
    },
    {
        icon: Truck,
        title: 'Sürətli çatdırılma',
        description: 'Bakı üzrə 1–2 gün, regionlara sifarişlər 3–5 iş günü ərzində.',
    },
    {
        icon: Headphones,
        title: 'Müştəri dəstəyi',
        description: 'Seçim və sifariş üçün peşəkar məsləhət, həmişə əlaqədə.',
    },
    {
        icon: Award,
        title: 'Keyfiyyət zəmanəti',
        description: 'Hər məhsul üçün keyfiyyət təminatı və rahat geri qaytarma.',
    },
];

function WhyUs() {
    return (
        <section className="relative overflow-hidden bg-linear-to-b from-gray-50 to-white py-16 sm:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(6,78,59,0.04),transparent)] pointer-events-none" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-14">
                    <span className="inline-block text-[#064e3b] font-semibold text-sm uppercase tracking-wider mb-3">
                        Üstünlüklər
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                        Niyə biz?
                    </h2>
                    <p className="mt-3 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                        Keyfiyyət, etibar və rahat alış-veriş — sizin üçün ən önəmlidir.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {features.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className="group relative bg-white rounded-2xl border border-gray-100 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-[#064e3b]/20 transition-all duration-300"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-14 h-14 rounded-2xl bg-[#064e3b]/10 text-[#064e3b] flex items-center justify-center mb-4 group-hover:bg-[#064e3b] group-hover:text-white transition-colors duration-300">
                                        <Icon className="w-7 h-7" strokeWidth={1.75} />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 text-lg mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default WhyUs;
