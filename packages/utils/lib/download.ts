/**
 * Initiates a download of a file from a given URL with the specified filename.
 *
 * @param url - The URL of the file to be downloaded.
 * @param filename - The name of the file to be downloaded.
 */
export const downloadFile = (url: string, filename: string) => {
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Creates a download link for a given Blob data with the specified filename.
 * The link is automatically clicked to initiate the download, and then removed from the document body.
 *
 * @param blobData - The Blob data to be downloaded.
 * @param filename - The name of the file to be downloaded.
 */
export const createDownloadBlobLink = (blobData: Blob, filename: string) => {
  const url = window.URL.createObjectURL(new Blob([blobData]))
  downloadFile(url, filename)
  window.URL.revokeObjectURL(url)
}
