import { localeWithRegion } from '@/lib/localeFormat'
import { createClient } from '@/prismicio'

export const API_TOKEN = process.env.PRISMIC_API_TOKEN
export const API_LOCALE = process.env.PRISMIC_REPOSITORY_LOCALE

/**
 * Get a Prismic client instance
 */
export const getClient = (config = {}) => {
    return createClient(config)
}

export async function getHomepage(locale) {
    const lang = localeWithRegion(locale)
    const client = getClient()

    try {
        console.log('Attempting to fetch homepage with locale:', lang)

        // Try without locale first to see if document exists
        let homepage
        try {
            homepage = await client.getSingle('homepage', { lang })
        } catch (localeError) {
            console.log(
                'Failed with locale, trying without locale:',
                localeError.message
            )
            // Try without lang parameter
            homepage = await client.getSingle('homepage')
        }

        console.log('Homepage fetched successfully')

        // Fetch all persons
        const persons = await client
            .getAllByType('person', { lang })
            .catch(() => client.getAllByType('person'))

        // Fetch globals
        const globals = await client
            .getSingle('globals', { lang })
            .catch(() => client.getSingle('globals'))

        return {
            allHomepages: {
                edges: [
                    {
                        node: {
                            heading: homepage.data.heading,
                            time_promise: homepage.data.time_promise,
                            data_security_promise:
                                homepage.data.data_security_promise,
                            page_title: homepage.data.page_title,
                            meta_title: homepage.data.meta_title,
                            meta_description: homepage.data.meta_description,
                            open_graph_image: homepage.data.open_graph_image,
                        },
                    },
                ],
            },
            allPersons: {
                edges: persons.map(person => ({
                    node: {
                        name: person.data.name,
                        title: person.data.title,
                        photo: person.data.photo,
                        business_name: person.data.business_name,
                        location: person.data.location,
                        link_to_business_website:
                            person.data.link_to_business_website,
                    },
                })),
            },
            allGlobalss: {
                edges: [
                    {
                        node: {
                            about_button_text: globals.data.about_button_text,
                            button_cta: globals.data.button_cta,
                            button_cta_returning_users:
                                globals.data.button_cta_returning_users,
                            footer_content: globals.data.footer_content,
                        },
                    },
                ],
            },
        }
    } catch (error) {
        console.error('Error fetching homepage data:', error)
        console.error('Error details:', {
            message: error.message,
            locale: lang,
            repository: process.env.PRISMIC_REPOSITORY_NAME,
        })
        throw error
    }
}

export async function getAbout(locale) {
    const lang = localeWithRegion(locale)
    const client = getClient()

    try {
        // Fetch about document
        const about = await client.getSingle('about', { lang })

        // Fetch globals
        const globals = await client.getSingle('globals', { lang })

        return {
            allAbouts: {
                edges: [
                    {
                        node: {
                            page_heading: about.data.page_heading,
                            page_content: about.data.page_content,
                            page_title: about.data.page_title,
                            meta_title: about.data.meta_title,
                            meta_description: about.data.meta_description,
                            open_graph_image: about.data.open_graph_image,
                        },
                    },
                ],
            },
            allGlobalss: {
                edges: [
                    {
                        node: {
                            about_button_text: globals.data.about_button_text,
                            button_cta: globals.data.button_cta,
                            button_cta_returning_users:
                                globals.data.button_cta_returning_users,
                            footer_content: globals.data.footer_content,
                        },
                    },
                ],
            },
        }
    } catch (error) {
        console.error('Error fetching about data:', error)
        throw error
    }
}

export async function getChecklistPageData(locale) {
    const lang = localeWithRegion(locale)
    const client = getClient()

    try {
        // Fetch resources page document
        const resourcesPage = await client.getSingle('resources_page', { lang })

        // Fetch globals
        const globals = await client.getSingle('globals', { lang })

        // Process body slices to get checklist items with their linked content
        const bodyData = await Promise.all(
            (resourcesPage.data.body || []).map(async slice => {
                if (slice.slice_type === 'category') {
                    const fields = await Promise.all(
                        (slice.items || []).map(async item => {
                            if (item.checklist_item && item.checklist_item.id) {
                                const checklistItem = await client.getByID(
                                    item.checklist_item.id,
                                    { lang }
                                )
                                return {
                                    checklist_item: {
                                        _meta: { id: checklistItem.id },
                                        title: checklistItem.data.title,
                                        description:
                                            checklistItem.data.description,
                                        related_resources:
                                            checklistItem.data
                                                .related_resources,
                                        applies_to_all:
                                            checklistItem.data.applies_to_all,
                                        business_type:
                                            checklistItem.data.business_type,
                                        employees: checklistItem.data.employees,
                                        sectors: checklistItem.data.sectors,
                                    },
                                }
                            }
                            return null
                        })
                    )
                    return {
                        primary: {
                            category_name: slice.primary.category_name,
                        },
                        fields: fields.filter(f => f !== null),
                    }
                }
                return null
            })
        )

        return {
            allResources_pages: {
                edges: [
                    {
                        node: {
                            page_headline: resourcesPage.data.page_headline,
                            intro: resourcesPage.data.intro,
                            pre_checklist_content:
                                resourcesPage.data.pre_checklist_content,
                            end_of_checklist_content:
                                resourcesPage.data.end_of_checklist_content,
                            enable_print_button_in_footer:
                                resourcesPage.data
                                    .enable_print_button_in_footer,
                            skip_form_text: resourcesPage.data.skip_form_text,
                            page_title: resourcesPage.data.page_title,
                            meta_title: resourcesPage.data.meta_title,
                            meta_description:
                                resourcesPage.data.meta_description,
                            open_graph_image:
                                resourcesPage.data.open_graph_image,
                            body: bodyData.filter(b => b !== null),
                        },
                    },
                ],
            },
            allGlobalss: {
                edges: [
                    {
                        node: {
                            about_button_text: globals.data.about_button_text,
                            button_cta: globals.data.button_cta,
                            button_cta_returning_users:
                                globals.data.button_cta_returning_users,
                            footer_content: globals.data.footer_content,
                            form_continue_button:
                                globals.data.form_continue_button,
                            form_skip_button: globals.data.form_skip_button,
                            form_submit_button: globals.data.form_submit_button,
                        },
                    },
                ],
            },
        }
    } catch (error) {
        console.error('Error fetching checklist page data:', error)
        throw error
    }
}

