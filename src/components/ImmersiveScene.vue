<script setup lang="ts">
import {
  AdditiveBlending,
  AmbientLight,
  BoxGeometry,
  BufferGeometry,
  Clock,
  Color,
  DirectionalLight,
  DoubleSide,
  EdgesGeometry,
  Fog,
  Float32BufferAttribute,
  GridHelper,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Points,
  PointsMaterial,
  SRGBColorSpace,
  Scene,
  SphereGeometry,
  TorusGeometry,
  WebGLRenderer,
} from 'three'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  reducedMotion: boolean
}>()

const emit = defineEmits<{
  failed: []
  ready: []
}>()

const canvas = ref<HTMLCanvasElement | null>(null)
const sceneRoot = ref<HTMLElement | null>(null)

let animationFrame: number | undefined
let renderer: WebGLRenderer | undefined
let resizeObserver: ResizeObserver | undefined
let scene: Scene | undefined
let camera: PerspectiveCamera | undefined
let observatory: Group | undefined
let orbitalRig: Group | undefined
let starField: Points | undefined
let isMounted = false

const clock = new Clock(false)
const disposableGeometries: BufferGeometry[] = []
const disposableMaterials: (
  | LineBasicMaterial
  | MeshPhysicalMaterial
  | MeshStandardMaterial
  | PointsMaterial
)[] = []

function trackGeometry<T extends BufferGeometry>(geometry: T): T {
  disposableGeometries.push(geometry)
  return geometry
}

function trackMaterial<
  T extends
    | LineBasicMaterial
    | MeshPhysicalMaterial
    | MeshStandardMaterial
    | PointsMaterial,
>(material: T): T {
  disposableMaterials.push(material)
  return material
}

