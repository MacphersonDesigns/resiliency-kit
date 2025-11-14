import { setPreviewData, redirectToPreviewURL } from '@prismicio/next'
import { createClient, linkResolver } from '@/prismicio'

export default async function preview(req, res) {
    const client = createClient({ req })

    await setPreviewData({ req, res })

    await redirectToPreviewURL({ req, res, client, linkResolver })
}
