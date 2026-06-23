import preset from '@sanity/prettier-config'

const config = {
  ...preset,
  plugins: [...preset.plugins, '@ianvs/prettier-plugin-sort-imports'],
}

export default config
