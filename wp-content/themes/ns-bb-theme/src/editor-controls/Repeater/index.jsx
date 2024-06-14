import { PanelBody, BaseControl, useBaseControlProps, Button, Icon } from "@wordpress/components"
import { Fragment } from "@wordpress/element"

export function repeaterOnChange(attribute, key, value, index, props, onDispatch) {
  const rows = [...props.attributes[attribute]]
  if (key === false || key === null) rows[index] = value
  else rows[index][key] = value
  props.setAttributes({ [attribute]: rows })
  if (onDispatch !== undefined) {
    onDispatch(rows)
  }
}

function Repeater({ props, label, pluralLabel, fields, attribute, newObject, onDispatch }) {
  const addRow = () => {
    let rows = []
    if (typeof newObject === "object") {
      rows = [...props.attributes[attribute]]
    } else if (props.attributes[attribute]) {
      rows = props.attributes[attribute]
    }

    rows.push(newObject)
    props.setAttributes({ [attribute]: rows })
    if (onDispatch !== undefined) {
      onDispatch(rows)
    }
  }

  const removeRow = (index) => {
    const rows = [...props.attributes[attribute]]
    rows.splice(index, 1)
    props.setAttributes({ [attribute]: rows })
    if (onDispatch !== undefined) {
      onDispatch(rows)
    }
  }

  const moveUp = (index) => {
    const rows = [...props.attributes[attribute]]
    const moved = rows.slice(index - 1, index + 1)
    rows.splice(index - 1, 2, moved[1], moved[0])
    props.setAttributes({ [attribute]: rows })
    if (onDispatch !== undefined) {
      onDispatch(rows)
    }
  }

  const moveDown = (index) => {
    const rows = [...props.attributes[attribute]]
    const moved = rows.slice(index, index + 2)
    rows.splice(index, 2, moved[1], moved[0])
    props.setAttributes({ [attribute]: rows })
    if (onDispatch !== undefined) {
      onDispatch(rows)
    }
  }

  let repeaterFields

  if (props && props.attributes[attribute]) {
    repeaterFields = props.attributes[attribute].map((row, index) => {
      return (
        <Fragment key={index}>
          <PanelBody title={`${label} ${index + 1}`} initialOpen={true}>
            {fields(index)}
            <div
              style={{
                display: "flex",
                gap: "16px",
              }}
            >
              <Button
                className="--hover-light"
                title="Delete Row"
                style={{
                  height: "16px",
                  width: "16px",
                  padding: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => removeRow(index)}
              >
                <Icon icon="no-alt" size="16px" style={{ color: "#d43131", cursor: "pointer" }} />
              </Button>
              {index !== 0 && (
                <Button
                  className="--hover-light"
                  onClick={() => moveUp(index)}
                  style={{
                    height: "16px",
                    width: "16px",
                    padding: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  title="Move Up"
                >
                  <Icon icon="arrow-up" style={{ color: "rgb(0, 124, 186)", cursor: "pointer" }} />
                </Button>
              )}
              {index !== props.attributes[attribute].length - 1 && (
                <Button
                  className="--hover-light"
                  onClick={() => moveDown(index)}
                  style={{
                    height: "16px",
                    width: "16px",
                    padding: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  title="Move Down"
                >
                  <Icon icon="arrow-down" style={{ color: "rgb(0, 124, 186)", cursor: "pointer" }} />
                </Button>
              )}
            </div>
          </PanelBody>
        </Fragment>
      )
    })
  }

  const { baseControlProps } = useBaseControlProps({ label: pluralLabel })

  return (
    <BaseControl {...baseControlProps}>
      {repeaterFields}
      <Button
        onClick={addRow.bind(this)}
        text={`Add ${label}`}
        variant="secondary"
        style={{ marginTop: "8px", display: "block" }}
      />
    </BaseControl>
  )
}

export default Repeater
