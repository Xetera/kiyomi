import { NotionRenderer } from "react-notion-x"

export const VerificationRules = ({ blockMap }: any) => {
  return <NotionRenderer recordMap={blockMap} darkMode />
}
