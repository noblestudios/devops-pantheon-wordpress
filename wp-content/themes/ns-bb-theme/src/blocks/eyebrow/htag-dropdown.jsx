import { ToolbarDropdownMenu } from "@wordpress/components"
import HeadingLevelIcon from "./icons"
const HEADING_LEVELS = [0, 1, 2, 3, 4, 5, 6]
export default function HeadingLevelDropdown({ selectedLevel, onChange }) {
  return (
    <ToolbarDropdownMenu
      //popoverProps={ POPOVER_PROPS }
      icon={<HeadingLevelIcon level={selectedLevel} />}
      label={"Change heading level"}
      controls={HEADING_LEVELS.map((targetLevel) => {
        {
          const isActive = targetLevel === selectedLevel

          return {
            icon: <HeadingLevelIcon level={targetLevel} isPressed={isActive} />,
            label: "Heading " + targetLevel,
            isActive,
            onClick() {
              onChange(targetLevel)
            },
            role: "menuitemradio",
          }
        }
      })}
    />
  )
}
