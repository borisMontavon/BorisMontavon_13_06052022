import chat from "../assets/img/icon-chat.png";
import money from "../assets/img/icon-money.png";
import security from "../assets/img/icon-security.png";
import { Feature } from "./feature";

export function HomePage() {
    const data = [
        {
            "icon": chat,
            "alt": "Chat Icon",
            "title": "You are our #1 priority",
            "message": "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
        },
        {
            "icon": money,
            "alt": "Money Icon",
            "title": "More savings means higher rates",
            "message": "The more you save with us, the higher your interest rate will be!"
        },
        {
            "icon": security,
            "alt": "Security Icon",
            "title": "Security you can trust",
            "message": "We use top of the line encryption to make sure your data and money is always safe."
        }
    ];
    const features = data.map((feature, index) =>
        <Feature icon={feature.icon} alt={feature.alt} title={feature.title} message={feature.message} key={index} />
    );

    return (
        <main>
            <div className="hero">
                <section className="hero-content">
                    <h2 className="sr-only">Promoted Content</h2>
                    <p className="subtitle">No fees.</p>
                    <p className="subtitle">No minimum deposit.</p>
                    <p className="subtitle">High interest rates.</p>
                    <p className="text">Open a savings account with Argent Bank today!</p>
                </section>
            </div>
            <section className="features">
                <h2 className="sr-only">Features</h2>
                {features}
            </section>
        </main>
    );
}