export async function getQuestionsData(locale) {
    const lang = localeWithRegion(locale)
    const client = getClient()

    try {
        // Fetch all qualifiers sorted by order
        const qualifiers = await client.getAllByType('qualifier', {
            lang,
            orderings: {
                field: 'my.qualifier.order',
                direction: 'asc',
            },
        })

        // Process qualifiers and fetch linked answer documents
        const processedQualifiers = await Promise.all(
            qualifiers.map(async qualifier => {
                const answers = await Promise.all(
                    (qualifier.data.answers || []).map(async answerItem => {
                        if (answerItem.answer && answerItem.answer.id) {
                            const answer = await client.getByID(
                                answerItem.answer.id,
                                { lang }
                            )
                            return {
                                answer: {
                                    _meta: { id: answer.id },
                                    answer_title: answer.data.answer_title,
                                    answer_description:
                                        answer.data.answer_description,
                                },
                            }
                        }
                        return null
                    })
                )

                return {
                    node: {
                        _meta: { id: qualifier.id },
                        question: qualifier.data.question,
                        question_description:
                            qualifier.data.question_description,
                        question_type: qualifier.data.question_type,
                        question_identifier: qualifier.data.question_identifier,
                        submit_button_text: qualifier.data.submit_button_text,
                        submit_button_text_alt:
                            qualifier.data.submit_button_text_alt,
                        skip_button_text: qualifier.data.skip_button_text,
                        answers: answers.filter(a => a !== null),
                    },
                }
            })
        )

        return {
            allQualifiers: {
                edges: processedQualifiers,
            },
        }
    } catch (error) {
        console.error('Error fetching questions data:', error)
        throw error
    }
}

export async function getChecklistActionsData(locale) {
    const lang = localeWithRegion(locale)
    const client = getClient()

    try {
        // Fetch resources page document
        const resourcesPage = await client.getSingle('resources_page', { lang })

        // Fetch globals
        const globals = await client.getSingle('globals', { lang })

        return {
            allResources_pages: {
                edges: [
                    {
                        node: {
                            actions_menu_button_text:
                                resourcesPage.data.actions_menu_button_text,
                            action_item__print:
                                resourcesPage.data.action_item__print,
                            action_item__uncheck_all:
                                resourcesPage.data.action_item__uncheck_all,
                            action_item__change_answers:
                                resourcesPage.data.action_item__change_answers,
                            action_item__start_over:
                                resourcesPage.data.action_item__start_over,
                            confirmation_cancel_button_text:
                                resourcesPage.data
                                    .confirmation_cancel_button_text,
                            uncheck_all_confirmation_title:
                                resourcesPage.data
                                    .uncheck_all_confirmation_title,
                            uncheck_all_confirmation_text:
                                resourcesPage.data
                                    .uncheck_all_confirmation_text,
                            change_answers_confirmation_title:
                                resourcesPage.data
                                    .change_answers_confirmation_title,
                            change_answers_confirmation_text:
                                resourcesPage.data
                                    .change_answers_confirmation_text,
                            start_over_confirmation_title:
                                resourcesPage.data
                                    .start_over_confirmation_title,
                            start_over_confirmation_text:
                                resourcesPage.data.start_over_confirmation_text,
                        },
                    },
                ],
            },
            allGlobalss: {
                edges: [
                    {
                        node: {
                            help_button_text: globals.data.help_button_text,
                            help_content_step_1_headline:
                                globals.data.help_content_step_1_headline,
                            help_content_step_1:
                                globals.data.help_content_step_1,
                            help_content_step_1_button_text:
                                globals.data.help_content_step_1_button_text,
                            help_content_step_2:
                                globals.data.help_content_step_2,
                            help_content_step_2_button_text:
                                globals.data.help_content_step_2_button_text,
                            help_drawer_collapse_text:
                                globals.data.help_drawer_collapse_text,
                        },
                    },
                ],
            },
        }
    } catch (error) {
        console.error('Error fetching checklist actions data:', error)
        throw error
    }
}
