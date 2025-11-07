'use client';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer dir='rtl' className="border-t border-white/[0.08] bg-black/20 py-7">
            <div className="max-w-[1200px] mx-auto px-5">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-4 items-start mb-4">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-[38px] h-[38px] rounded-xl" style={{
                                background: 'conic-gradient(from 210deg at 50% 50%, #824dee, #351b67)'
                            }}></div>
                            <div>
                                <strong>دیپاد</strong>
                                <div className="text-[#9aa0b6] text-sm mt-1">ذخیره‌سازی آفلاین امن — مثل ابر، اما آفلاین</div>
                            </div>
                        </div>
                        <p className="text-[#9aa0b6] max-w-[56ch] m-0">
                            مالک ایده و کسب‌وکار: شرکت رایان پرداز سیستم نور ایرانیان — این نسخه یک دموی طراحی است و اطلاعات تماس نمونه می‌باشد.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                            <h6 className="font-semibold mb-2">محصول</h6>
                            <ul className="list-none p-0 m-0 space-y-1 text-[#dfe4ff]">
                                <li><a href="#" className="hover:text-white transition-colors">ویژگی‌ها</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">مراحل</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">مقایسه</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">قیمت‌ها</a></li>
                            </ul>
                        </div>
                        <div>
                            <h6 className="font-semibold mb-2">منابع</h6>
                            <ul className="list-none p-0 m-0 space-y-1 text-[#dfe4ff]">
                                <li><a href="#" className="hover:text-white transition-colors">سوالات</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">تماس</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">سیاست حفظ حریم خصوصی</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">شرایط استفاده</a></li>
                            </ul>
                        </div>
                        <div>
                            <h6 className="font-semibold mb-2">تماس</h6>
                            <ul className="list-none p-0 m-0 space-y-1 text-[#dfe4ff]">
                                <li dir="ltr">info@dipad.example</li>
                                <li dir="ltr">+98-21-XXXXXXX</li>
                                <li>تهران / امکان ارائه خدمات سازمانی</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="text-[#9aa0b6] text-sm">© 2025 Dipad — All rights reserved.</div>
            </div>
        </footer>
    );
}
