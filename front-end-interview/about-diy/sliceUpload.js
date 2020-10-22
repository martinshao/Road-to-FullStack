/**
 * 
 * @param { Blob } blob 
 * @param { number } startByte 
 * @param { number } endByte 
 * 
 * 注意：slice() 方法在某些浏览器和版本上带有浏览器引擎前缀：比如 Firefox 12 及更
 * 早版本的blob.mozSlice() 和 Safari 中的blob.webkitSlice()。 没有浏览器引擎前缀
 * 的老版本 slice() 方法有不同的语义，并且已过时。Firefox 30 取消了对 blob.mozSlice()
 * 的支持。
 */
function blobSlice(blob, startByte, endByte) {
  if (blob.slice) {
    return blob.slice(startByte, endByte);
  }

  // 兼容 Firefo
  if (blob.mozSlice) {
    return blob.mozSlice(startByte, endByte);
  }

  // 兼容 webkit
  if (blob.webkitSlice) {
    return blob.webkitSlice(startByte, endByte);
  }
}

