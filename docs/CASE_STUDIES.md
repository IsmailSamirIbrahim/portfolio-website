# Featured Project Case Studies

These narratives are the approved content source for the portfolio's three
featured projects. They are written from evidence in the public repositories,
not from assumptions about commercial use or personal impact.

## Editorial rules

- Use the portfolio-ready narrative in public pages.
- Keep the evidence notes available to reviewers and maintainers.
- Do not publish text marked **Confirmation needed** as a verified fact.
- Do not add performance numbers without a reproducible benchmark.
- Do not describe a project as production software without evidence of real
  deployment or users.
- Re-check the source snapshot before publishing after a repository changes.

## Immagine

Repository:
[IsmailSamirIbrahim/Immagine](https://github.com/IsmailSamirIbrahim/Immagine)

Verified source snapshot:
[`c7c9713d28407d7baf36e9766a249b4a1a693b77`](https://github.com/IsmailSamirIbrahim/Immagine/tree/c7c9713d28407d7baf36e9766a249b4a1a693b77)

### Portfolio summary

A lightweight C++ image-processing library that turns common transformations,
filters, segmentation operations, and image I/O into a compact reusable API.

### Problem

Image-processing experiments often repeat the same lower-level work: loading
and saving files, managing pixel buffers, separating color channels, handling
transformations, and composing algorithms. Immagine explores how those
operations can be collected behind a small C/C++-style library interface
without requiring a large application framework.

### Role

The repository demonstrates end-to-end library work across the public API,
pixel storage, image I/O, processing algorithms, build configuration, export
headers, examples, and documentation.

**Confirmation needed:** Confirm that Ismail designed and implemented every
module personally before using "sole author" or an equivalent phrase.

### Process and key decisions

1. Model images with explicit width, height, channel count, and byte storage.
2. Convert interleaved data from `stb` into a planar internal channel layout,
   then join the channels again when writing files.
3. Keep image allocation and release explicit through `image_new`,
   `image_clone`, `image_from_ptr`, and `image_free`.
4. Split the library into focused modules for image operations, point
   processing, kernels, convolution, morphology, connected components, and
   supporting utilities.
5. Use CMake to expose the library to Windows and Linux builds with a C++17
   target and generated export declarations.
6. Detect OpenMP during configuration so supported builds can opt into the
   compiler's parallel runtime.

### Solution

The public API covers:

- BMP, PNG, and JPEG output, with image decoding and encoding through `stb`;
- channel extraction and grayscale conversion;
- crop, pad, mirror, flip, rotate, and resize operations;
- nearest-neighbour and bilinear interpolation;
- brightness, negative, logarithmic, gamma, and adaptive-threshold operations;
- box, median, Gaussian, and declared Sobel filters;
- binarization, connected-component labeling, Otsu thresholding, K-means,
  region growing, and colorized labels;
- a morphology module with erosion support.

The README provides small usage examples for grayscale conversion, Gaussian
filtering, and connected-component coloring, including before-and-after media.

### Technology

- C and C++ with a C++17 CMake target
- CMake 3.9+
- `stb_image` and `stb_image_write`
- Optional OpenMP detection
- Windows and Linux compile definitions
- Generated shared-library export header

### Verified outcome

- A reusable library target is defined separately from its example playground.
- The repository contains implementations for image lifecycle, transformations,
  filtering, point processing, connected components, and morphology.
- The documented examples show API composition across load, process, save, and
  release steps.
- The repository includes reference output images for several operations.

### Honest limitations

- The README names ease of use and performance as project goals, but the
  repository does not provide benchmarks that verify a performance claim.
- Automated test coverage is not present in the reviewed snapshot.
- Some declared operations require a code-quality review before they are
  described as complete; for example, the reviewed Sobel function returns an
  empty image.
- Real-world adoption, user count, and production deployment are unverified.

### Recommended case-study callout

> Immagine demonstrates how I break a low-level problem into a focused C++ API:
> explicit data ownership, modular processing stages, portable CMake targets,
> and examples that compose simple operations into useful workflows.

### Evidence

- [README and usage examples](https://github.com/IsmailSamirIbrahim/Immagine/blob/c7c9713d28407d7baf36e9766a249b4a1a693b77/README.md)
- [Image API](https://github.com/IsmailSamirIbrahim/Immagine/blob/c7c9713d28407d7baf36e9766a249b4a1a693b77/immagine/include/Immagine/Image.h)
- [Convolution API](https://github.com/IsmailSamirIbrahim/Immagine/blob/c7c9713d28407d7baf36e9766a249b4a1a693b77/immagine/include/Immagine/Convolution.h)
- [Library build target](https://github.com/IsmailSamirIbrahim/Immagine/blob/c7c9713d28407d7baf36e9766a249b4a1a693b77/immagine/CMakeLists.txt)

## Breakout Game

Repository:
[IsmailSamirIbrahim/Breakout-Game](https://github.com/IsmailSamirIbrahim/Breakout-Game)

Verified source snapshot:
[`b2ddc413a39cfd677d585f2d9968262a53b2165d`](https://github.com/IsmailSamirIbrahim/Breakout-Game/tree/b2ddc413a39cfd677d585f2d9968262a53b2165d)

### Portfolio summary

A C++ and OpenGL implementation of the classic Breakout game, structured as
separate game, rendering, shader, texture, resource, window, and executable
targets.

### Problem

A small real-time game still has to coordinate several systems: input, frame
timing, state transitions, collision response, level data, GPU programs,
textures, drawing, and resource cleanup. This project uses Breakout's familiar
rules as a bounded way to explore those responsibilities in a modular C++
codebase.

### Role

The repository demonstrates work across the game loop, state model, collision
logic, component data, OpenGL rendering, shader programs, texture loading,
resource lookup, build configuration, level files, and platform setup notes.

**Confirmation needed:** Confirm that Ismail designed and implemented every
module personally before describing the project as a solo build.

### Process and key decisions

1. Split the code into dedicated CMake targets for the game, shader programs,
   textures, renderer, resource manager, and playground executable.
2. Represent the game as explicit menu, active, won, and loss states.
3. Use delta time from GLFW so paddle and ball movement are based on elapsed
   frame time rather than a fixed frame rate.
4. Load shaders, textures, and level descriptions through a central resource
   manager.
5. Render textured sprites with an orthographic projection and small GLSL
   vertex and fragment shaders.
6. Resolve circle-versus-axis-aligned-box collisions using the closest point,
   direction classification, velocity reversal, and penetration correction.
7. Adjust the ball's horizontal response based on where it hits the paddle
   while preserving the prior speed magnitude.

### Solution

The game includes:

- a menu, active play, win, and loss flow;
- paddle input, a launchable ball, three lives, and level progression;
- four data-driven level files;
- solid and destructible bricks;
- ball-to-edge, ball-to-brick, and ball-to-paddle collision handling;
- reset behavior after a lost ball or completed level;
- sprite rendering backed by OpenGL shaders and textures;
- cached program and texture resources;
- Windows and Linux build instructions;
- menu and gameplay screenshots in the repository.

### Technology

- C++17 and CMake 3.9+
- OpenGL and GLSL
- GLFW for windows, input, timing, and the event loop
- GLEW for OpenGL extension loading
- GLM for vectors, matrices, clamping, normalization, and projection
- `stb_image` for texture loading
- Data-driven text level files

### Verified outcome

- The code implements a complete render loop with input, update, rendering,
  buffer swap, and event polling.
- The state machine covers the full start, play, win, and loss path.
- The repository contains four playable level layouts.
- Collision response distinguishes impact direction and corrects overlap.
- The README includes Windows and Linux setup instructions plus menu and
  gameplay captures.

### Honest limitations

- No frame-time, memory, or rendering benchmark is included.
- Automated gameplay or collision tests are not present in the reviewed
  snapshot.
- Distribution packages and a hosted playable build are not provided.
- Player count, production deployment, and external adoption are unverified.

### Recommended case-study callout

> Breakout gave me a compact environment for connecting real-time systems:
> frame-based input, collision response, state transitions, resource ownership,
> OpenGL shaders, and a renderer organized behind reusable C++ modules.

### Evidence

- [README, build guide, and screenshots](https://github.com/IsmailSamirIbrahim/Breakout-Game/blob/b2ddc413a39cfd677d585f2d9968262a53b2165d/README.md)
- [Game state and data model](https://github.com/IsmailSamirIbrahim/Breakout-Game/blob/b2ddc413a39cfd677d585f2d9968262a53b2165d/game/include/game/game.h)
- [Collision implementation](https://github.com/IsmailSamirIbrahim/Breakout-Game/blob/b2ddc413a39cfd677d585f2d9968262a53b2165d/game/include/game/collision.h)
- [Game loop](https://github.com/IsmailSamirIbrahim/Breakout-Game/blob/b2ddc413a39cfd677d585f2d9968262a53b2165d/game/src/game/game.cpp)
- [Project build graph](https://github.com/IsmailSamirIbrahim/Breakout-Game/blob/b2ddc413a39cfd677d585f2d9968262a53b2165d/CMakeLists.txt)

## Thread Pool

Repository:
[IsmailSamirIbrahim/Thread-Pool](https://github.com/IsmailSamirIbrahim/Thread-Pool)

Verified source snapshot:
[`79821cd02e40c4694302762b120e48364164732c`](https://github.com/IsmailSamirIbrahim/Thread-Pool/tree/79821cd02e40c4694302762b120e48364164732c)

### Portfolio summary

A compact C++ thread-pool exercise that accepts arbitrary callables, schedules
them across worker threads, and returns futures for results and completion.

### Problem

Starting a new thread for every small task creates unnecessary lifecycle
overhead and makes coordination harder. A thread pool keeps a fixed worker set
alive, places submitted work in a shared queue, wakes workers when tasks arrive,
and gives callers a consistent way to observe completion or retrieve a result.

### Role

The repository demonstrates the complete concurrency path: a bounded task
queue, worker creation, condition-variable waiting, callable binding,
`packaged_task` wrapping, future delivery, shutdown signaling, joining, CMake
integration, and a runnable example.

**Confirmation needed:** Confirm that Ismail designed and implemented the full
library before presenting it as a solo project.

### Process and key decisions

1. Keep the implementation header-based behind a CMake interface target.
2. Store generic work as `std::function<void()>` so workers execute one uniform
   task type.
3. Bind functions and arguments, then wrap the bound callable in
   `std::packaged_task` to preserve return values and exceptions through a
   future.
4. Protect the queue and shutdown condition with a mutex.
5. Put idle workers to sleep on a condition variable and wake one worker after
   submission.
6. On destruction, set the shutdown flag, wake all workers, drain queued work,
   and join every thread.
7. Demonstrate fire-and-forget submission, reference arguments, and returned
   values.

### Solution

`Thread_Pool::submit` accepts a callable and arguments, creates a packaged task,
queues a no-argument wrapper, wakes a worker, and returns the task's future.
Workers wait until shutdown or work is available, move a task from the queue,
and run it outside the critical section. The accompanying queue is a
mutex-protected fixed-capacity circular buffer.

### Technology

- C++ standard threading library
- `std::thread`
- `std::mutex` and `std::unique_lock`
- `std::condition_variable`
- `std::function`, `std::bind`, and perfect forwarding
- `std::packaged_task`, `std::future`, and `std::shared_ptr`
- CMake interface library

The README describes the implementation as C++11. The reviewed CMake target
currently requests C++17, while the concurrency primitives themselves are from
the C++11 standard library. The portfolio should state both facts precisely.

### Verified outcome

- Tasks can be submitted with copied values or reference-wrapped arguments.
- Callers receive futures for void and value-returning operations.
- Worker threads block when no task is available instead of continuously
  polling.
- Pool destruction signals shutdown and joins the worker set.
- The repository includes a small program exercising its three documented
  submission patterns.

### Honest limitations

- The queue has a fixed capacity of 1,024 tasks and uses assertions rather than
  a recoverable overload policy.
- The reviewed snapshot contains no stress tests, race-detection results,
  benchmarks, cancellation behavior, or task-priority support.
- Production hardening, real-world adoption, and measured speedup are
  unverified.
- Describe this as a focused concurrency implementation, not a production task
  runtime.

### Recommended case-study callout

> Thread Pool focuses on the coordination details behind a small concurrency
> abstraction: sleeping workers, bounded shared state, generic callable
> wrapping, future-based results, and orderly shutdown.

### Evidence

- [README and usage example](https://github.com/IsmailSamirIbrahim/Thread-Pool/blob/79821cd02e40c4694302762b120e48364164732c/README.md)
- [Thread-pool implementation](https://github.com/IsmailSamirIbrahim/Thread-Pool/blob/79821cd02e40c4694302762b120e48364164732c/thread_pool/include/pool/Thread_Pool.h)
- [Bounded queue implementation](https://github.com/IsmailSamirIbrahim/Thread-Pool/blob/79821cd02e40c4694302762b120e48364164732c/thread_pool/include/pool/Queue.h)
- [CMake interface target](https://github.com/IsmailSamirIbrahim/Thread-Pool/blob/79821cd02e40c4694302762b120e48364164732c/thread_pool/CMakeLists.txt)

## Confirmation checklist

The three narratives are complete from repository evidence. Before removing the
remaining confirmation labels, ask Ismail:

- Did you design and implement every module in each repository yourself?
- What motivated each project, beyond learning or technical exploration?
- Did anyone use any project outside the repository examples?
- Are there measured performance, memory, or reliability results that can be
  reproduced and published?
- Which project best represents your current engineering level?
