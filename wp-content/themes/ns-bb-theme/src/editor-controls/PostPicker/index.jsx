import { useSelect } from "@wordpress/data"
import { ComboboxControl } from "@wordpress/components"
import { useState } from "@wordpress/element"
import { debounce } from "@wordpress/compose"

function PostPicker({ label, value, onChange, postType, orderBy }) {
  const [fieldValue, setFieldValue] = useState(false)

  const posts = useSelect(
    (select) => {
      const query = {
        per_page: 100,
        orderby: orderBy ? orderBy : "id",
        order: orderBy === "title" ? "asc" : "desc",
        _fields: "id,title",
      }

      // Perform a search when the field is changed.
      if (!!fieldValue) {
        query.search = fieldValue
      }

      return select("core").getEntityRecords("postType", postType, query)
    },
    [orderBy, fieldValue, postType]
  )

  const currentValue = useSelect(
    (select) => {
      return value
        ? select("core").getEntityRecords("postType", postType, {
            include: [value],
          })
        : null
    },
    [postType, value]
  )

  const handleKeydown = (inputValue) => {
    setFieldValue(inputValue)
  }

  const choices = []

  if (posts) {
    posts.forEach((post) => {
      choices.push({ value: post.id, label: post.title.raw })
    })
  }

  if (currentValue) {
    currentValue.forEach((post) => {
      choices.push({ value: post.id, label: post.title.raw })
    })
  }

  if (posts === null && currentValue === null) {
    choices.push({ value: 0, label: "Loading..." })
  }

  return (
    <ComboboxControl
      label={label}
      options={choices}
      value={value}
      onChange={onChange}
      onFilterValueChange={debounce(handleKeydown, 300)}
    />
  )
}

export default PostPicker
