const EMAIL = 'dinc.yusuf.business@gmail.com';

export default function PrivacyPolicy() {
    return (
        <div className="page container narrow legal" lang="en">
            <header className="page-head">
                <h1>Privacy Policy</h1>
                <p className="faint">Last updated: March 7, 2026</p>
            </header>

            <section>
                <h2>1. Introduction</h2>
                <p>
                    Welcome to LinguaReader. We respect your privacy and are committed to protecting your personal data.
                    This privacy policy will inform you about how we look after your personal data when you use our mobile application and website.
                </p>
            </section>

            <section>
                <h2>2. Data We Collect</h2>
                <p>We collect and process the following information to provide a seamless learning experience:</p>
                <dl className="fields">
                    <div>
                        <dt>Account Info</dt>
                        <dd className="muted">Email and display name for sync services.</dd>
                    </div>
                    <div>
                        <dt>Learning Data</dt>
                        <dd className="muted">Reading progress, word lists, and quiz results.</dd>
                    </div>
                </dl>
            </section>

            <section>
                <h2>3. Third-Party Services</h2>
                <p>We leverage industry-standard services to ensure security and performance:</p>
                <ul className="chips">
                    {['Supabase', 'RevenueCat', 'Google Billing', 'Gemini AI'].map(s => <li key={s}>{s}</li>)}
                </ul>
                <p className="muted">Financial details are processed exclusively by the App Stores. We do not store credit card information.</p>
            </section>

            <section>
                <h2>4. Contact Us</h2>
                <p>Questions or feedback about your privacy? Reach out to our team at:</p>
                <p><a href={`mailto:${EMAIL}`} className="btn btn-outline">{EMAIL}</a></p>
            </section>
        </div>
    );
}
