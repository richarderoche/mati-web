import { NavItem } from '@/types'
import Button from '../shared/Button'

export function ButtonBlock({ block, onClick }) {
  return (
    <>
      {block.linkType === 'sitePage' && (
        <Button navItem={block.sitePage as NavItem} onClick={onClick} />
      )}
      {block.linkType === 'externalLink' && (
        <Button navItem={block.externalLink as NavItem} onClick={onClick} />
      )}
      {block.linkType === 'file' && (
        <Button
          path={block.fileLink?.url || ''}
          text={block.fileLink?.buttonText || 'Download'}
          download
          onClick={onClick}
        />
      )}
    </>
  )
}
