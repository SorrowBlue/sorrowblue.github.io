export default function (filepath) {
  const deleteExt = filepath.replace('.md', '')
  const fileName = deleteExt.split('/')[deleteExt.split('/').length - 1]
  const splitArray = fileName.split('_')
  return `/blog/${splitArray[0]}/${splitArray[1]}`
}
