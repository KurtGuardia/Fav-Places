const GOOGLE_API_KEY =
  'AIzaSyA3u1JElgroq10SHwXzGmdTKdI5y9VDF8o'

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
    &markers=color:purple%7Clabel:K%7C${lat},${lng}&key=${GOOGLE_API_KEY}`
  return imagePreviewUrl
}
