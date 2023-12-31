import { expect, test } from 'vitest'
import { preventSingleLetterOrphans } from '../../src/main'

test('should add non-breaking space after "a"', () => {
  const text = preventSingleLetterOrphans("Ahoj a nashledanou!")
  expect(text).not.toBe("Ahoj a nashledanou!")
  expect(text).toBe("Ahoj a\xa0nashledanou!")
})

test('should keep text intact', () => {
  const text = preventSingleLetterOrphans("Ahoj b nashledanou!")
  expect(text).toBe("Ahoj b nashledanou!")
  expect(text).not.toBe("Ahoj b\xa0nashledanou!")
})

test('should add non-breaking space after all "s"', () => {
  const text = preventSingleLetterOrphans("Pštros s pštrosicí s pštorsáčaty")
  expect(text).not.toBe("Pštros s\xa0pštrosicí s pštorsáčaty")
  expect(text).toBe("Pštros s\xa0pštrosicí s\xa0pštorsáčaty")
})

test('should add non-breaking space after capital "K"', () => {
  const text = preventSingleLetterOrphans("Ulice jménem K Novým dvorům")
  expect(text).not.toBe("Ulice jménem K Novým dvorům")
  expect(text).toBe("Ulice jménem K\xa0Novým dvorům")
})

test('should add non-breaking space after "a", "s" and "i"', () => {
  const text = preventSingleLetterOrphans("Jan a s ním i Jana")
  expect(text).not.toBe("Jan a\xa0s ním i Jana")
  expect(text).not.toBe("Jan a\xa0s ním i\xa0Jana")
  expect(text).toBe("Jan a\xa0s\xa0ním i\xa0Jana")
})

test('should add non-breaking space after capital "A" at the begining', () => {
  const text = preventSingleLetterOrphans("A to je vše")
  expect(text).not.toBe("A to je vše")
  expect(text).toBe("A\xa0to je vše")
})

test('should add non-breaking space to appropriate places', () => {
  const text1 = preventSingleLetterOrphans("Hle, a to je vše.")
  expect(text1).toBe("Hle, a\xa0to je vše.")
  const text2 = preventSingleLetterOrphans("Hle: a s tím je to vše.")
  expect(text2).toBe("Hle: a\xa0s\xa0tím je to vše.")
  const text3 = preventSingleLetterOrphans("Hle. A to je vše.")
  expect(text3).toBe("Hle. A\xa0to je vše.")
  const text4 = preventSingleLetterOrphans("Hle: A s tím je to vše.")
  expect(text4).toBe("Hle: A\xa0s\xa0tím je to vše.")
})
