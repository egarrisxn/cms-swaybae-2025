import {CogIcon} from '@sanity/icons'

export const structure = (S) =>
  S.list()
    .title('Website Content')
    .items([
      // Filter out "AI Assist Context" and "Settings" content from the list of content types
      ...S.documentTypeListItems().filter(
        (listItem) => !['settings', 'assist.instruction.context'].includes(listItem.getId()),
      ),
      // Manually add the Settings Singleton in order to view/edit the one particular document for Settings.  Learn more about Singletons: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ])
