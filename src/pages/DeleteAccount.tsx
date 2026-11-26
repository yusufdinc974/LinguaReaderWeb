const EMAIL = 'dinc.yusuf.business@gmail.com';

export default function DeleteAccount() {
    return (
        <div className="page container narrow legal" lang="en">
            <header className="page-head">
                <h1>Account &amp; Data Deletion</h1>
                <p className="lead">Request to remove all or some of your data from LinguaReader.</p>
            </header>

            <section>
                <h2>How to request deletion</h2>
                <p>
                    To protect our users' security, data deletion requests must be verified via your registered email address.
                    Please send an email to our support team with the subject <strong>"Data Deletion Request"</strong>. In your message, specify if you'd like to delete your entire account or only specific data (e.g., learning history, word lists).
                </p>
                <p>
                    <a href={`mailto:${EMAIL}?subject=${encodeURIComponent('Data Deletion Request')}`} className="btn btn-danger">
                        Request Deletion via Email
                    </a>
                </p>
                <p className="muted">Our team will process your request and confirm the deletion within 30 days.</p>
            </section>

            <section>
                <dl className="fields">
                    <div>
                        <dt>Data being deleted</dt>
                        <dd className="muted">
                            <ul className="plain">
                                <li>User Profile &amp; Email</li>
                                <li>Word Lists &amp; Vocabulary</li>
                                <li>Reading Progress</li>
                                <li>Quiz Statistics</li>
                            </ul>
                        </dd>
                    </div>
                    <div>
                        <dt>Data kept</dt>
                        <dd className="muted">
                            Anonymized analytical data and financial transaction records (required by law for tax/reporting purposes) will be retained.
                        </dd>
                    </div>
                </dl>
            </section>

            <section>
                <h2>Important Note</h2>
                <p className="muted">
                    Deletion is permanent. Once your account is removed, your learning history, streaks, and saved words cannot be recovered, even if you sign up again with the same email.
                </p>
            </section>
        </div>
    );
}
