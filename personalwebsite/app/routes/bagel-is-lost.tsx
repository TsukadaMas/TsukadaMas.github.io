import { useEffect, useState } from "react";
import type { Route } from "./+types/bagel-is-lost";

const bagelPhotos = [
  "/assets/Bagel/image.jpg",
  "/assets/Bagel/image1.jpg",
  "/assets/Bagel/image2.jpg",
  "/assets/Bagel/image3.jpg",
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bagel Is Lost — Please Help Us Bring Him Home" },
    {
      name: "description",
      content: "Have you seen Bagel? Contact his family to help bring him home.",
    },
  ];
}

export default function BagelIsLost() {
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setPhotoIndex((index) => (index + 1) % bagelPhotos.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <>
      <header className="site-header bagel-header">
        <span className="bagel-wordmark">Bagel</span>
        <span className="bagel-header-note">Missing cat</span>
      </header>

      <main className="bagel-page">
        <section className="bagel-hero" aria-labelledby="bagel-title">
          <div className="bagel-copy">
            <p className="eyebrow">
              <span className="status-dot" /> Missing cat
            </p>
            <h1 id="bagel-title">
              Help us bring
              <br />
              <span>Bagel</span> home.
            </h1>
            <p className="bagel-intro">
              Bagel is our beloved cat and a very important part of our family.
              If you’ve seen him or know where he might be, please get in touch.
              Any information could help us find him.
            </p>
            <div className="bagel-actions">
              <a className="bagel-primary-link" href="tel:+14389312311">
                Call or text Mas <span aria-hidden="true">↗</span>
              </a>
              <a className="bagel-secondary-call" href="tel:+16139819037">
                Call or text Annie <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <figure className="bagel-photo-frame">
            {bagelPhotos.map((photo, index) => (
              <img
                key={photo}
                className={`bagel-photo${index === photoIndex ? " is-active" : ""}`}
                src={photo}
                alt={index === photoIndex ? "Bagel, an orange cat" : ""}
                aria-hidden={index !== photoIndex}
              />
            ))}
            <figcaption>Bagel</figcaption>
          </figure>
        </section>

        <section className="bagel-help" aria-labelledby="bagel-help-title">
          <p className="eyebrow">Every lead matters</p>
          <h2 id="bagel-help-title">Have you seen Bagel?</h2>
          <p>
            Please share where and when you saw him, along with any details
            that could help us find him. Call or text either contact below.
          </p>
          <dl className="bagel-details">
            <div>
              <dt>Appearance</dt>
              <dd>Orange, short-haired domestic cat</dd>
            </div>
            <div>
              <dt>Age</dt>
              <dd>About 1 year old</dd>
            </div>
            <div>
              <dt>Weight</dt>
              <dd>About 9 lb</dd>
            </div>
            <div>
              <dt>Identification</dt>
              <dd>Microchipped</dd>
            </div>
            <div>
              <dt>Veterinarian</dt>
              <dd>VCA Canada Pretoria Animal Hospital</dd>
            </div>
          </dl>
          <div className="bagel-contacts" aria-label="Contact Bagel's family">
            <article className="bagel-contact-card">
              <h3>Mas</h3>
              <a href="tel:+14389312311">Call or text +1 438-931-2311</a>
            </article>
            <article className="bagel-contact-card">
              <h3>Annie</h3>
              <a href="tel:+16139819037">Call or text +1 613-981-9037</a>
            </article>
          </div>
        </section>
      </main>

      <section className="bagel-print-section" aria-labelledby="bagel-print-title">
        <div className="bagel-print-intro">
          <div>
            <p className="eyebrow">Help spread the word</p>
            <h2 id="bagel-print-title">Share Bagel’s notice</h2>
          </div>
          <button className="bagel-primary-link bagel-print-button" onClick={() => window.print()}>
            Print notice
          </button>
        </div>
        {[0, 1, 2].map((copy) => (
          <article
            key={copy}
            className={`bagel-print-notice${copy ? " bagel-print-notice-duplicate" : ""}`}
            aria-hidden={copy > 0}
          >
            <img src="/assets/Bagel/image1.jpg" alt={copy ? "" : "Bagel, an orange cat"} />
            <div>
              <p className="bagel-print-kicker">Missing cat</p>
              <h2>Have you seen Bagel?</h2>
              <p>
                Orange, short-haired domestic cat · About 1 year old · About 9 lb · Microchipped
              </p>
              <p>Veterinarian: VCA Canada Pretoria Animal Hospital</p>
              <p>Please share where and when you saw him.</p>
              <div className="bagel-print-contacts">
                <span>Mas: +1 438-931-2311</span>
                <span>Annie: +1 613-981-9037</span>
              </div>
            </div>
          </article>
        ))}
      </section>

      <footer className="site-footer bagel-footer">
        <span>Thank you for looking out for Bagel.</span>
      </footer>
    </>
  );
}
