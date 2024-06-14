// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import { PanelBody, BaseControl, useBaseControlProps, Button, Icon, Tip } from "@wordpress/components"
import { dispatch } from "@wordpress/data"
import { Fragment } from "@wordpress/element"

export function MetaRepeaterOnChange(postMeta, metaKey, value, index, key) {
  const rows = [...postMeta[metaKey]]
  if (key === undefined) rows[index] = value
  else rows[index][key] = value
  dispatch("core/editor").editPost({
    meta: {
      refreshRepeater: Date.now(),
      [metaKey]: rows,
    },
  })
}

function MetaRepeater({ postMeta, metaKey, label, pluralLabel, fields, newObject, help }) {
  const addRow = () => {
    // eslint-disable-next-line no-nested-ternary
    const rows = typeof newObject === "object" ? [...postMeta[metaKey]] : postMeta[metaKey] ? postMeta[metaKey] : []
    rows.push(newObject)
    dispatch("core/editor").editPost({
      meta: {
        refreshRepeater: Date.now(),
        [metaKey]: rows,
      },
    })
  }

  const removeRow = (index) => {
    const rows = [...postMeta[metaKey]]
    rows.splice(index, 1)
    dispatch("core/editor").editPost({
      meta: {
        refreshRepeater: Date.now(),
        [metaKey]: rows,
      },
    })
  }

  const moveUp = (index) => {
    const rows = [...postMeta[metaKey]]
    const moved = rows.slice(index - 1, index + 1)
    rows.splice(index - 1, 2, moved[1], moved[0])
    dispatch("core/editor").editPost({
      meta: {
        refreshRepeater: Date.now(),
        [metaKey]: rows,
      },
    })
  }

  const moveDown = (index) => {
    const rows = [...postMeta[metaKey]]
    const moved = rows.slice(index, index + 2)
    rows.splice(index, 2, moved[1], moved[0])
    dispatch("core/editor").editPost({
      meta: {
        refreshRepeater: Date.now(),
        [metaKey]: rows,
      },
    })
  }

  const buttonRow = (index) => {
    return (
      <div
        style={{
          display: "flex",
          gap: "16px",
        }}
      >
        {deleteButton(index)}
        {index !== 0 && upButton(index)}
        {index !== postMeta[metaKey].length - 1 && downButton(index)}
      </div>
    )
  }

  const deleteButton = (index) => {
    return (
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
    )
  }

  const upButton = (index) => {
    return (
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
    )
  }

  const downButton = (index) => {
    return (
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
    )
  }

  const isFlat = typeof newObject !== "object"

  const { baseControlProps } = useBaseControlProps({ label: pluralLabel })

  let repeaterFields

  if (postMeta && postMeta[metaKey]) {
    repeaterFields = postMeta[metaKey].map((row, index) => {
      return (
        <Fragment key={index}>
          {!isFlat && (
            <PanelBody title={`${label} ${index + 1}`} initialOpen={true}>
              {fields(index)}
              {buttonRow(index)}
            </PanelBody>
          )}
          {isFlat && (
            <>
              {fields(index)}
              {buttonRow(index)}
            </>
          )}
        </Fragment>
      )
    })
  }

  return (
    <BaseControl {...baseControlProps}>
      {help && (
        <Tip>
          <p>{help}</p>
        </Tip>
      )}
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

export default MetaRepeater
