# Portfolio Website Scope

## Purpose

Build an original, immersive portfolio for Ismail Samir Ibrahim that presents
his senior C++ engineering experience to employers and freelance clients. The
site will be inspired by the clarity, playfulness, and staged 3D storytelling
of david-hckh.com without copying its character, room, project assets, or
branding.

The delivery is split into two product layers:

1. A dependable 2D MVP that contains the complete portfolio and works on every
   supported device.
2. An immersive edition that progressively enhances the same content with an
   original 3D room, character, motion, and optional sound.

The immersive edition is the final product. The 2D MVP is its production-ready
foundation and fallback, not a disposable prototype.

## Audience and primary outcomes

### Audience

- Engineering leaders and recruiters hiring senior C++ engineers.
- Clients seeking experienced C++, desktop, systems, performance, or
  architecture work.
- Technical peers evaluating Ismail's projects and engineering approach.

### Visitor outcomes

A visitor should be able to:

- Understand Ismail's role and specialization within the first screen.
- See evidence of production engineering, leadership, and technical depth.
- Explore selected projects without requiring WebGL.
- Open Ismail's GitHub, LinkedIn, résumé, and project repositories.
- Contact Ismail for a role or freelance collaboration.

## Confirmed identity and content

- Name: Ismail Samir Ibrahim.
- Public title: Senior C++ Software Engineer.
- Location: Cairo, Egypt.
- Language at launch: English.
- Contact: ismail.samir.ibrahim@gmail.com.
- GitHub: https://github.com/IsmailSamirIbrahim.
- LinkedIn: https://www.linkedin.com/in/ismailsamiribrahim.
- Primary projects:
  1. Immagine.
  2. Breakout Game.
  3. Thread Pool.
- Reserve project: N-Puzzle.

### Positioning

Headline:

> Building high-performance software where precision matters.

Short biography:

> I'm Ismail, a Cairo-based Senior C++ Software Engineer with 8+ years of
> experience building production software across dental AI, medical imaging,
> and Arabic NLP. I specialize in modern C++, Qt/QML, multithreading, system
> architecture, and performance optimization - turning complex technical
> systems into dependable products and polished user experiences.

Availability:

> Open to senior software engineering opportunities and selected freelance
> collaborations involving C++, desktop applications, performance-critical
> systems, and software architecture.

## Shared product foundation

The following requirements apply to both product layers:

- Content is structured separately from presentation components.
- Mobile-first responsive behavior supports phone, tablet, laptop, and large
  desktop layouts.
- Semantic HTML and visible keyboard focus are required.
- Essential actions work with a keyboard, touch input, and assistive
  technology.
- Motion respects `prefers-reduced-motion`.
- Project media has useful alternative text and explicit dimensions.
- Every route has a useful title, description, canonical URL, and social
  preview.
- External links, résumé access, and email actions are verified before launch.
- No private employer, client, patient, or proprietary product information is
  published.
- The original reference portfolio and any third-party assets are credited
  when their licenses require it.

## Layer 1: Dependable 2D MVP

### Essential launch features

#### Global experience

- Responsive site shell with clear navigation and footer.
- Branded wordmark using Ismail's name and role.
- Primary "Explore my work" and "Get in touch" actions.
- Loading, error, empty, and offline-tolerant states where relevant.
- Static visual treatment that remains complete when JavaScript, WebGL, or
  audio is unavailable.

#### Homepage

- Hero containing name, role, headline, biography, location, and availability.
- Selected-project section with responsive cards for Immagine, Breakout Game,
  and Thread Pool.
- Skills summary covering modern C++, Qt/QML, multithreading, architecture,
  performance, testing, CMake, GitHub Actions, Linux, and Windows.
- Experience highlights based on the supplied résumé, including leadership,
  production MedTech delivery, test coverage, and CI/CD outcomes.
- Collaboration section with email, GitHub, LinkedIn, and résumé actions.

#### Project case studies

- Reusable route and layout for each featured project.
- Project overview, problem, role, technical approach, key decisions,
  technology, media, outcome, repository link, and next-project navigation.
- Honest language that distinguishes verified outcomes from architectural or
  learning goals.
- N-Puzzle can be enabled later through the same content model without a
  layout change.

#### Supporting pages and metadata

