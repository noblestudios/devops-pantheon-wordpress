import Cookies from "../cookies"
// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, test } from "@jest/globals"

describe("setCookie", () => {
  test("It sets a cookie", () => {
    const cookie = new Cookies()
    cookie.setCookie("name", "value", 7)

    expect(cookie.getCookie("name")).toBe("value")
  })
})

describe("clearCookie", () => {
  test("It clears the cookie", () => {
    const cookie = new Cookies()
    cookie.setCookie("name", "value", 7)
    expect(cookie.getCookie("name")).toBe("value")

    cookie.clearCookie("name")
    expect(cookie.getCookie("name")).toBe("")
  })
})
