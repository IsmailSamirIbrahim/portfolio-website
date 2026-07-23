import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
)

const sourceRootFlag = process.argv.indexOf('--source-root')
const sourceRoot =
  sourceRootFlag >= 0
    ? process.argv[sourceRootFlag + 1]
    : path.resolve(projectRoot, '..', 'portfolio-case-study-repos')

if (!sourceRoot) {
  throw new Error('Provide a value after --source-root.')
}

const outputRoot = path.join(projectRoot, 'public', 'media', 'projects')

const sources = {
  breakout: {
    game: path.join(sourceRoot, 'Breakout-Game', 'images', 'Game.PNG'),
    menu: path.join(sourceRoot, 'Breakout-Game', 'images', 'Menu.PNG'),
  },
  immagine: {
    blurred: path.join(sourceRoot, 'Immagine', 'images', 'blured_image.png'),
    colored: path.join(sourceRoot, 'Immagine', 'images', 'colored.png'),
    input: path.join(sourceRoot, 'Immagine', 'images', 'black_and_white.jpg'),
  },
}

const outputDirectories = ['immagine', 'breakout-game', 'thread-pool']
await Promise.all(
  outputDirectories.map((directory) =>
    mkdir(path.join(outputRoot, directory), { recursive: true }),
  ),
)

async function writeOptimized(source, destination, quality = 82) {
  await sharp(source)
    .rotate()
    .webp({
      effort: 6,
      quality,
      smartSubsample: true,
    })
    .toFile(destination)
}

const immagineLeft = await sharp(sources.immagine.input)
  .resize({
    fit: 'cover',
    height: 620,
    width: 540,
  })
  .webp({ quality: 88 })
  .toBuffer()

const immagineRight = await sharp(sources.immagine.colored)
  .resize({
    fit: 'cover',
    height: 620,
    width: 540,
  })
  .webp({ quality: 88 })
  .toBuffer()

await sharp({
  create: {
    background: '#052e87',
    channels: 4,
    height: 750,
    width: 1200,
  },
})
  .composite([
    { input: immagineLeft, left: 40, top: 65 },
    { input: immagineRight, left: 620, top: 65 },
  ])
  .webp({ effort: 6, quality: 84, smartSubsample: true })
  .toFile(path.join(outputRoot, 'immagine', 'cover.webp'))

const breakoutScreenshot = await sharp(sources.breakout.game)
  .resize({
    fit: 'inside',
    height: 650,
    width: 1080,
    withoutEnlargement: true,
  })
  .webp({ quality: 88 })
  .toBuffer()

const breakoutMetadata = await sharp(breakoutScreenshot).metadata()
const breakoutLeft = Math.round((1200 - (breakoutMetadata.width ?? 0)) / 2)
const breakoutTop = Math.round((750 - (breakoutMetadata.height ?? 0)) / 2)

await sharp({
  create: {
    background: '#2d2a24',
    channels: 4,
    height: 750,
    width: 1200,
  },
})
  .composite([
    {
      input: breakoutScreenshot,
      left: breakoutLeft,
      top: breakoutTop,
    },
  ])
  .webp({ effort: 6, quality: 84, smartSubsample: true })
  .toFile(path.join(outputRoot, 'breakout-game', 'cover.webp'))

const threadPoolCover = `
  <svg width="1200" height="750" viewBox="0 0 1200 750" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="750" fill="#f5efe6"/>
    <g fill="none" stroke="#dfd2bf" stroke-width="3">
      <path d="M310 375H445"/>
      <path d="M755 375H890"/>
      <path d="M755 375L890 205"/>
      <path d="M755 375L890 545"/>
    </g>
    <g font-family="Arial, Helvetica, sans-serif" text-anchor="middle">
      <rect x="70" y="300" width="240" height="150" rx="24" fill="#ff8400"/>
      <text x="190" y="365" fill="#ffffff" font-size="28" font-weight="700">SUBMIT</text>
      <text x="190" y="405" fill="#ffffff" font-size="20">callable + arguments</text>

      <rect x="445" y="260" width="310" height="230" rx="28" fill="#052e87"/>
      <text x="600" y="345" fill="#ffffff" font-size="30" font-weight="700">TASK QUEUE</text>
      <text x="600" y="390" fill="#e1f5ff" font-size="21">packaged_task</text>
      <text x="600" y="425" fill="#e1f5ff" font-size="21">condition_variable</text>

      <g fill="#2d2a24">
        <rect x="890" y="130" width="240" height="150" rx="24"/>
        <rect x="890" y="300" width="240" height="150" rx="24"/>
        <rect x="890" y="470" width="240" height="150" rx="24"/>
      </g>
      <g fill="#ffffff" font-size="26" font-weight="700">
        <text x="1010" y="218">WORKER 01</text>
        <text x="1010" y="388">WORKER 02</text>
        <text x="1010" y="558">WORKER 03</text>
      </g>
    </g>
  </svg>
`

await sharp(Buffer.from(threadPoolCover))
  .webp({ effort: 6, quality: 88, smartSubsample: true })
  .toFile(path.join(outputRoot, 'thread-pool', 'cover.webp'))

