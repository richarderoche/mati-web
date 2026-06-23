import { defineQuery } from 'next-sanity'

// PARTIALS
const seo = `
  "seoTitle": seo.seoTitle,
  "description": seo.description,
  "ogImage": seo.image,
  "noIndex": seo.hideFromSearchEngines
`

const page = `
  "type": _type,
  "slug": slug.current,
  title
`

const link = `
  ...,
  "page": page->{
    ${page},
  }
`

const tags = `
  "tags": tags[]->{
    ...,
    "slug": slug.current,
  }
`

const articleThumbs = `
  _type,
  title,
  "slug": slug.current,
  publishDate,
  coverImage,
  coverImageAlt,
  introText,
  postType,
  externalLink,
  quoteEnglish,
  nativeAlphabet,
  quoteNative,
  ${tags},
`
// Only blog articles, for blog page
export const allArticlesQuery = defineQuery(`
  *[_type == "article" && defined(slug.current)] | order(publishDate desc, _updatedAt desc) {
    ${articleThumbs}
  }
`)

const pbButton = `
  ...,
  sitePage {
    ${link},
  },
  externalLink {
    ${link},
  },
  fileLink {
    ...,
    "url": file.asset->url,
  },
`

const portableText = `
  ...,
  markDefs[]{
    ...,
    _type == "internalLink" => {
      ...,
      "slug": reference->slug,
      "type": reference->_type
    }
  }
`

const pbBlocks = `
  ...,
  _type == "pbBlockText" => {
    ...,
    textContent[]{
      ${portableText}
    }
  },
  _type == "pbBlockButton" => {
    ${pbButton}
  },
  _type == "pbBlockSocial" => {
    ...,
    "socialIcons": select(
      useFooterIcons == true => *[_type == "settings"][0].socialIcons,
      socialIcons
    )
  },
  _type == "pbBlockPublicationsList" => {
    ...,
    publications[]{
      ...,
      "fileUrl": 'test'
    }
  },
  _type == "pbBlockLottie" => {
    ...,
    "lottieFile": lottieFile.asset->url,
  }
`

const pb = `
  pbSections[]{
    ...,
    _type == "pbGrid" => {
      columns[]{
        ...,
        pbBlocks[]{
          ${pbBlocks}
        }
      }
    },
    _type == "pbSingleColumn" => {
      ...,
      pbBlocks[]{
        ${pbBlocks}
      }
    },
    _type == "pbTwoUpGrid" => {
      ...,
      columnOne {
        ...,
        pbBlocks[]{
          ${pbBlocks}
        }
      },
      columnTwo {
        ...,
        pbBlocks[]{
          ${pbBlocks}
        }
      }
    },
    _type == "pbJobs" => {
      ...,
      jobs[]{
        ...,
        jobButtons[]{
          ${pbButton}
        }
      }
    },
    _type == "pbDetailedList" => {
      ...,
      rows[]{
        ...,
        description[]{
          ${portableText}
        }
      }
    },
    _type == "pbBlogThumbnails" => {
      ...,
      "blogPosts": select(
        selectionFormat == "all" => *[_type == "article" && defined(slug.current)] | order(publishDate desc, _updatedAt desc) {
          ${articleThumbs}
        },
        blogPosts[]->{
          ${articleThumbs}
        },
      ),
    },
    _type == "pbSpotlight" => {
      ...,
      richText {
        ...,
        textContent[]{
          ${portableText}
        }
      },
      ctaButton {
        ${pbButton}
      },
    },
    _type == "pbMatrixHero" => {
      ...,
      textCTAContent {
        ...,
        ctaButtons[]{
          ${pbButton}
        }
      },
    },
    _type == "pbSequenceHorizontal" => {
      ...,
      sequencePhases[]{
        ...,
        media[]{
          ...,
          _type == "mediaLottie" => {
            ...,
            "lottieFile": lottieFile.asset->url,
          },
        }
      }
    },
  }
`

// QUERIES
export const homePageQuery = defineQuery(`
  *[_type == "home"][0]{
    ...,
    ${pb},
  }
`)

export const pagesBySlugQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    ...,
    "slug": slug.current,
    ${pb},
    ${seo},
  }
`)

// Include farmer stories for route and sitemap
export const articleBySlugQuery = defineQuery(`
  *[(_type == "article" || _type == "farmerStory") && slug.current == $slug][0] {
    ...,
    "slug": slug.current,
    ${tags},
    ${pb},
    ${seo},
  }
`)

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0]{
    ...,
    "mainNav": mainNav[]{
      ...,
      navItems[]{
        ${link},
      },
    },
    "mainNav2": mainNav2[]{
      ...,
      navItems[]{
        ${link},
      },
    },
    "ctaButton": ctaButton {
      ${pbButton}
    },
    "footerNav": footerNav.navItems[]{
      ${link},
    },
    "footerSecondaryNav": footerSecondaryNav.navItems[]{
      ${link},
    },
    "footerCTAButton": footerCTAButton[0]{
      ${link},
    },
    "footerCTAButton2": footerCTAButton2[0]{
      ${pbButton}
    },
    ${seo},
  }
`)

export const scriptsQuery = defineQuery(`
  *[_type == "settings"][0]{
    "gtmId": googletagmanagerID,
    customScripts,
  }
`)

export const slugsByTypeQuery = defineQuery(`
  *[_type == $type && defined(slug.current)]{"slug": slug.current, postType}
`)

export const sitemapByTypeQuery = defineQuery(`
  *[_type == $type]{"slug": slug.current, "updatedAt": _updatedAt, postType}
`)