function createScene() {
  if (!canvas.value) {
    throw new Error('The immersive canvas is unavailable.')
  }

  scene = new Scene()
  scene.fog = new Fog(0xf2ece2, 10, 27)

  camera = new PerspectiveCamera(38, 1, 0.1, 60)
  camera.position.set(7.5, 5.2, 10.5)
  camera.lookAt(0, 1.5, 0)

  renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: canvas.value,
    powerPreference: 'high-performance',
  })
  renderer.setClearColor(0xf5efe6, 0)
  renderer.outputColorSpace = SRGBColorSpace

  scene.add(new AmbientLight(0xfff6e8, 1.7))

  const keyLight = new DirectionalLight(0xfff3dc, 4.2)
  keyLight.position.set(5, 9, 7)
  scene.add(keyLight)

  const blueLight = new PointLight(0x1a70ff, 45, 14, 1.8)
  blueLight.position.set(-3.5, 3.2, 3)
  scene.add(blueLight)

  const orangeLight = new PointLight(0xff7138, 34, 11, 1.8)
  orangeLight.position.set(4, 2, -2)
  scene.add(orangeLight)

  observatory = new Group()
  observatory.position.y = 0.2
  observatory.rotation.y = -0.22
  scene.add(observatory)

  const floorMaterial = trackMaterial(
    new MeshStandardMaterial({
      color: 0xefe7db,
      metalness: 0.08,
      roughness: 0.88,
      side: DoubleSide,
    }),
  )
  const floor = new Mesh(trackGeometry(new PlaneGeometry(17, 13)), floorMaterial)
  floor.rotation.x = -Math.PI / 2
  floor.position.y = -1.65
  observatory.add(floor)

  const grid = new GridHelper(17, 28, 0x174d9c, 0xa8b5c9)
  grid.position.y = -1.63
  grid.material.opacity = 0.19
  grid.material.transparent = true
  observatory.add(grid)
  if (Array.isArray(grid.material)) {
    grid.material.forEach((material) =>
      disposableMaterials.push(material as LineBasicMaterial),
    )
  } else {
    disposableMaterials.push(grid.material as LineBasicMaterial)
  }
  disposableGeometries.push(grid.geometry)

  const consoleMaterial = trackMaterial(
    new MeshStandardMaterial({
      color: 0x17345b,
      metalness: 0.62,
      roughness: 0.35,
    }),
  )
  const trimMaterial = trackMaterial(
    new MeshStandardMaterial({
      color: 0xece8df,
      metalness: 0.68,
      roughness: 0.26,
    }),
  )

  const platform = new Mesh(
    trackGeometry(new BoxGeometry(5.6, 0.42, 4.8)),
    consoleMaterial,
  )
  platform.position.y = -1.38
  observatory.add(platform)

  const platformEdges = new LineSegments(
    trackGeometry(new EdgesGeometry(platform.geometry)),
    trackMaterial(
      new LineBasicMaterial({
        color: 0x89b9ff,
        transparent: true,
        opacity: 0.7,
      }),
    ),
  )
  platformEdges.position.copy(platform.position)
  observatory.add(platformEdges)

  const coreMaterial = trackMaterial(
    new MeshPhysicalMaterial({
      color: 0xbad8ff,
      emissive: new Color(0x075bd8),
      emissiveIntensity: 2.8,
      metalness: 0.15,
      roughness: 0.12,
      transmission: 0.12,
      transparent: true,
      opacity: 0.96,
    }),
  )
  const core = new Mesh(
    trackGeometry(new IcosahedronGeometry(1.12, 2)),
    coreMaterial,
  )
  core.name = 'core'
  core.position.y = 0.6
  observatory.add(core)

  orbitalRig = new Group()
  orbitalRig.position.copy(core.position)
  observatory.add(orbitalRig)

  const ringMaterial = trackMaterial(
    new MeshStandardMaterial({
      color: 0x4c79ad,
      emissive: new Color(0x113e76),
      emissiveIntensity: 0.8,
      metalness: 0.9,
      roughness: 0.2,
    }),
  )
  const ringGeometry = trackGeometry(new TorusGeometry(2.05, 0.055, 10, 96))

  const ringA = new Mesh(ringGeometry, ringMaterial)
  ringA.rotation.set(Math.PI / 2.7, 0.18, 0)
  orbitalRig.add(ringA)

  const ringB = new Mesh(ringGeometry, ringMaterial)
  ringB.rotation.set(-Math.PI / 3.4, Math.PI / 2, 0.3)
  orbitalRig.add(ringB)

  const satelliteMaterial = trackMaterial(
    new MeshPhysicalMaterial({
      color: 0xffb18a,
      emissive: new Color(0xff5a1f),
      emissiveIntensity: 2.2,
      metalness: 0.25,
      roughness: 0.2,
    }),
  )
  const satellite = new Mesh(
    trackGeometry(new SphereGeometry(0.18, 18, 18)),
    satelliteMaterial,
  )
  satellite.name = 'satellite'
  satellite.position.set(2.05, 0, 0)
  orbitalRig.add(satellite)

  const pillarGeometry = trackGeometry(new BoxGeometry(0.28, 3.4, 0.28))
  const capGeometry = trackGeometry(new BoxGeometry(0.56, 0.14, 0.56))
  for (const [x, z] of [
    [-2.45, -2],
    [2.45, -2],
    [-2.45, 2],
    [2.45, 2],
  ] as const) {
    const pillar = new Mesh(pillarGeometry, trimMaterial)
    pillar.position.set(x, 0.05, z)
    observatory.add(pillar)

    const cap = new Mesh(capGeometry, consoleMaterial)
    cap.position.set(x, 1.8, z)
    observatory.add(cap)
  }

  const starPositions = new Float32Array(180 * 3)
  for (let index = 0; index < starPositions.length; index += 3) {
    const angle = (index / 3) * 2.39996
    const radius = 7 + ((index / 3) % 17) * 0.32
    starPositions[index] = Math.cos(angle) * radius
    starPositions[index + 1] = -0.5 + ((index / 3) % 23) * 0.33
    starPositions[index + 2] = Math.sin(angle) * radius
  }

  const starGeometry = trackGeometry(new BufferGeometry())
  starGeometry.setAttribute('position', new Float32BufferAttribute(starPositions, 3))
  const material = trackMaterial(
    new PointsMaterial({
      blending: AdditiveBlending,
      color: 0x2769c7,
      opacity: 0.5,
      size: 0.045,
      transparent: true,
    }),
  )
  starField = new Points(starGeometry, material)
  scene.add(starField)
}

