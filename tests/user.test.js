import { getFirstName, isValidPassword } from "../src/utils/user";
describe("first test suite", () => {
  test("should return first name  when given full name", () => {
    const user = getFirstName("Prashant Bhat");
    expect(user).toBe("Prashant");
  });
  test("should return first name when given first name", () => {
    const firstname = getFirstName("Jen");
    expect(firstname).toBe("Jen");
  });
  test("Reject password shorter than 6 chars", () => {
    const password = isValidPassword("gdfu");
    expect(password).toBeFalsy();
  });
  test("should reject password if it contains the word password", () => {
    const isvalid = isValidPassword("password123");
    expect(isvalid).toBeFalsy();
  });
  test("should validate  the correct password", () => {
    const isvalid = isValidPassword("asvavbcjabckaewkewh");
    expect(isvalid).toBeTruthy();
  });
});
