
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'


const DISABLED_TYPES = ['settings', 'assist.instruction.context']

export const structure: StructureResolver = (S: StructureBuilder) =>
    S.list()
      .title('Website Content')
      .items([
        ...S.documentTypeListItems()
          // Remove the "assist.instruction.context" and "settings" content  from the list of content types
          .filter((listItem: any) => !DISABLED_TYPES.includes(listItem.getId()))
          // Pluralize the title of each document type.  This is not required but just an option to consider.
          .map((listItem) => {
            return listItem.title(pluralize(listItem.getTitle() as string))
          }),
      ])    
