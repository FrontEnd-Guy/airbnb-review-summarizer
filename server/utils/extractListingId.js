function extractListingId(url) {
  const regex = /\/rooms\/(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

module.exports = extractListingId;
