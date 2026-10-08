import { useEffect, useRef, useState } from "react";
import type * as Three from "three";
import type { Route } from "./+types/home";

type Project = {
  title: string;
  description: string;
  details: string;
  image: string;
  video?: string;
  link?: string;
};

const games: Project[] = [
  {
    title: "Kalios",
    description:
      "A procedurally generated 2D platformer about dashing, teleporting, and throwing daggers to reach new places.",
    details:
      "Made with two other developers in Unity. I implemented procedural generation, teleporting, and the dagger ability. Level design was a team effort, with every member contributing.",
    image: "kalios.png",
    video: "https://www.youtube.com/embed/-mXUCibYFoo",
    link: "https://4nz.itch.io/kalios",
  },
  {
    title: "Mine Evolution",
    description:
      "An educational game created with CIM and Science North to introduce students and families to the mining industry.",
    details:
      "I joined during development and focused on UI, mini-games, and underground mine logic. The team earned a Silver Award at the Serious Games Awards. I continue to maintain the project and resolve bugs and store-compliance issues.",
    image: "mine_evo.png",
    video: "https://www.youtube.com/embed/ckTiKW8J584",
    link: "https://mineevolution.ca/",
  },
  {
    title: "Swarm 2",
    description:
      "A fast-paced VR arcade shooter where players swing through arenas with grappling hooks and fight alien enemies.",
    details:
      "As a contracted developer, I worked on game mechanics and UI. I developed the rocket-jump mechanic, where weapon recoil propels players and lets them gain a boost or cancel a force.",
    image: "swarm.png",
    video: "https://www.youtube.com/embed/-152LOXaM-g",
    link: "https://www.meta.com/experiences/swarm-2/5791805387504648/",
  },
  {
    title: "MLB VR",
    description:
      "An officially licensed VR game where players hit home runs across all 30 MLB ballparks.",
    details:
      "Players step up to the plate in a rapid-fire Home Run Derby. I'm responsible for adapting the project for centralized arcade use.",
    image: "mlbvr.png",
    video: "https://www.youtube.com/embed/3xRu0QcKVNQ",
  },
  {
    title: "Freakout",
    description:
      "A rhythm VR game with dance poses to match and environments inspired by the 1980s.",
    details:
      "The project is being redeveloped, and I'm currently the technical lead.",
    image: "Freakout.png",
    video: "https://www.youtube.com/embed/dkD6g0cdOh0",
  },
  {
    title: "Sear",
    description:
      "A game jam project made for the theme “Light the Dark,” exploring darkness as a mood, mechanic, and narrative force.",
    details:
      "I worked with friends on this game jam project and was responsible for character movement, the lighting mechanic, and the particle system.",
    image: "https://img.itch.zone/aW1nLzExMDY5OTc0LmpwZw==/original/EZ47TZ.jpg",
    video: "https://www.youtube.com/embed/mQPxOKIMGmc",
    link: "https://4nz.itch.io/sear",
  },
];

const otherProjects: Project[] = [
  {
    title: "Klocked",
    description:
      "A mobile application where I developed features including real-world highlights, virtual pets, and loot boxes.",
    details:
      "I contributed new features and components to the Klocked mobile application.",
    image: "klocked.png",
  },
  {
    title: "Klocked World",
    description:
      "A web application for buying virtual real estate, developing property, and selling advertising.",
    details:
      "I built this web application for work, including its virtual property and advertising experience.",
    image: "kw.png",
  },
  {
    title: "Chuck Norris Joke Website",
    description:
      "A small website that fetches jokes from an API and displays them by category.",
    details:
      "Built with JavaScript, JSON, jQuery, and basic HTML and CSS to explore API access and category-based results.",
    image: "chuck.png",
  },
  {
    title: "C Shopping List",
    description:
      "A shopping list program that stores items in a custom stack data structure.",
    details:
      "Users can add items with quantities, inspect the list, delete individual items, or clear the whole list with commands.",
    image: "shoppingList.png",
  },
  {
    title: "C Image Converter",
    description:
      "A C program for converting SVG images to grayscale and flipping them.",
    details:
      "It can also create a simple image from RGB values, alternating the selected color with white bars.",
    image: "cimage.png",
  },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Masamichi J Tsukada — Portfolio" },
    {
      name: "description",
      content:
        "The portfolio of Masamichi J Tsukada, a software developer and game maker.",
    },
  ];
}