- Privacy, legal, and credits pages.
- Favicon, sitemap, robots rules, structured profile data, and social image.
- English content architecture that can support Arabic and RTL in a later
  release without rewriting components.

### MVP acceptance gate

The 2D MVP is complete when:

- All confirmed content is present and approved.
- Homepage and every project route work at supported breakpoints.
- Navigation and contact actions work by keyboard and touch.
- A production build passes type checking and automated tests.
- Browser checks cover current Chrome, Edge, Firefox, and Safari plus iOS and
  Android layouts.
- Accessibility review finds no known critical issue.
- The site remains fully usable without WebGL.
- Core Web Vitals targets are pursued at the 75th percentile: LCP at or below
  2.5 seconds, INP at or below 200 milliseconds, and CLS at or below 0.1.

## Layer 2: Immersive edition

### Original 3D direction

- A fictional, stylized senior engineer character with an approachable
  low-poly visual language.
- An original engineering room rather than a copy of the reference room.
- Scene objects that represent C++, medical imaging, concurrency, game
  development, testing, and Cairo in a subtle, professional way.
- Warm beige environment with charcoal typography, deep blue technical
  elements, orange actions, and restrained cyan highlights.

### Advanced interactions

- Progressive 3D loading with visible progress and recovery from asset errors.
- Scroll-linked camera storytelling synchronized with the HTML sections.
- Idle character animation and small reactions to pointer or scroll state.
- Purposeful interactive objects with equivalent HTML actions outside the
  canvas.
- Project transitions that connect the room to the project cards and case
  studies.
- Optional licensed ambient audio and effects, enabled only after a user
  gesture.
- Persistent sound preference and a clearly labelled mute control.

### Performance and fallback behavior

- Lazy-load the 3D bundle after useful 2D content can render.
- Detect WebGL support and device capability before selecting scene quality.
- Provide desktop, reduced mobile, and static fallback modes.
- Cap device pixel ratio and reduce expensive lighting, shadows, and effects
  on slower devices.
- Pause animation and audio when the page is hidden.
- Dispose of WebGL resources during route or scene teardown.
- Never block navigation, project content, or contact actions behind the
  canvas.

### Immersive-edition acceptance gate

The immersive edition is complete when:

- The approved room, avatar, props, lighting, and camera path are integrated.
- 3D failures fall back to the approved 2D experience automatically.
- Desktop and reduced mobile modes are visually stable and responsive.
- Reduced-motion users receive restrained transitions and no forced camera
  movement.
- Canvas actions have accessible HTML equivalents.
- Audio never starts without user interaction.
- Browser, device, performance, and accessibility verification is repeated
  with the 3D layer enabled.
- Production monitoring shows no known critical loading, rendering, or
  navigation failure.

## Explicitly out of scope

The following items are not part of the initial portfolio project:

- Copying David Heckhoff's character, room, models, textures, project artwork,
  music, or source implementation.
- A CMS or admin dashboard.
- User accounts, authentication, comments, or community features.
- A blog, newsletter, or content subscription system.
- E-commerce, booking, invoicing, or payment processing.
- A custom backend or database for portfolio content.
- A server-side contact form; the initial contact action uses email and public
  professional links.
- Live GitHub statistics that require client-side API tokens.
- Arabic translation at launch; the architecture remains translation-ready.
- Native mobile or desktop applications.
- Virtual reality controls, multiplayer presence, or a free-roaming game.
- Publishing proprietary Atomica.ai or RDI code, screenshots, customer data,
  medical data, or confidential performance information.
- Rewriting or modernizing the source code of the featured repositories unless
  tracked as separate projects.

New features require a separately reviewed task and must not silently expand
the scope of an existing pull request.

## Release sequence

1. Approve scope, identity, content inventory, and visual direction.
2. Establish the production application and typed content architecture.
3. Complete and approve the responsive 2D MVP.
4. Create and optimize the original 3D assets.
5. Integrate the 3D scene as progressive enhancement.
6. Add restrained motion and optional licensed audio.
7. Complete accessibility, browser, device, and performance verification.
8. Deploy to production, connect the domain, and run a final smoke test.
9. Review production performance and feedback after 30 days.

## Scope change control

Each delivery task must map to this document and remain small enough for one
focused pull request. Any requested feature outside this boundary must be added
to the tracker with its own requirements, dependencies, verification plan, and
review gate.
