import * as prismic from '@prismicio/client'
import { enableAutoPreviews } from '@prismicio/next'

/**
 * The project's Prismic repository name.
 */
export const repositoryName = process.env.PRISMIC_REPOSITORY_NAME || 'resiliency-kit'

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismicNext.CreateClientConfig} - Configuration for the Prismic client.
 */
export const createClient = (config = {}) => {
    const client = prismic.createClient(repositoryName, {
        accessToken: process.env.PRISMIC_API_TOKEN,
        ...config,
    })

    enableAutoPreviews({
        client,
        previewData: config.previewData,
        req: config.req,
    })

    return client
}

/**
 * Link Resolver for Prismic. This function converts a Prismic document to a URL.
 */
export const linkResolver = (doc) => {
    // URL for a category type
    if (doc.type === 'category') {
        return `/category/${doc.uid}`
    }
    // URL for a product type
    if (doc.type === 'product') {
        return `/product/${doc.uid}`
    }
    // URL for a page type
    if (doc.type === 'page') {
        return `/${doc.uid}`
    }
    // URL for homepage
    if (doc.type === 'homepage') {
        return '/'
    }
    // URL for about page
    if (doc.type === 'about') {
        return '/about'
    }
    // URL for resources/checklist
    if (doc.type === 'resources_page') {
        return '/checklist'
    }
    // Backup for all other types
    return '/'
}