function ProjectGrid({
  projects,
  onSelect,
}: {
  projects: Project[];
  onSelect: (project: Project) => void;
}) {
  return (
    <div className="project-grid">
      {projects.map((project, index) => (
        <article className="project-card" key={project.title}>
          <button
            className="project-card-button"
            type="button"
            onClick={() => onSelect(project)}
            aria-label={`View details for ${project.title}`}
          >
            <span className="project-image-wrap">
              <img
                className="project-image"
                src={
                  project.image.startsWith("http")
                    ? project.image
                    : `/assets/${project.image}`
                }
                alt=""
                loading="lazy"
              />
              <span className="project-number">
                {String(index + 1).padStart(2, "0")}
              </span>
            </span>
            <span className="project-card-content">
              <span className="project-title">{project.title}</span>
              <span className="project-description">{project.description}</span>
              <span className="project-more">
                More about this project <span aria-hidden="true">↗</span>
              </span>
            </span>
          </button>
        </article>
      ))}
    </div>
  );
}

function InteractiveTitle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let disposeScene = () => {};
    const initialize = async () => {
      let THREE: typeof import("three");
      let FontLoaderClass: typeof import("three/addons/loaders/FontLoader.js").FontLoader;
      let TextGeometryClass: typeof import("three/addons/geometries/TextGeometry.js").TextGeometry;
      try {
        const [three, fontLoader, textGeometry] = await Promise.all([
          import("three"),
          import("three/addons/loaders/FontLoader.js"),
          import("three/addons/geometries/TextGeometry.js"),
        ]);
        THREE = three;
        FontLoaderClass = fontLoader.FontLoader;
        TextGeometryClass = textGeometry.TextGeometry;
      } catch (error) {
        console.error("Unable to load the interactive 3D title.", error);
        return;
      }
      if (disposed) return;

      let font: import("three/addons/loaders/FontLoader.js").Font;
      try {
        font = await new FontLoaderClass().loadAsync("/assets/helvetiker_bold.typeface.json");
      } catch (error) {
        console.error("Unable to load the interactive 3D title font.", error);
        return;
      }
      if (disposed) return;

      let renderer: Three.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      } catch (error) {
        console.error("Unable to initialize the interactive 3D title.", error);
        return;
      }

      const scene = new THREE.Scene();
      const geometry = new TextGeometryClass("J Tsukada.", {
        font,
        size: 1.1,
        depth: 0.16,
        curveSegments: 8,
        bevelEnabled: true,
        bevelThickness: 0.025,
        bevelSize: 0.015,
        bevelSegments: 2,
      });
      geometry.computeBoundingBox();
      const bounds = geometry.boundingBox;
      if (!bounds) {
        geometry.dispose();
        renderer.dispose();
        console.error("Unable to measure the interactive 3D title.");
        return;
      }

      const titleWidth = bounds.max.x - bounds.min.x;
      const titleHeight = bounds.max.y - bounds.min.y;
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
      camera.position.z = 10;
      geometry.translate(
        -(bounds.min.x + bounds.max.x) / 2,
        -(bounds.min.y + bounds.max.y) / 2,
        -(bounds.min.z + bounds.max.z) / 2,
      );
      const material = new THREE.MeshStandardMaterial({
        color: 0xc2f970,
        metalness: 0.22,
        roughness: 0.32,
      });
      const title = new THREE.Mesh(geometry, material);
      const titleGroup = new THREE.Group();
      const backTitle = new THREE.Mesh(geometry, material);
      backTitle.rotation.y = Math.PI;
      backTitle.visible = false;
      titleGroup.add(title, backTitle);
      scene.add(new THREE.AmbientLight(0xffffff, 1.8));
      const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
      keyLight.position.set(-2, 3, 5);
      scene.add(keyLight);
      const rimLight = new THREE.DirectionalLight(0x8baa4e, 1.2);
      rimLight.position.set(2, -1, -3);
      scene.add(rimLight);
      scene.add(titleGroup);

      const render = () => renderer.render(scene, camera);
      const setRotationY = (angle: number) => {
        titleGroup.rotation.y = angle % (Math.PI * 2);
        title.visible = Math.cos(titleGroup.rotation.y) >= 0;
        backTitle.visible = !title.visible;
      };
      setRotationY(0);
      let animationFrame = 0;
      let previousTime = 0;
      const animate = (time: number) => {
        if (previousTime) setRotationY(titleGroup.rotation.y - Math.min((time - previousTime) / 1000, 0.05) * 0.35);
        previousTime = time;
        render();
        animationFrame = requestAnimationFrame(animate);
      };
      const resize = () => {
        const { width, height } = canvas.getBoundingClientRect();
        if (!width || !height) return;

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height, false);
        const aspect = width / height;
        const viewHeight = Math.max(titleHeight / 0.8, titleWidth / aspect / 0.82);
        camera.top = viewHeight / 2;
        camera.bottom = -viewHeight / 2;
        camera.left = (-viewHeight * aspect) / 2;
        camera.right = (viewHeight * aspect) / 2;
        camera.updateProjectionMatrix();
        camera.lookAt(0, 0, 0);
        render();
        setReady(true);
      };

      let pointer: { id: number; x: number } | null = null;
      const onPointerDown = (event: PointerEvent) => {
        pointer = { id: event.pointerId, x: event.clientX };
        canvas.setPointerCapture(event.pointerId);
      };
      const onPointerMove = (event: PointerEvent) => {
        if (!pointer || pointer.id !== event.pointerId) return;
        const deltaX = event.clientX - pointer.x;
        setRotationY(titleGroup.rotation.y + deltaX * 0.01);
        pointer.x = event.clientX;
        render();
      };
      const onPointerUp = (event: PointerEvent) => {
        if (pointer?.id === event.pointerId) pointer = null;
      };
      const onKeyDown = (event: KeyboardEvent) => {
        const step = 0.12;
        if (event.key === "ArrowLeft") setRotationY(titleGroup.rotation.y - step);
        else if (event.key === "ArrowRight") setRotationY(titleGroup.rotation.y + step);
        else if (event.key === "Home") setRotationY(0);
        else return;
        event.preventDefault();
        render();
      };

      canvas.addEventListener("pointerdown", onPointerDown);
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerup", onPointerUp);
      canvas.addEventListener("pointercancel", onPointerUp);
      canvas.addEventListener("keydown", onKeyDown);
      window.addEventListener("resize", resize);
      resize();
      animationFrame = requestAnimationFrame(animate);

      disposeScene = () => {
        cancelAnimationFrame(animationFrame);
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("pointercancel", onPointerUp);
        canvas.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("resize", resize);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    };

    void initialize();
    return () => {
      disposed = true;
      disposeScene();
    };
  }, []);

  return (
    <span className="hero-title-3d">
      <canvas
        ref={canvasRef}
        className="hero-title-canvas"
        role="img"
        aria-label="Interactive 3D text J Tsukada, slowly spinning counterclockwise around its vertical axis. Drag horizontally or use the left and right arrow keys to rotate; use Home to reset."
        tabIndex={0}
        aria-describedby="title-rotation-hint"
      />
      <span className={`hero-title-fallback${ready ? " is-ready" : ""}`} aria-hidden="true">
        J Tsukada.
      </span>
    </span>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"games" | "other">("games");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selectedProject && !dialog.open) dialog.showModal();
    if (!selectedProject && dialog.open) dialog.close();
  }, [selectedProject]);

  return (
    <>
      <header className="site-header" id="top">
        <a className="wordmark" href="#top" aria-label="Masamichi Tsukada, home">
          MT<span>.</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#profile">Portfolio</a>
          <a href="#contact">Contact</a>
          <a href="/BagelIsLost">Find Bagel</a>
          <a href="/assets/Masamichi%20J%20Tsukada.pdf" target="_blank" rel="noreferrer">
            Download CV
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> Software developer · Game maker
            </p>
            <h1 id="hero-title">
              <span className="visually-hidden">Masamichi J Tsukada.</span>
              <span aria-hidden="true">Masamichi</span>
              <br aria-hidden="true" />
              <InteractiveTitle />
            </h1>
            <p className="title-rotation-hint" id="title-rotation-hint">
              Drag horizontally or use left/right arrows · Home to reset
            </p>
            <p className="hero-description">
              Programming turned my pastime into my profession. I love learning
              new tools, collaborating with people, and bringing ideas to life.
            </p>
            <div className="social-links" aria-label="Social profiles">
              <a href="https://www.linkedin.com/in/mtsukada/" target="_blank" rel="noreferrer">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
              <a href="https://github.com/TsukadaMas" target="_blank" rel="noreferrer">
                GitHub <span aria-hidden="true">↗</span>
              </a>
              <a href="https://4nz.itch.io/" target="_blank" rel="noreferrer">
                itch.io <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <a className="hero-scroll" href="#profile">
            Explore my work <span aria-hidden="true">↓</span>
          </a>
        </section>

        <section className="featured section-wrap" aria-labelledby="featured-title">
          <div className="featured-heading">
            <p className="eyebrow">Featured project · Games</p>
            <span className="section-count">01 / 01</span>
          </div>
          <div className="featured-card">
            <div className="featured-overview">
              <img
                className="featured-image"
                src="/assets/mine_evo.png"
                alt="Mine Evolution game world"
              />
              <div className="featured-copy">
                <p className="featured-kicker">Education · Unity · Ongoing support</p>
                <h2 id="featured-title">Mine Evolution</h2>
                <p className="featured-description">
                  An educational game created with the Canadian Institute of
                  Mining and Science North to spark interest in mining for
                  students and families.
                </p>
                <div className="featured-facts">
                  <div>
                    <span>My contribution</span>
                    <p>UI, mini-games, underground mine logic, and ongoing maintenance.</p>
                  </div>
                  <div>
                    <span>Recognition</span>
                    <p>Silver award recipient at the Serious Games Awards.</p>
                  </div>
                </div>
                <div className="featured-links">
                  <a
                    className="text-link"
                    href="https://mineevolution.ca/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit Mine Evolution <span aria-hidden="true">↗</span>
                  </a>
                  <a className="text-link" href="#profile">
                    Browse all projects <span aria-hidden="true">↓</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="featured-video">
              <iframe
                src="https://www.youtube.com/embed/ckTiKW8J584?autoplay=1&mute=1&playsinline=1"
                title="Mine Evolution gameplay"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <section className="profile section-wrap" id="profile" aria-labelledby="profile-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A selection of things I've built</p>
              <h2 id="profile-title">My portfolio</h2>
            </div>
            <span className="section-count">01 — 02</span>
          </div>
          <div className="tabs" role="tablist" aria-label="Portfolio categories">
            <button
              id="games-tab"
              className="tab"
              type="button"
              role="tab"
              aria-selected={activeTab === "games"}
              aria-controls="portfolio-panel"
              onClick={() => setActiveTab("games")}
            >
              Games <span>{games.length}</span>
            </button>
            <button
              id="other-tab"
              className="tab"
              type="button"
              role="tab"
              aria-selected={activeTab === "other"}
              aria-controls="portfolio-panel"
              onClick={() => setActiveTab("other")}
            >
              Other projects <span>{otherProjects.length}</span>
            </button>
          </div>
          <div
            className="tab-panel"
            id="portfolio-panel"
            role="tabpanel"
            aria-labelledby={activeTab === "games" ? "games-tab" : "other-tab"}
          >
            <ProjectGrid
              projects={activeTab === "games" ? games : otherProjects}
              onSelect={setSelectedProject}
            />
          </div>
        </section>

        <section className="about section-wrap" aria-labelledby="about-title">
          <p className="eyebrow">A little about me</p>
          <div className="about-content">
            <h2 id="about-title">
              Curious by nature.
              <br />
              Developer by trade.
            </h2>
            <div>
              <p>
                I enjoy pushing my understanding of programming languages and
                connecting with clients and teammates to make new ideas real.
                Hard work, collaboration, and communication are at the heart of
                how I build.
              </p>
              <a
                className="text-link"
                href="https://www.linkedin.com/in/mtsukada/"
                target="_blank"
                rel="noreferrer"
              >
                More on LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="contact section-wrap" id="contact" aria-labelledby="contact-title">
          <p className="eyebrow">Get in touch</p>
          <div className="section-heading">
            <h2 id="contact-title">Contact info</h2>
            <span className="section-count">Available for a conversation</span>
          </div>
          <div className="contact-grid">
            <article className="contact-card">
              <span className="contact-label">Email</span>
              <a href="mailto:tsukada.m@hotmail.com?subject=Reaching%20out%20regarding%20work">
                tsukada.m@hotmail.com <span aria-hidden="true">↗</span>
              </a>
              <p>Send me a message about your next project.</p>
            </article>
            <article className="contact-card">
              <span className="contact-label">LinkedIn</span>
              <a href="https://www.linkedin.com/in/mtsukada/" target="_blank" rel="noreferrer">
                linkedin.com/in/mtsukada <span aria-hidden="true">↗</span>
              </a>
              <p>Connect with me or send a message.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Masamichi J Tsukada</span>
        <div>
          <a href="https://github.com/TsukadaMas" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/mtsukada/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://4nz.itch.io/" target="_blank" rel="noreferrer">itch.io</a>
        </div>
        <a href="#top">Back to top ↑</a>
      </footer>

      <dialog
        className="project-dialog"
        ref={dialogRef}
        aria-labelledby="dialog-title"
        onCancel={(event) => {
          event.preventDefault();
          setSelectedProject(null);
        }}
        onClose={() => setSelectedProject(null)}
      >
        {selectedProject && (
          <article className="resume-page">
            <header className="resume-header">
              <div>
                <p className="eyebrow">Selected work / Project profile</p>
                <h2 id="dialog-title">{selectedProject.title}</h2>
              </div>
              <button
                className="dialog-close"
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
              >
                ×
              </button>
            </header>

            <section className="resume-summary" aria-label="Project summary">
              <img
                src={
                  selectedProject.image.startsWith("http")
                    ? selectedProject.image
                    : `/assets/${selectedProject.image}`
                }
                alt=""
              />
              <div>
                <span className="resume-label">Overview</span>
                <p>{selectedProject.description}</p>
              </div>
            </section>

            <section className="resume-entry">
              <div className="resume-entry-label">
                <span className="resume-index">01</span>
                <span className="resume-label">Role &amp; contribution</span>
              </div>
              <p>{selectedProject.details}</p>
            </section>

            {selectedProject.video && (
              <section className="resume-entry">
                <div className="resume-entry-label">
                  <span className="resume-index">02</span>
                  <span className="resume-label">Project media</span>
                </div>
                <div className="video-wrap">
                  <iframe
                    src={selectedProject.video}
                    title={`${selectedProject.title} video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </section>
            )}

            <footer className="resume-footer">
              <span>Masamichi J Tsukada / Portfolio</span>
              {selectedProject.link && (
                <a
                  className="dialog-link"
                  href={selectedProject.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit project <span aria-hidden="true">↗</span>
                </a>
              )}
            </footer>
          </article>
        )}
      </dialog>
    </>
  );
}
