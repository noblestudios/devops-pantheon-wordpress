import { dispatch, select, useSelect } from "@wordpress/data"
import { PluginDocumentSettingPanel } from "@wordpress/edit-post"
import { TextControl } from "@wordpress/components"
import apiFetch from "@wordpress/api-fetch"
import { useState, useEffect } from "@wordpress/element"
import { GoogleMapControl } from "../../editor-controls"

function stakeMetaFields() {
  const postType = select("core/editor").getCurrentPostType()

  if (postType !== "stakeholder") return null

  const { currentMeta } = useSelect((select) => {
    return {
      currentMeta: select("core/editor").getEditedPostAttribute("meta")
    }
  })

  const [mapsKey, setMapsKey] = useState(null)

  useEffect(() => {
    apiFetch({ path: "/wp/v2/settings" }).then((result) => {
      setMapsKey(result.ns_gmap_key)
    })
  }, [])

  return (
    <>
      <PluginDocumentSettingPanel name="contact-info" title={"Contact Info"}>
        <TextControl
          label="Address Line 1"
          value={currentMeta.stkAddress1}
          onChange={(value) => {
            dispatch("core/editor").editPost({
              meta: {
                stkAddress1: value
              }
            })
          }}
        />
        <TextControl
          label="Address Unit Number"
          value={currentMeta.stkAddressUnit}
          onChange={(value) => {
            dispatch("core/editor").editPost({
              meta: {
                stkAddressUnit: value
              }
            })
          }}
        />
        <TextControl
          label="Address Line 2"
          value={currentMeta.stkAddress2}
          onChange={(value) => {
            dispatch("core/editor").editPost({
              meta: {
                stkAddress2: value
              }
            })
          }}
        />
        <TextControl
          label="Phone Number"
          value={currentMeta.stkPhone}
          onChange={(value) => {
            dispatch("core/editor").editPost({
              meta: {
                stkPhone: value
              }
            })
          }}
        />
        <TextControl
          label="Website"
          value={currentMeta.stkWebsite}
          onChange={(value) => {
            dispatch("core/editor").editPost({
              meta: {
                stkWebsite: value
              }
            })
          }}
        />
        <TextControl
          label="Email"
          value={currentMeta.stkEmail}
          onChange={(value) => {
            dispatch("core/editor").editPost({
              meta: {
                stkEmail: value
              }
            })
          }}
        />
        {mapsKey && (
          <GoogleMapControl
            label="Google Map"
            value={currentMeta.stkMapObject}
            mapsKey={mapsKey}
            onSelect={(value) => {
              dispatch("core/editor").editPost({
                meta: {
                  stkMapObject: value
                }
              })
            }}
          />
        )}
      </PluginDocumentSettingPanel>
      <PluginDocumentSettingPanel name="social-links" title={"Social Links"}>
        <TextControl
          label="Facebook URL"
          value={currentMeta.stkFacebook}
          onChange={(value) => {
            dispatch("core/editor").editPost({
              meta: {
                stkFacebook: value
              }
            })
          }}
        />
        <TextControl
          label="Google URL"
          value={currentMeta.stkGoogle}
          onChange={(value) => {
            dispatch("core/editor").editPost({
              meta: {
                stkGoogle: value
              }
            })
          }}
        />
        <TextControl
          label="Instagram URL"
          value={currentMeta.stkInstagram}
          onChange={(value) => {
            dispatch("core/editor").editPost({
              meta: {
                stkInstagram: value
              }
            })
          }}
        />
        <TextControl
          label="Pinterest URL"
          value={currentMeta.stkPinterest}
          onChange={(value) => {
            dispatch("core/editor").editPost({
              meta: {
                stkPinterest: value
              }
            })
          }}
        />
        <TextControl
          label="Twitter URL"
          value={currentMeta.stkTwitter}
          onChange={(value) => {
            dispatch("core/editor").editPost({
              meta: {
                stkTwitter: value
              }
            })
          }}
        />
        <TextControl
          label="Youtube URL"
          value={currentMeta.stkYoutube}
          onChange={(value) => {
            dispatch("core/editor").editPost({
              meta: {
                stkYoutube: value
              }
            })
          }}
        />
        <TextControl
          label="LinkedIn URL"
          value={currentMeta.stkLinkedin}
          onChange={(value) => {
            dispatch("core/editor").editPost({
              meta: {
                stkLinkedin: value
              }
            })
          }}
        />
        <TextControl
          label="Vimeo URL"
          value={currentMeta.stkVimeo}
          onChange={(value) => {
            dispatch("core/editor").editPost({
              meta: {
                stkVimeo: value
              }
            })
          }}
        />
      </PluginDocumentSettingPanel>
    </>
  )
}

export default stakeMetaFields
