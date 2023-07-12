import { parsePageId, uuidToId } from "notion-utils"

// import { includeNotionIdInUrls } from './config'
import { getCanonicalPageId } from "./get-canonical-page-id"

// include UUIDs in page URLs during local development but not in production
// (they're nice for debugging and speed up local dev)
const uuid = true

export const mapPageUrl = (recordMap, searchParams) => (pageId = "") => {
  const pageUuid = parsePageId(pageId, { uuid: true })

  if (uuidToId(pageUuid) === 'f6e6bca7e11b414bbbc96d596765c993') {
    return createUrl("/", searchParams)
  } else {
    return createUrl(
      `/${getCanonicalPageId(pageUuid, recordMap, { uuid })}`,
      searchParams
    )
  }
}

export const getCanonicalPageUrl = (site, recordMap) => (pageId = "") => {
  const pageUuid = parsePageId(pageId, { uuid: true })

  if (uuidToId(pageId) === site.rootNotionPageId) {
    return `https://${site.domain}`
  } else {
    return `https://${site.domain}/${getCanonicalPageId(pageUuid, recordMap, {
      uuid
    })}`
  }
}

function createUrl(path, searchParams) {
  return [path, searchParams.toString()].filter(Boolean).join("?")
}
