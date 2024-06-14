import ServerSideRender from "@wordpress/server-side-render"
import { InspectorControls, useBlockProps } from "@wordpress/block-editor"
import { Fragment } from "@wordpress/element"

export default function Edit({ attributes }) {
  return (
    <div {...useBlockProps()}>
      <InspectorControls />
      <Fragment>
        <ServerSideRender block="ns/svg-list-block" attributes={attributes} />
      </Fragment>
    </div>
  )
}
