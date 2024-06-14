/* eslint-disable no-nested-ternary */
// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import { __experimentalLinkControl as LinkControl } from "@wordpress/block-editor"
import { useState } from "@wordpress/element"
import { Popover, TextControl, BaseControl, useBaseControlProps, Button } from "@wordpress/components"

function CtaControl({ className, onUpdate, value, placeholder }) {
  const [popoverAnchor, setPopoverAnchor] = useState()
  const [isVisible, setIsVisible] = useState(false)
  const { baseControlProps, controlProps } = useBaseControlProps({ label: "Link" })

  const toggleVisible = () => {
    setIsVisible((state) => !state)
  }

  const buildLinkObject = (linkObject) => {
    return {
      title: !!value?.title ? value.title : "",
      url: linkObject.url,
      target: linkObject.opensInNewTab,
      id: linkObject.id,
    }
  }

  return (
    <>
      <div
        ref={setPopoverAnchor}
        className={className}
        onClick={toggleVisible}
        onKeyUp={toggleVisible}
        role="button"
        tabIndex={0}
        style={!!value?.title && !!value?.url ? { cursor: "pointer" } : { cursor: "pointer", opacity: ".62" }}
      >
        {!!value?.title ? value?.title : placeholder ? placeholder : "CTA..."}
      </div>
      {isVisible && (
        <Popover anchor={popoverAnchor} variant="toolbar" onClose={toggleVisible}>
          <div className="ns-cta-popover" style={{ padding: "16px" }}>
            <TextControl
              label="Button Text"
              value={value?.title}
              onChange={(textValue) => {
                onUpdate({ ...value, ...{ title: textValue } })
              }}
            />
            <BaseControl {...baseControlProps}>
              <LinkControl
                key={"link-" + controlProps.id}
                searchInputPlaceholder="Search..."
                value={{ ...value, ...{ opensInNewTab: value.target } }}
                settings={[
                  {
                    id: "opensInNewTab",
                    title: "New tab",
                  },
                ]}
                onChange={(value) => {
                  onUpdate(buildLinkObject(value))
                }}
                withCreateSuggestion={false}
                onRemove={() => {
                  onUpdate({ title: value?.title })
                }}
              />
            </BaseControl>
            <Button variant="secondary" text="Close" onClick={toggleVisible} />
            {!!value?.title && !!value?.title && (
              <Button
                variant="primary"
                style={{ marginLeft: "8px" }}
                text="Delete Button"
                onClick={() => {
                  onUpdate({})
                  toggleVisible()
                }}
              />
            )}
          </div>
        </Popover>
      )}
    </>
  )
}

export default CtaControl
