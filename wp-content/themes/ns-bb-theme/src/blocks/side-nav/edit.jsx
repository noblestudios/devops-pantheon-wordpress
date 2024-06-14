/* eslint-disable @wordpress/no-base-control-with-label-without-id */
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  // eslint-disable-next-line @wordpress/no-unsafe-wp-apis
  __experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor"
import { Panel, PanelBody, PanelRow, BaseControl } from "@wordpress/components"
import { useState } from "@wordpress/element"

export default function edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps()
  const [parentPage, setParentPage] = useState(attributes.parentPage)

  function updateParentPage(page) {
    setParentPage(page)
    setAttributes({ parentPage: page })
  }

  return (
    <div {...blockProps}>
      <InspectorControls>
        <Panel header="Side Nav Options">
          <PanelBody>
            <BaseControl
              label="Parent Page Selector"
              help="Optional field to select parent page to base the sidebar links, defaults to current page."
            >
              <LinkControl
                allowDirectEntry={false}
                settings={[]}
                onChange={updateParentPage}
                value={parentPage}
              ></LinkControl>
            </BaseControl>
          </PanelBody>
        </Panel>
      </InspectorControls>
      <Panel>
        <PanelBody title="Block with Sidebar Main Content">
          <PanelRow>
            <InnerBlocks></InnerBlocks>
          </PanelRow>
        </PanelBody>
      </Panel>
    </div>
  )
}
