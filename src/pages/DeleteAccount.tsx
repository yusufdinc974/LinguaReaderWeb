import React from 'react';

const DeleteAccount: React.FC = () => {
    return (
        <div className="min-h-screen pt-24 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-xl shadow-2xl">
                    {/* Decorative Background Glows */}
                    <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-red-500/10 blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl"></div>

                    <div className="relative z-10">
                        <h1 className="text-5xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            Account Deletion
                        </h1>
                        <p className="text-gray-500 font-medium mb-12 text-lg">Request to remove your account and data from LinguaReader.</p>

                        <div className="space-y-10 text-gray-300 leading-relaxed">
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">How to request deletion</h2>
                                <p className="mb-4">
                                    To protect our users' security, account deletion requests must be verified via your registered email address. 
                                    Please send an email to our support team with the subject <strong>"Account Deletion Request"</strong>.
                                </p>
                                <a 
                                    href="mailto:dinc.yusuf.business@gmail.com?subject=Account Deletion Request" 
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all text-red-400 font-bold group"
                                >
                                    <span className="text-xl group-hover:scale-110 transition-transform">🗑️</span>
                                    Request Deletion via Email
                                </a>
                                <p className="mt-4 text-sm text-gray-500">
                                    Our team will process your request and confirm the deletion within 30 days.
                                </p>
                            </section>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <h3 className="text-lg font-bold text-white mb-2">Data being deleted</h3>
                                    <ul className="list-disc ml-5 space-y-1 text-sm text-gray-400">
                                        <li>User Profile & Email</li>
                                        <li>Word Lists & Vocabulary</li>
                                        <li>Reading Progress</li>
                                        <li>Quiz Statistics</li>
                                    </ul>
                                </section>
                                <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <h3 className="text-lg font-bold text-white mb-2">Data kept</h3>
                                    <p className="text-sm text-gray-400">
                                        Anonymized analytical data and financial transaction records (required by law for tax/reporting purposes) will be retained.
                                    </p>
                                </section>
                            </div>

                            <section className="pt-6 border-t border-white/10">
                                <h2 className="text-xl font-bold text-white mb-2">Important Note</h2>
                                <p className="text-sm text-gray-400">
                                    Deletion is permanent. Once your account is removed, your learning history, streaks, and saved words cannot be recovered, even if you sign up again with the same email.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccount;
