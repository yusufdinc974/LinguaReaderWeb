import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen pt-24 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-xl shadow-2xl">
                    {/* Decorative Background Glows */}
                    <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl"></div>

                    <div className="relative z-10">
                        <h1 className="text-5xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            Privacy Policy
                        </h1>
                        <p className="text-gray-500 font-medium mb-12">Last updated: {new Date().toLocaleDateString()}</p>

                        <div className="space-y-12 text-gray-300 leading-relaxed">
                            <section className="group">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 text-lg font-bold border border-blue-500/20">1</span>
                                    <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">Introduction</h2>
                                </div>
                                <p className="pl-14">
                                    Welcome to LinguaReader. We respect your privacy and are committed to protecting your personal data. 
                                    This privacy policy will inform you about how we look after your personal data when you use our mobile application and website.
                                </p>
                            </section>

                            <section className="group">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 text-lg font-bold border border-purple-500/20">2</span>
                                    <h2 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">Data We Collect</h2>
                                </div>
                                <div className="pl-14">
                                    <p className="mb-4">We collect and process the following information to provide a seamless learning experience:</p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <li className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                                            <strong className="block text-white mb-1">Account Info</strong>
                                            Email and display name for sync services.
                                        </li>
                                        <li className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                                            <strong className="block text-white mb-1">Learning Data</strong>
                                            Reading progress, word lists, and quiz results.
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            <section className="group">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400 text-lg font-bold border border-green-500/20">3</span>
                                    <h2 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors">Third-Party Services</h2>
                                </div>
                                <div className="pl-14 space-y-4">
                                    <p>We leverage industry-standard services to ensure security and performance:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['Supabase', 'RevenueCat', 'Google Billing', 'Gemini AI'].map(service => (
                                            <span key={service} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-400">
                                                {service}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-400 italic">Financial details are processed exclusively by the App Stores. We do not store credit card information.</p>
                                </div>
                            </section>

                            <section className="group">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400 text-lg font-bold border border-red-500/20">4</span>
                                    <h2 className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors">Contact Us</h2>
                                </div>
                                <div className="pl-14">
                                    <p className="mb-6">Questions or feedback about your privacy? Reach out to our team at:</p>
                                    <a 
                                        href="mailto:dinc.yusuf.business@gmail.com" 
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white font-semibold group/btn"
                                    >
                                        <span className="text-blue-400 group-hover/btn:scale-110 transition-transform">✉</span>
                                        dinc.yusuf.business@gmail.com
                                    </a>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
