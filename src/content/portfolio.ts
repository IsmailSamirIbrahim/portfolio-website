import type { PortfolioContent } from '@/types/content'

export const portfolioContent = {
  profile: {
    name: 'Ismail Samir Ibrahim',
    title: 'Senior C++ Software Engineer',
    location: 'Cairo, Egypt',
    headline: 'Building high-performance software where precision matters.',
    biography:
      'I’m Ismail, a Senior C++ Software Engineer with 8+ years of experience building production software across dental AI, medical imaging, and Arabic NLP.',
    availability:
      'Open to senior software engineering opportunities and selected freelance collaborations involving C++, desktop applications, performance-critical systems, and software architecture.',
  },
  navigation: {
    primary: [
      { label: 'Projects', href: '#projects' },
      { label: 'Expertise', href: '#expertise' },
      { label: 'Get in touch', href: '#contact' },
    ],
    footer: [
      { label: 'Projects', href: '#projects' },
      { label: 'Back to top', href: '#top' },
    ],
  },
  contact: {
    email: 'ismail.samir.ibrahim@gmail.com',
    emailHref: 'mailto:ismail.samir.ibrahim@gmail.com',
    resume: {
      label: 'Résumé / experience',
      href: '#expertise',
    },
    social: [
      {
        label: 'GitHub',
        href: 'https://github.com/IsmailSamirIbrahim',
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/ismailsamiribrahim',
      },
    ],
  },
  projects: [
    {
      slug: 'immagine',
      name: 'Immagine',
      summary:
        'A lightweight C++ library for image I/O, transformations, filtering, and segmentation.',
      technologySummary: 'C++17 · CMake · stb · Image processing',
      repository: 'https://github.com/IsmailSamirIbrahim/Immagine',
      cover: {
        src: '/media/projects/immagine/cover.webp',
        alt: 'A black-and-white input image beside the same connected components rendered in distinct colors.',
        width: 1200,
        height: 750,
      },
      caseStudy: {
        overview:
          'A compact reusable API for common image transformations, filters, segmentation operations, and image I/O.',
        problem:
          'Image-processing experiments often repeat pixel-buffer, file I/O, channel, transformation, and algorithm-composition work.',
        role:
          'Work spans the public API, pixel storage, image I/O, processing algorithms, build configuration, examples, and documentation.',
        approach:
          'The library separates image lifecycle, transformations, point processing, convolution, morphology, and segmentation into focused modules.',
        keyDecisions: [
          'Model image dimensions, channel count, and byte storage explicitly.',
          'Use a planar internal channel layout and compose channels again when writing files.',
          'Expose the library as a portable C++17 CMake target with explicit image ownership.',
        ],
        technologies: [
          'C++17',
          'CMake',
          'stb',
          'Image processing',
        ],
        outcomes: [
          'A reusable library target is separated from the example playground.',
          'Examples compose loading, processing, saving, and releasing images.',
        ],
        limitations: [
          'The reviewed repository does not include performance benchmarks.',
          'Automated test coverage is not present in the reviewed snapshot.',
        ],
        callout:
          'Explicit data ownership, modular processing stages, portable CMake targets, and composable examples turn a low-level problem into a focused C++ API.',
      },
      seo: {
        title: 'Immagine C++ Image Processing Case Study',
        description:
          'How Immagine structures image I/O, transformations, filtering, and segmentation behind a focused C++ API.',
        canonicalPath: '/projects/immagine',
        socialImage: '/media/projects/immagine/cover.webp',
        socialImageAlt:
          'Immagine connected-components input and colorized output.',
      },
    },
    {
      slug: 'breakout-game',
      name: 'Breakout Game',
      summary:
        'A real-time game project exploring rendering and game structure.',
      technologySummary: 'C++ · Real-time systems · Rendering',
      repository: 'https://github.com/IsmailSamirIbrahim/Breakout-Game',
      cover: {
        src: '/media/projects/breakout-game/cover.webp',
        alt: 'Breakout gameplay with a paddle, ball, multicolored brick rows, and three remaining lives.',
        width: 1200,
        height: 750,
      },
      caseStudy: {
        overview:
          'A C++ and OpenGL implementation of Breakout organized into separate game, rendering, shader, texture, resource, window, and executable targets.',
        problem:
          'A real-time game must coordinate input, timing, states, collision response, resources, GPU programs, drawing, and cleanup.',
        role:
          'Work spans the game loop, state model, collision logic, OpenGL rendering, resources, build configuration, and platform setup.',
        approach:
          'Explicit game states, elapsed frame time, centralized resources, and orthographic sprite rendering keep the systems bounded and modular.',
        keyDecisions: [
          'Split game and rendering responsibilities into dedicated CMake targets.',
          'Base movement on GLFW delta time rather than a fixed frame rate.',
          'Resolve circle-to-box collisions using closest points, direction classification, and penetration correction.',
        ],
        technologies: [
          'C++17',
          'OpenGL',
          'GLFW',
          'GLEW',
          'GLM',
          'CMake',
        ],
        outcomes: [
          'The state machine covers menu, active play, win, and loss paths.',
          'Four data-driven level layouts and complete collision handling are included.',
        ],
        limitations: [
          'No frame-time, memory, or rendering benchmark is included.',
          'Automated gameplay and collision tests are not present.',
        ],
        callout:
          'A compact environment for connecting frame-based input, collision response, state transitions, resource ownership, shaders, and reusable C++ modules.',
      },
      seo: {
        title: 'Breakout Game C++ and OpenGL Case Study',
        description:
          'A modular C++ Breakout implementation connecting real-time input, collision response, state transitions, and OpenGL rendering.',
        canonicalPath: '/projects/breakout-game',
        socialImage: '/media/projects/breakout-game/cover.webp',
        socialImageAlt: 'Breakout game level rendered with OpenGL.',
      },
    },
    {
      slug: 'thread-pool',
      name: 'Thread Pool',
      summary:
        'A compact worker pool with queued callables, condition-variable wakeups, and future-based results.',
      technologySummary: 'C++ · Threads · Futures · Scheduling',
      repository: 'https://github.com/IsmailSamirIbrahim/Thread-Pool',
      cover: {
        src: '/media/projects/thread-pool/cover.webp',
        alt: 'Diagram showing submitted callables entering a shared task queue and being distributed to three worker threads.',
        width: 1200,
        height: 750,
      },
      caseStudy: {
        overview:
          'A compact C++ thread pool that schedules arbitrary callables across worker threads and returns futures for completion and results.',
        problem:
          'Starting a thread for every small task adds lifecycle overhead and makes coordination harder.',
        role:
          'Work covers the bounded queue, workers, waiting, callable binding, future delivery, shutdown, CMake integration, and examples.',
        approach:
          'Submitted callables become packaged tasks in a protected queue while persistent workers sleep on a condition variable between tasks.',
        keyDecisions: [
          'Store generic queued work behind one no-argument callable type.',
          'Preserve return values and exceptions with packaged tasks and futures.',
          'Signal shutdown, drain queued work, and join every worker during destruction.',
        ],
        technologies: [
          'C++17',
          'Threads',
          'Mutexes',
          'Condition variables',
          'Futures',
          'CMake',
        ],
        outcomes: [
          'Submitted tasks support copied values, reference arguments, and returned results.',
          'Idle workers block instead of continuously polling.',
        ],
        limitations: [
          'The queue has a fixed capacity and no recoverable overload policy.',
          'The reviewed snapshot has no stress tests, race-detection results, or benchmarks.',
        ],
        callout:
          'The project focuses on sleeping workers, bounded shared state, generic callable wrapping, future-based results, and orderly shutdown.',
      },
      seo: {
        title: 'C++ Thread Pool Case Study',
        description:
          'A focused C++ concurrency implementation using sleeping workers, a bounded task queue, condition variables, and futures.',
        canonicalPath: '/projects/thread-pool',
        socialImage: '/media/projects/thread-pool/cover.webp',
        socialImageAlt:
          'Thread pool diagram showing a task queue feeding three workers.',
      },
    },
  ],
  seo: {
    siteName: 'Ismail Samir Ibrahim — Senior C++ Software Engineer',
    baseUrl: 'https://ismailsamir.dev',
    default: {
      title: 'Ismail Samir Ibrahim — Senior C++ Software Engineer',
      description:
        'Senior C++ engineer building dependable software across medical imaging, dental AI, Arabic NLP, desktop systems, and performance-critical applications.',
      canonicalPath: '/',
      socialImage: '/media/projects/immagine/cover.webp',
      socialImageAlt:
        'Selected engineering work by Ismail Samir Ibrahim.',
    },
  },
} as const satisfies PortfolioContent
