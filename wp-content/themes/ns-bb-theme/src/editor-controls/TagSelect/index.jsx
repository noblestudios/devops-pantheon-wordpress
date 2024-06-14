import { SelectControl } from "@wordpress/components"

function TagSelect({ label, value, onChange }) {
  return (
    <>
      <SelectControl
        label={label}
        value={value}
        options={[
          { label: "Div", value: "div" },
          { label: "H1", value: "h1" },
          { label: "H2", value: "h2" },
          { label: "H3", value: "h3" },
          { label: "H4", value: "h4" },
          { label: "H5", value: "h5" },
          { label: "H6", value: "h6" },
        ]}
        onChange={onChange}
      />
    </>
  )
}

export default TagSelect
