import * as svgs from "../../editor-icons"

function IconList() {
  return (
    <>
      <h2>Block Icons</h2>
      <div
        style={{
          display: "flex",
          gap: "32px",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {Object.keys(svgs).map((icon) => {
          return (
            <div key={icon} style={{ display: "flex", gap: "16px", flexBasis: "22%", flexShrink: "0" }}>
              {svgs[icon]}
              {icon}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default IconList
