import { dispatch, select, useSelect } from "@wordpress/data"
import { PluginDocumentSettingPanel } from "@wordpress/edit-post"
import { TextControl } from "@wordpress/components"
import { ImageSelect, LinkSelect, MetaRepeater, MetaRepeaterOnChange } from "../../editor-controls"

function landingMetaFields() {
  const postType = select("core/editor").getCurrentPostType()

  if (postType !== "landing") return null

  const { currentMeta } = useSelect((select) => {
    return {
      currentMeta: select("core/editor").getEditedPostAttribute("meta"),
    }
  }, [])

  return (
    <>
      <PluginDocumentSettingPanel name="header-options" title={"Header Options"}>
        <ImageSelect
          label="Logo"
          props={currentMeta}
          selectedImage={currentMeta.navLogo}
          onSelect={(newImage) => {
            dispatch("core/editor").editPost({
              meta: {
                navLogo: newImage.id,
              },
            })
          }}
          onRemove={() => {
            dispatch("core/editor").editPost({
              meta: {
                navLogo: 0,
              },
            })
          }}
        />
        <LinkSelect
          label="CTA Link"
          value={currentMeta.navCTALink}
          onChange={(value) => {
            dispatch("core/editor").editPost({
              meta: {
                navCTALink: value,
              },
            })
          }}
          onRemove={() => {
            dispatch("core/editor").editPost({
              meta: {
                navCTALink: {},
              },
            })
          }}
        />
        <TextControl
          label="CTA Text"
          value={currentMeta.navCTALabel}
          onChange={(value) => {
            dispatch("core/editor").editPost({
              meta: {
                navCTALabel: value,
              },
            })
          }}
        />
        <LinkSelect
          label="CTA Link 2"
          value={currentMeta.navCTALink2}
          onChange={(value) => {
            dispatch("core/editor").editPost({
              meta: {
                navCTALink2: value,
              },
            })
          }}
          onRemove={() => {
            dispatch("core/editor").editPost({
              meta: {
                navCTALink2: {},
              },
            })
          }}
        />
        <TextControl
          label="CTA Text 2"
          value={currentMeta.navCTALabel2}
          onChange={(value) => {
            dispatch("core/editor").editPost({
              meta: {
                navCTALabel2: value,
              },
            })
          }}
        />
      </PluginDocumentSettingPanel>
      <PluginDocumentSettingPanel name="anchor-links" title={"Anchor Links"}>
        <MetaRepeater
          metaKey="anchorLinks"
          label="Anchor Link"
          pluralLabel="Anchor Links"
          newObject={{
            anchorId: "",
            anchorText: "",
          }}
          onDispatch={(value) => {
            dispatch("core/editor").editPost({
              meta: {
                refreshRepeater: Date.now(),
                anchorLinks: value,
              },
            })
          }}
          fields={(index) => {
            return [
              <TextControl
                label="Anchor ID"
                id={"anchorid-" + index}
                key={"anchorid-" + index}
                value={currentMeta.anchorLinks[index]?.anchorId}
                onChange={(value) => {
                  MetaRepeaterOnChange(currentMeta, "anchorLinks", value, index, "anchorId")
                }}
              />,
              <TextControl
                label="Anchor Text"
                id={"anchortext-" + index}
                key={"anchortext" + index}
                value={currentMeta.anchorLinks[index]?.anchorText}
                onChange={(value) => {
                  MetaRepeaterOnChange(currentMeta, "anchorLinks", value, index, "anchorText")
                }}
              />,
            ]
          }}
          postMeta={currentMeta}
        />
      </PluginDocumentSettingPanel>
      <PluginDocumentSettingPanel name="footer-options" title={"Footer Options"}>
        <ImageSelect
          label="Logo"
          props={currentMeta}
          selectedImage={currentMeta.footerLogo}
          onSelect={(newImage) => {
            dispatch("core/editor").editPost({
              meta: {
                footerLogo: newImage.id,
              },
            })
          }}
          onRemove={() => {
            dispatch("core/editor").editPost({
              meta: {
                footerLogo: 0,
              },
            })
          }}
        />
        <LinkSelect
          label="CTA Link"
          value={currentMeta.footerCTALink}
          onChange={(value) => {
            dispatch("core/editor").editPost({
              meta: {
                footerCTALink: value,
              },
            })
          }}
          onRemove={() => {
            dispatch("core/editor").editPost({
              meta: {
                footerCTALink: {},
              },
            })
          }}
        />
        <TextControl
          label="CTA Text"
          value={currentMeta.footerCTALabel}
          onChange={(value) => {
            dispatch("core/editor").editPost({
              meta: {
                footerCTALabel: value,
              },
            })
          }}
        />
        <LinkSelect
          label="CTA Link 2"
          value={currentMeta.footerCTALink2}
          onChange={(value) => {
            dispatch("core/editor").editPost({
              meta: {
                footerCTALink2: value,
              },
            })
          }}
          onRemove={() => {
            dispatch("core/editor").editPost({
              meta: {
                footerCTALink2: {},
              },
            })
          }}
        />
        <TextControl
          label="CTA Text 2"
          value={currentMeta.footerCTALabel2}
          onChange={(value) => {
            dispatch("core/editor").editPost({
              meta: {
                footerCTALabel2: value,
              },
            })
          }}
        />
      </PluginDocumentSettingPanel>
    </>
  )
}

export default landingMetaFields
