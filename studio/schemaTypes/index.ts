import article from './documents/article'
import farmerStory from './documents/farmerStory'
import page from './documents/page'
import redirect from './documents/redirect'
import tag from './documents/tag'
import column from './objects/column'
import matrixItem from './objects/matrixItem'
import mediaImage from './objects/mediaImage'
import mediaLottie from './objects/mediaLottie'
import navExternal from './objects/navExternal'
import navLinks from './objects/navLinks'
import navGroup from './objects/navLinksGroup'
import navPage from './objects/navPage'
import pbBlockButton from './objects/pbBlockButton'
import pbBlockDivider from './objects/pbBlockDivider'
import pbBlockEmail from './objects/pbBlockEmail'
import pbBlockImage from './objects/pbBlockImage'
import pbBlockLottie from './objects/pbBlockLottie'
import pbBlockMapbox from './objects/pbBlockMapbox'
import pbBlockMarquee from './objects/pbBlockMarquee'
import pbBlockPlainText from './objects/pbBlockPlainText'
import pbBlockPublicationsList from './objects/pbBlockPublicationsList'
import pbBlocks from './objects/pbBlocks'
import pbBlockSocial from './objects/pbBlockSocial'
import pbBlockText from './objects/pbBlockText'
import pbBlockVideoEmbed from './objects/pbBlockVideoEmbed'
import pbBlogThumbnails from './objects/pbBlogThumbnails'
import pbCarouselTabbed from './objects/pbCarouselTabbed'
import pbColSettings from './objects/pbColSettings'
import pbDetailedList from './objects/pbDetailedList'
import pbGrid from './objects/pbGrid'
import pbJobs from './objects/pbJobs'
import pbMatrixHero from './objects/pbMatrixHero'
import pbPlaceholder from './objects/pbPlaceholder'
import pbSections from './objects/pbSections'
import pbSectionSettings from './objects/pbSectionSettings'
import pbSequenceHorizontal from './objects/pbSequenceHorizontal'
import pbSequenceVertical from './objects/pbSequenceVertical'
import pbSingleColumn from './objects/pbSingleColumn'
import pbSpotlight from './objects/pbSpotlight'
import pbStaggerColumns from './objects/pbStaggerColumns'
import pbTimeline from './objects/pbTimeline'
import pbTitle from './objects/pbTitle'
import pbTwoUpGrid from './objects/pbTwoUpGrid'
import ptBasic from './objects/ptBasic'
import ptBody from './objects/ptBody'
import ptSingle from './objects/ptSingle'
import ptSlim from './objects/ptSlim'
import seo from './objects/seo'
import socialLink from './objects/socialLink'
import home from './singletons/home'
import settings from './singletons/settings'

export const singletonSchemaTypes = [home, settings]

export const schemaTypes = [
  // Singletons
  home,
  settings,
  // Documents
  page,
  farmerStory,
  article,
  tag,
  redirect,
  // Objects
  column,
  matrixItem,
  mediaImage,
  mediaLottie,
  navExternal,
  navLinks,
  navGroup,
  navPage,
  pbBlockImage,
  pbBlocks,
  pbBlockButton,
  pbBlockDivider,
  pbBlockEmail,
  pbBlockLottie,
  pbBlockMarquee,
  pbBlockMapbox,
  pbBlockPublicationsList,
  pbBlockSocial,
  pbBlockText,
  pbBlockPlainText,
  pbBlockVideoEmbed,
  pbBlogThumbnails,
  pbCarouselTabbed,
  pbColSettings,
  pbGrid,
  pbDetailedList,
  pbJobs,
  pbMatrixHero,
  pbPlaceholder,
  pbSections,
  pbSectionSettings,
  pbSingleColumn,
  pbSequenceHorizontal,
  pbSequenceVertical,
  pbSpotlight,
  pbStaggerColumns,
  pbTimeline,
  pbTitle,
  pbTwoUpGrid,
  ptBasic,
  ptBody,
  ptSingle,
  ptSlim,
  seo,
  socialLink,
]

export const singletons = []
