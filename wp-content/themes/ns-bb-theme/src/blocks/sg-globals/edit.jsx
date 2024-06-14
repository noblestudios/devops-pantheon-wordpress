import ServerSideRender from "@wordpress/server-side-render"
import { useBlockProps } from "@wordpress/block-editor"
import { Fragment } from "@wordpress/element"

export default function Edit() {
  return (
    <div {...useBlockProps({ className: "alignfull" })}>
      <Fragment>
        <ServerSideRender block="ns/sg-globals" />
      </Fragment>
    </div>
  )
}
