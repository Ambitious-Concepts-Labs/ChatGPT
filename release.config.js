module.exports = {
  branches: [
    'main',
    {
      name: 'beta',
      prerelease: true
    },
    {
      name: 'feature-branch',
      prerelease: true
    }
  ],
  rules: {
        'body-max-line-length': [0, 'always'],
        'footer-max-line-length': [0, 'always'] 
    },
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md'
      }
    ],
    '@semantic-release/npm',
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'dist/**'],
        message: 'chore(release): set `package.json` to ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ]
  ]
}