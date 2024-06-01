function extractListingId(url) {
  const regex = /\/(rooms|hotels)\/(\d+)/;
  const match = url.match(regex);
  return match ? match[2] : null;
}

export default extractListingId;
