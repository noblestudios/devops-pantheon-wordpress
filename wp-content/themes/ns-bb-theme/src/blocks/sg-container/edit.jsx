import { useBlockProps, RichText, InnerBlocks } from "@wordpress/block-editor"

export default function Edit(props) {
  const { attributes, setAttributes } = props

  const { title } = attributes
  return (
    <div {...useBlockProps()}>
      <section className="sg-container">
        <div className="sg-container__wrapper">
          <RichText
            className="sg-container__title"
            value={title}
            onChange={(value) => {
              setAttributes({ title: value })
            }}
          ></RichText>

          <div className="sg-container__content alignfull">
            <InnerBlocks />
          </div>
        </div>
      </section>
    </div>
  )
}
