import { describe, it, expect, vi } from 'vitest'
import { createDownloadBlobLink } from '../download'

describe('createDownloadBlobLink', () => {
  it('should create a download link and trigger a click', () => {
    // Setup
    const fakeURL = 'http://fakeurl.com/blob'
    const blobData = new Blob(['test data'], { type: 'text/plain' })
    const filename = 'test.txt'

    // Ensure window.URL and createObjectURL exist
    if (!window.URL) {
      window.URL = new URL('http://example.com') as typeof window.URL
    }
    window.URL.createObjectURL = vi.fn(() => fakeURL)
    window.URL.revokeObjectURL = vi.fn(() => {})

    // Mocking the necessary APIs
    const createElementSpy = vi.spyOn(document, 'createElement')
    const appendChildSpy = vi.spyOn(document.body, 'appendChild')
    const removeChildSpy = vi.spyOn(document.body, 'removeChild')

    // Execute
    createDownloadBlobLink(blobData, filename)

    // Assertions
    expect(window.URL.createObjectURL).toHaveBeenCalledWith(new Blob([blobData]))
    expect(createElementSpy).toHaveBeenCalledWith('a')
    expect(appendChildSpy).toHaveBeenCalled()
    expect(removeChildSpy).toHaveBeenCalled()
    expect(window.URL.revokeObjectURL).toHaveBeenCalledWith(fakeURL)

    // Clean up
    createElementSpy.mockRestore()
    appendChildSpy.mockRestore()
    removeChildSpy.mockRestore()
  })
})
