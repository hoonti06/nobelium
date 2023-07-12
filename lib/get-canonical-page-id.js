import {
  getCanonicalPageId as getCanonicalPageIdImpl,
  parsePageId
} from "notion-utils"

import { inversePageUrlOverrides } from "./config"

export function getCanonicalPageId(pageId, recordMap, { uuid = true } = {}) {
  const cleanPageId = parsePageId(pageId, { uuid: false })
  if (!cleanPageId) {
    return null
  }

  const override = inversePageUrlOverrides[cleanPageId]
  if (override) {
    return override
  } else {
    return getCanonicalPageIdImpl(pageId, recordMap, {
      uuid
    })
  }
}