await Promise.all([
  writeOptimized(
    sources.immagine.input,
    path.join(outputRoot, 'immagine', 'connected-components-input.webp'),
  ),
  writeOptimized(
    sources.immagine.colored,
    path.join(outputRoot, 'immagine', 'connected-components-output.webp'),
  ),
  writeOptimized(
    sources.immagine.blurred,
    path.join(outputRoot, 'immagine', 'gaussian-blur-output.webp'),
  ),
  writeOptimized(
    sources.breakout.menu,
    path.join(outputRoot, 'breakout-game', 'menu.webp'),
  ),
  writeOptimized(
    sources.breakout.game,
    path.join(outputRoot, 'breakout-game', 'gameplay.webp'),
  ),
])

const manifest = {
  version: 1,
  notes: [
    'All repository media is tied to an immutable source commit.',
    'No verified project video was available in the reviewed repositories.',
    'The Thread Pool cover is a source-derived architecture diagram, not a benchmark visualization.',
  ],
  assets: [
    {
      alt: 'A black-and-white input image beside the same connected components rendered in distinct colors.',
      height: 750,
      path: '/media/projects/immagine/cover.webp',
      project: 'Immagine',
      source: {
        commit: 'c7c9713d28407d7baf36e9766a249b4a1a693b77',
        files: ['images/black_and_white.jpg', 'images/colored.png'],
        repository: 'https://github.com/IsmailSamirIbrahim/Immagine',
        type: 'repository composite',
      },
      usage: 'cover',
      width: 1200,
    },
    {
      alt: 'Black-and-white shapes used as input for connected-component labeling.',
      height: 708,
      path: '/media/projects/immagine/connected-components-input.webp',
      project: 'Immagine',
      source: {
        commit: 'c7c9713d28407d7baf36e9766a249b4a1a693b77',
        files: ['images/black_and_white.jpg'],
        repository: 'https://github.com/IsmailSamirIbrahim/Immagine',
        type: 'repository image',
      },
      usage: 'case study',
      width: 1000,
    },
    {
      alt: 'Connected image components rendered in different colors after labeling.',
      height: 708,
      path: '/media/projects/immagine/connected-components-output.webp',
      project: 'Immagine',
      source: {
        commit: 'c7c9713d28407d7baf36e9766a249b4a1a693b77',
        files: ['images/colored.png'],
        repository: 'https://github.com/IsmailSamirIbrahim/Immagine',
        type: 'repository image',
      },
      usage: 'case study',
      width: 1000,
    },
    {
      alt: 'Portrait after the Immagine Gaussian blur example.',
      height: 512,
      path: '/media/projects/immagine/gaussian-blur-output.webp',
      project: 'Immagine',
      source: {
        commit: 'c7c9713d28407d7baf36e9766a249b4a1a693b77',
        files: ['images/blured_image.png'],
        repository: 'https://github.com/IsmailSamirIbrahim/Immagine',
        type: 'repository image',
      },
      usage: 'case study',
      width: 512,
    },
    {
      alt: 'Breakout gameplay with a paddle, ball, multicolored brick rows, and three remaining lives.',
      height: 750,
      path: '/media/projects/breakout-game/cover.webp',
      project: 'Breakout Game',
      source: {
        commit: 'b2ddc413a39cfd677d585f2d9968262a53b2165d',
        files: ['images/Game.PNG'],
        repository: 'https://github.com/IsmailSamirIbrahim/Breakout-Game',
        type: 'repository image with neutral frame',
      },
      usage: 'cover',
      width: 1200,
    },
    {
      alt: 'Breakout start menu with Play and Exit keyboard instructions.',
      height: 633,
      path: '/media/projects/breakout-game/menu.webp',
      project: 'Breakout Game',
      source: {
        commit: 'b2ddc413a39cfd677d585f2d9968262a53b2165d',
        files: ['images/Menu.PNG'],
        repository: 'https://github.com/IsmailSamirIbrahim/Breakout-Game',
        type: 'repository image',
      },
      usage: 'case study',
      width: 901,
    },
    {
      alt: 'Breakout gameplay showing the paddle returning a ball toward rows of bricks.',
      height: 636,
      path: '/media/projects/breakout-game/gameplay.webp',
      project: 'Breakout Game',
      source: {
        commit: 'b2ddc413a39cfd677d585f2d9968262a53b2165d',
        files: ['images/Game.PNG'],
        repository: 'https://github.com/IsmailSamirIbrahim/Breakout-Game',
        type: 'repository image',
      },
      usage: 'case study',
      width: 904,
    },
    {
      alt: 'Diagram showing submitted callables entering a shared task queue and being distributed to three worker threads.',
      height: 750,
      path: '/media/projects/thread-pool/cover.webp',
      project: 'Thread Pool',
      source: {
        commit: '79821cd02e40c4694302762b120e48364164732c',
        files: [
          'thread_pool/include/pool/Thread_Pool.h',
          'thread_pool/include/pool/Queue.h',
        ],
        repository: 'https://github.com/IsmailSamirIbrahim/Thread-Pool',
        type: 'source-derived diagram',
      },
      usage: 'cover',
      width: 1200,
    },
  ],
}

await writeFile(
  path.join(outputRoot, 'media-manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
  'utf8',
)

console.log(`Generated ${manifest.assets.length} verified media assets.`)
