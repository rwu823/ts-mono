export const copy = (text: string) => {
  const textarea = document.createElement('textarea')
  textarea.value = text

  document.body.append(textarea)
  textarea.select()
  document.execCommand('copy')

  textarea.remove()
}

export default copy
