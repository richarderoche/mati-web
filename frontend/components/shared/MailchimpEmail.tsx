export default function MailchimpEmail({
  mcFormUrl,
  mcEmailName,
}: {
  mcFormUrl: string
  mcEmailName: string
}) {
  const { mcActionUrl, mcUserId, mcAudienceId } = getMailchimpVars(mcFormUrl)
  if (!mcActionUrl || !mcUserId || !mcAudienceId) {
    return null
  }
  return (
    <form
      action={mcActionUrl}
      method="post"
      target="_blank"
      rel="noopener noreferrer"
    >
      <input type="hidden" name="u" value={mcUserId} />
      <input type="hidden" name="id" value={mcAudienceId} />
      <div className="flex items-center justify-between border rounded-full p-5 overflow-hidden">
        <input
          className="bg-transparent text-body border-none focus:ring-0 focus:ring-offset-0 grow h-full ts-input px-[.5em] placeholder:text-body-subtle"
          type="email"
          name={mcEmailName}
          placeholder="Email Address"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          required
        />
        <button
          type="submit"
          className="text-bg rounded-full flex w-fit items-center transition-colors whitespace-nowrap ts-h5 px-btn-half h-btn relative group bg-blue"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

function getMailchimpVars(mcFormUrl: string) {
  const url = new URL(mcFormUrl)
  const searchParams = url.searchParams
  const mcUserId = searchParams.get('u')
  const mcAudienceId = searchParams.get('id')
  const mcActionUrl = url.origin + url.pathname + '/post'
  return { mcActionUrl, mcUserId, mcAudienceId }
}
