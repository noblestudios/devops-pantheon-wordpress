/* eslint-disable @wordpress/no-base-control-with-label-without-id */
/* eslint-disable no-unused-vars */
import { dispatch, select, useSelect } from "@wordpress/data"
import { PluginPostStatusInfo, PluginDocumentSettingPanel } from "@wordpress/edit-post"
import { BaseControl, TimePicker, TextControl } from "@wordpress/components"
import { useState } from "@wordpress/element"

export function OfferExpirationDate() {
  const postType = select("core/editor").getCurrentPostType()
  if (postType !== "offer") return null

  const { currentMeta } = useSelect((select) => {
    return {
      currentMeta: select("core/editor").getEditedPostAttribute("meta"),
    }
  })

  const [date, setDate] = useState(new Date())

  return (
    <PluginPostStatusInfo>
      <BaseControl label="Offer Expiration">
        <div>{currentMeta.offerExpiration}</div>
        <TimePicker
          currentDate={currentMeta.offerExpiration}
          onChange={(value) => {
            setDate(value)
            dispatch("core/editor").editPost({
              meta: {
                offerExpiration: value,
              },
            })
          }}
          is12Hour={true}
        />
      </BaseControl>
    </PluginPostStatusInfo>
  )
}

export function OfferMetaData() {
  const postType = select("core/editor").getCurrentPostType()
  if (postType !== "offer") return null

  const { currentMeta } = useSelect((select) => {
    return {
      currentMeta: select("core/editor").getEditedPostAttribute("meta"),
    }
  })

  return (
    <>
      <PluginDocumentSettingPanel title={"Offer Details"}>
        <TextControl
          label="Cost"
          value={currentMeta.offerCost}
          onChange={(value) => {
            dispatch("core/editor").editPost({
              meta: {
                offerCost: value,
              },
            })
          }}
        />
      </PluginDocumentSettingPanel>
    </>
  )
}
