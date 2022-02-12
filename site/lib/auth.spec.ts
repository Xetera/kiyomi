import { extractTokenFromHeader } from "@/lib/auth"

test("Auth token extraction with bearer", () => {
  expect(extractTokenFromHeader("Bearer test")).toBe("test")
})

test("Auth token extraction without bearer", () => {
  expect(extractTokenFromHeader("test")).toBe("test")
})
