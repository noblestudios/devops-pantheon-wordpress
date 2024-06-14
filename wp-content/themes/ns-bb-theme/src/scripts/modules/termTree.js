export default function buildTermsTree(flatTerms) {
  const flatTermsWithParentAndChildren = flatTerms.map((term) => {
    return {
      children: [],
      parent: null,
      ...term,
    }
  })

  const groupBy = function (arr, criteria) {
    return arr.reduce(function (obj, item) {
      // Check if the criteria is a function to run on the item or a property of it
      const key = typeof criteria === "function" ? criteria(item) : item[criteria]

      // If the key doesn't exist yet, create it
      if (!obj.hasOwnProperty(key)) {
        obj[key] = []
      }
      // Push the value to the object
      obj[key].push(item)

      // Return the object to the next item in the loop
      return obj
    }, {})
  }

  const termsByParent = groupBy(flatTermsWithParentAndChildren, "parent")

  if (termsByParent.null && termsByParent.null.length) {
    return flatTermsWithParentAndChildren
  }

  const fillWithChildren = (terms) => {
    return terms.map((term) => {
      const children = termsByParent[term.id]
      return { ...term, children: children && children.length ? fillWithChildren(children) : [] }
    })
  }

  const flattenTerms = (terms, flatTerms, level) => {
    terms.forEach((term) => {
      if (level.length) term.name = level + term.name
      flatTerms.push(term)
      if (term.children.length) {
        flatTerms = flattenTerms(term.children, flatTerms, level + "-")
      }
    })
    return flatTerms
  }

  return flattenTerms(fillWithChildren(termsByParent["0"] || []), [], "")
}
