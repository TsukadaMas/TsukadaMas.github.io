import { useState } from "react";
import type { Route } from "./+types/bagel-care";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bagel’s Care Guide" },
    {
      name: "description",
      content: "Bagel’s feeding, litter, playtime, and everyday care routine.",
    },
  ];
}

export default function BagelCare() {
  const [activeCard, setActiveCard] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const cardCount = 4;
  const nextCard = (activeCard + 1) % cardCount;
  const cardClassName = (index: number) =>
    `care-card${activeCard === index ? " is-active" : ""}${nextCard === index ? " is-next" : ""}${isFlipping && activeCard === index ? " is-flipping" : ""}`;
  const finishFlip = (index: number) => {
    if (!isFlipping || activeCard !== index) return;
    setActiveCard(nextCard);
    setIsFlipping(false);
  };

  return (
    <>
      <header className="site-header bagel-header">
        <a className="bagel-wordmark" href="/" aria-label="Home">
          Bagel
        </a>
        <a className="bagel-header-note" href="/BagelIsLost">
          Find Bagel
        </a>
      </header>

      <main className="bagel-page care-page">
        <section className="care-guide" aria-labelledby="care-title">
          <p className="eyebrow">Feeding, litter &amp; everyday care</p>
          <h1 id="care-title">Bagel’s care guide</h1>
          <p className="care-intro">
            A simple guide to Bagel’s routine and where to find his supplies.
          </p>

          <div className={`care-grid${isFlipping ? " is-flipping" : ""}`}>
            <section
              className={cardClassName(0)}
              aria-labelledby="feeding-title"
              aria-hidden={activeCard !== 0}
              onAnimationEnd={() => finishFlip(0)}
            >
              <button
                className="care-card-advance"
                type="button"
                aria-label="Show next care card: Litter"
                disabled={activeCard !== 0 || isFlipping}
                onClick={() => setIsFlipping(true)}
              />
              <h2 id="feeding-title">Feeding &amp; water</h2>
              <p>Feed twice daily.</p>
              <dl className="care-meals">
                <div>
                  <dt>Morning · 9:00 AM</dt>
                  <dd>¼ can wet food + ¼ scoop kibble</dd>
                </div>
                <div>
                  <dt>Evening · 9:00 PM</dt>
                  <dd>¼ can wet food + ¼ scoop kibble</dd>
                </div>
              </dl>
              <h3>Food storage</h3>
              <ul>
                <li>Wet cans: middle metal-rack shelf by the water filter.</li>
                <li>Lids: top shelf of the black metal rack.</li>
                <li>Kibble: jar above the wet food.</li>
                <li>Extra: cupboard with the plates; use the “60/40” jar first.</li>
              </ul>
              <p>
                <strong>Water:</strong> Top up the filter below the marked fill
                line.
              </p>
            </section>

            <section
              className={cardClassName(1)}
              aria-labelledby="litter-title"
              aria-hidden={activeCard !== 1}
              onAnimationEnd={() => finishFlip(1)}
            >
              <button
                className="care-card-advance"
                type="button"
                aria-label="Show next care card: Treats and playtime"
                disabled={activeCard !== 1 || isFlipping}
                onClick={() => setIsFlipping(true)}
              />
              <h2 id="litter-title">Litter</h2>
              <ul>
                <li>Clean the litter box once a day; nighttime is preferable.</li>
                <li>Extra litter is stored under the sink.</li>
                <li>Bagel mostly uses the litter box in the washroom.</li>
                <li>Poop bags are in the dresser marked with a triangle (△).</li>
              </ul>
            </section>

            <section
              className={cardClassName(2)}
              aria-labelledby="play-title"
              aria-hidden={activeCard !== 2}
              onAnimationEnd={() => finishFlip(2)}
            >
              <button
                className="care-card-advance"
                type="button"
                aria-label="Show next care card: Toys and supplies"
                disabled={activeCard !== 2 || isFlipping}
                onClick={() => setIsFlipping(true)}
              />
              <h2 id="play-title">Treats &amp; playtime</h2>
              <ul>
                <li>You can give Bagel 1 Churu from the cat jar.</li>
                <li>You can also give him 2–5 treats from the drawer marked with a triangle (△).</li>
                <li>Try playing with him for a couple of minutes.</li>
                <li>His favourite toys are the mouse on a string and the laser pointer.</li>
                <li>The laser pointer is on the pinboard.</li>
              </ul>
            </section>

            <section
              className={cardClassName(3)}
              aria-labelledby="supplies-title"
              aria-hidden={activeCard !== 3}
              onAnimationEnd={() => finishFlip(3)}
            >
              <button
                className="care-card-advance"
                type="button"
                aria-label="Show next care card: Feeding and water"
                disabled={activeCard !== 3 || isFlipping}
                onClick={() => setIsFlipping(true)}
              />
              <h2 id="supplies-title">Toys &amp; supplies</h2>
              <ul>
                <li>Toys are in the boxes marked with a square (□).</li>
                <li>Leave a few toys out for Bagel before you leave, and rotate the toys you leave out.</li>
                <li>
                  The medkit and cleaning supplies are in the box marked with
                  an X (X). This includes hairbrushes, nail clippers, and his
                  collar.
                </li>
              </ul>
            </section>
          </div>
          <p className="care-hint" aria-live="polite">
            Tap the card to continue · {activeCard + 1} / {cardCount}
          </p>
        </section>
      </main>

      <footer className="site-footer bagel-footer">
        <span>Thanks for taking care of Bagel.</span>
        <a href="/BagelIsLost">Bagel is lost</a>
      </footer>
    </>
  );
}
