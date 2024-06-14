// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import { __experimentalLinkControl as LinkControl } from "@wordpress/block-editor"
import { BaseControl, useBaseControlProps } from "@wordpress/components"

function LinkSelect({ label, value, onChange, onRemove }) {
  const { baseControlProps } = useBaseControlProps({ label, className: "ns-sidebar-link-control" })
  return (
    <BaseControl {...baseControlProps}>
      <LinkControl
        searchInputPlaceholder="Search..."
        value={value}
        settings={[
          {
            id: "opensInNewTab",
            title: "New tab",
          },
        ]}
        onChange={onChange}
        withCreateSuggestion={false}
        onRemove={onRemove}
      />
    </BaseControl>
  )
}

export default LinkSelect
