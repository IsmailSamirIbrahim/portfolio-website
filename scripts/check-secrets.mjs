import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const allowedSensitiveTemplates = new Set(['.env.example', '.env.sample'])
const sensitiveFilePatterns = [
  /^\.env(?:\.|$)/i,
  /(?:^|\/)id_(?:rsa|dsa|ecdsa|ed25519)$/i,
  /\.(?:key|p12|pfx|pem)$/i,
  /(?:^|\/)(?:credentials|service-account)\.json$/i,
]

const signaturePatterns = [
  {
    name: 'private key',
    pattern: new RegExp(
      '-----BEGIN ' + '(?:RSA |EC |OPENSSH )?PRIVATE KEY-----',
    ),
  },
  {
    name: 'GitHub legacy token',
    pattern: new RegExp('gh' + '[pousr]_[A-Za-z0-9]{30,}'),
  },
  {
    name: 'GitHub fine-grained token',
    pattern: new RegExp('github_' + 'pat_[A-Za-z0-9_]{30,}'),
  },
  {
    name: 'AWS access key',
    pattern: new RegExp('AK' + 'IA[0-9A-Z]{16}'),
  },
  {
    name: 'Google API key',
    pattern: new RegExp('AI' + 'za[0-9A-Za-z_-]{32,}'),
  },
  {
    name: 'OpenAI-style API key',
    pattern: new RegExp('sk-' + '[A-Za-z0-9_-]{32,}'),
  },
]

const trackedFiles = execFileSync('git', ['ls-files', '-z'], {
  encoding: 'utf8',
})
  .split('\0')
  .filter(Boolean)

const violations = []

for (const file of trackedFiles) {
  const normalized = file.replaceAll('\\', '/')
  const basename = normalized.split('/').at(-1)

  if (
    !allowedSensitiveTemplates.has(basename) &&
    sensitiveFilePatterns.some((pattern) => pattern.test(normalized))
  ) {
    violations.push(`${file}: sensitive filename is tracked`)
    continue
  }

  const bytes = readFileSync(file)
  if (bytes.includes(0)) {
    continue
  }

  const content = bytes.toString('utf8')
  for (const signature of signaturePatterns) {
    if (signature.pattern.test(content)) {
      violations.push(`${file}: possible ${signature.name}`)
    }
  }
}

if (violations.length > 0) {
  console.error('Potential secrets found in tracked files:')
  for (const violation of violations) {
    console.error(`- ${violation}`)
  }
  process.exitCode = 1
} else {
  console.log(`PASS scanned ${trackedFiles.length} tracked files for secrets`)
}
