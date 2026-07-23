const pairs = [
  {
    background: '#f5efe6',
    foreground: '#2d2a24',
    minimum: 4.5,
    name: 'primary text on page',
  },
  {
    background: '#f5efe6',
    foreground: '#5f5646',
    minimum: 4.5,
    name: 'secondary text on page',
  },
  {
    background: '#f5efe6',
    foreground: '#052e87',
    minimum: 4.5,
    name: 'links on page',
  },
  {
    background: '#052e87',
    foreground: '#ffffff',
    minimum: 4.5,
    name: 'text on deep blue',
  },
  {
    background: '#ff8400',
    foreground: '#2d2a24',
    minimum: 4.5,
    name: 'text on orange action',
  },
  {
    background: '#e1f5ff',
    foreground: '#002474',
    minimum: 4.5,
    name: 'text on cyan information surface',
  },
  {
    background: '#e9ded0',
    foreground: '#2d2a24',
    minimum: 4.5,
    name: 'primary text on raised surface',
  },
  {
    background: '#e9ded0',
    foreground: '#5f5646',
    minimum: 4.5,
    name: 'secondary text on raised surface',
  },
]

function channelToLinear(channel) {
  const value = channel / 255
  return value <= 0.04045
    ? value / 12.92
    : ((value + 0.055) / 1.055) ** 2.4
}

function luminance(hex) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    .map((channel) => channelToLinear(Number.parseInt(channel, 16)))

  return (
    0.2126 * channels[0] +
    0.7152 * channels[1] +
    0.0722 * channels[2]
  )
}

function contrast(foreground, background) {
  const foregroundLuminance = luminance(foreground)
  const backgroundLuminance = luminance(background)
  const lighter = Math.max(foregroundLuminance, backgroundLuminance)
  const darker = Math.min(foregroundLuminance, backgroundLuminance)

  return (lighter + 0.05) / (darker + 0.05)
}

let failed = false

for (const pair of pairs) {
  const ratio = contrast(pair.foreground, pair.background)
  const passed = ratio >= pair.minimum
  failed ||= !passed
  console.log(
    `${passed ? 'PASS' : 'FAIL'} ${ratio.toFixed(2)}:1 ${pair.name}`,
  )
}

if (failed) {
  process.exitCode = 1
}
