import fs from 'fs'
import path from 'path'

export type BaseMetadata = {
  title?: string
  publishedAt?: string
  summary?: string
  image?: string
}

function parseFrontmatter<T extends BaseMetadata>(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  let frontMatterBlock = match![1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Partial<T> = {}

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    
    // Handle arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      // Remove brackets and split by comma
      const arrayContent = value.slice(1, -1).trim()
      if (arrayContent) {
        // Split by comma and clean up each item
        const items = arrayContent.split(',').map(item => 
          item.trim().replace(/^['"](.*)['"]$/, '$1')
        )
        metadata[key.trim() as keyof T] = items as T[keyof T]
      } else {
        metadata[key.trim() as keyof T] = [] as T[keyof T]
      }
    } else {
      metadata[key.trim() as keyof T] = value as T[keyof T]
    }
  })

  return { metadata: metadata as T, content }
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile<T extends BaseMetadata>(filePath) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter<T>(rawContent)
}

function getMDXData<T extends BaseMetadata>(dir) {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    let { metadata, content, ...rest } = readMDXFile<T>(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
      ...rest,
    }
  })
}

export function getBlogPosts<T extends BaseMetadata>() {
  return getMDXData<T>(path.join(process.cwd(), 'app', 'blog', 'posts'))
}

export function getWorkExperiences<T extends BaseMetadata>() {
  return getMDXData<T>(path.join(process.cwd(), 'app', 'work', 'experiences'))
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}
