import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  const imagesDir = path.join(process.cwd(), 'public', 'images')
  try {
    const files = fs.readdirSync(imagesDir)
    const imageFiles = files.filter(f => /\.(jpe?g|png|gif|webp|svg)$/i.test(f))
    res.status(200).json({ images: imageFiles })
  } catch (err) {
    res.status(500).json({ error: 'Unable to read images folder' })
  }
}