function resize() {
  if (!renderer || !camera || !scene || !sceneRoot.value) return

  const width = Math.max(1, sceneRoot.value.clientWidth)
  const height = Math.max(1, sceneRoot.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
  renderer.setSize(width, height, false)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.render(scene, camera)
}

function renderFrame() {
  if (!renderer || !scene || !camera) return

  const elapsed = clock.getElapsedTime()
  if (observatory) {
    observatory.rotation.y = -0.22 + Math.sin(elapsed * 0.18) * 0.08
  }
  if (orbitalRig) {
    orbitalRig.rotation.y = elapsed * 0.42
    orbitalRig.rotation.z = Math.sin(elapsed * 0.31) * 0.12
    const core = observatory?.getObjectByName('core')
    if (core) {
      const pulse = 1 + Math.sin(elapsed * 1.8) * 0.035
      core.scale.setScalar(pulse)
    }
  }
  if (starField) {
    starField.rotation.y = elapsed * 0.012
  }

  renderer.render(scene, camera)
  animationFrame = window.requestAnimationFrame(renderFrame)
}

function stopRendering() {
  if (animationFrame !== undefined) {
    window.cancelAnimationFrame(animationFrame)
    animationFrame = undefined
  }
  clock.stop()
}

function startRendering() {
  stopRendering()
  if (!renderer || !scene || !camera) return

  if (!isMounted || document.hidden || props.reducedMotion) {
    renderer.render(scene, camera)
    return
  }
  clock.start()
  animationFrame = window.requestAnimationFrame(renderFrame)
}

function handleVisibilityChange() {
  if (document.hidden) {
    stopRendering()
  } else {
    startRendering()
  }
}

function handleContextLost(event: Event) {
  event.preventDefault()
  stopRendering()
  emit('failed')
}

function disposeScene() {
  stopRendering()
  resizeObserver?.disconnect()
  resizeObserver = undefined
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  canvas.value?.removeEventListener('webglcontextlost', handleContextLost)

  disposableGeometries.splice(0).forEach((geometry) => geometry.dispose())
  disposableMaterials.splice(0).forEach((material) => material.dispose())
  scene?.clear()
  renderer?.dispose()
  renderer?.forceContextLoss()

  renderer = undefined
  scene = undefined
  camera = undefined
  observatory = undefined
  orbitalRig = undefined
  starField = undefined
}

watch(
  () => props.reducedMotion,
  () => startRendering(),
)

onMounted(() => {
  isMounted = true

  try {
    if (!sceneRoot.value) {
      throw new Error('The immersive scene container is unavailable.')
    }

    createScene()
    resize()

    resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(sceneRoot.value)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    canvas.value?.addEventListener('webglcontextlost', handleContextLost)

    startRendering()
    emit('ready')
  } catch {
    disposeScene()
    emit('failed')
  }
})

onBeforeUnmount(() => {
  isMounted = false
  disposeScene()
})
</script>

<template>
  <div
    ref="sceneRoot"
    class="immersive-scene"
    role="img"
    aria-label="A kinetic engineering observatory with an illuminated geometric core"
  >
    <canvas ref="canvas" class="immersive-scene__canvas" aria-hidden="true" />
    <div class="immersive-scene__vignette" />
  </div>
</template>

<style scoped>
.immersive-scene {
  overflow: hidden;
  isolation: isolate;
  background:
    radial-gradient(circle at 35% 35%, rgb(105 164 255 / 22%), transparent 32%),
    radial-gradient(circle at 78% 62%, rgb(255 111 55 / 15%), transparent 26%),
    linear-gradient(145deg, #f6f1e9 8%, #e8edf3 52%, #f3eadf);
}

.immersive-scene__canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.immersive-scene__vignette {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      90deg,
      rgb(245 239 230 / 96%) 0%,
      rgb(245 239 230 / 90%) 28%,
      rgb(245 239 230 / 35%) 58%,
      rgb(245 239 230 / 28%) 75%,
      rgb(245 239 230 / 62%) 100%
    ),
    linear-gradient(0deg, rgb(245 239 230 / 78%), transparent 38%);
  pointer-events: none;
}
</style>
