import { useBlockProps } from "@wordpress/block-editor"

export default function edit() {
  return (
    <div {...useBlockProps()}>
      <input type="text" className="wp-block-ns-footer-dummy-form__input" placeholder="Email Address" />
      <button type="submit" className="wp-block-ns-footer-dummy-form__submit">
        Submit
      </button>
    </div>
  )
}
