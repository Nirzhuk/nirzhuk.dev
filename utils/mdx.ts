import fs from 'fs';
import path from 'path';

export type BaseMetadata = {
  title?: string;
  publishedAt?: string;
  summary?: string;
  image?: string;
};
export interface WorkExperience extends BaseMetadata {
  company: string;
  companyUrl?: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  type: string;
  technologies: string[];
}

function parseFrontmatter<T extends BaseMetadata>(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  if (!match) {
    return { metadata: {} as T, content: fileContent.trim() };
  }
  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, '').trim();

  const metadata: Partial<T> = {};

  // Handle multiline arrays by first joining them
  let normalizedBlock = frontMatterBlock;

  // Find multiline arrays and join them into single lines
  normalizedBlock = normalizedBlock.replace(
    /(\w+):\s*\n\s*\[([^\]]*)\]/g,
    (_, key, arrayContent) => {
      const items = arrayContent
        .split('\n')
        .map((line: string) => line.trim())
        .filter((line: string) => line && line !== '[' && line !== ']')
        .join(' ');
      return `${key}: [${items}]`;
    }
  );

  const frontMatterLines = normalizedBlock.trim().split('\n');

  frontMatterLines.forEach(line => {
    // Skip empty lines or lines that are just array content
    if (!line.trim() || line.trim().startsWith("'") || line.trim() === '[' || line.trim() === ']') {
      return;
    }

    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Skip if no key
    if (!key) return;

    // Remove quotes from value
    value = value.replace(/^['"](.*)['"]$/, '$1');

    // Handle arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      // Remove brackets and split by comma
      const arrayContent = value.slice(1, -1).trim();
      if (arrayContent) {
        // Split by comma and clean up each item
        const items = arrayContent
          .split(',')
          .map(item => item.trim().replace(/^['"](.*)['"]$/, '$1'))
          .filter(item => item); // Filter out empty items
        metadata[key as keyof T] = items as T[keyof T];
      } else {
        metadata[key as keyof T] = [] as T[keyof T];
      }
    } else if (value) {
      metadata[key as keyof T] = value as T[keyof T];
    }
  });

  return { metadata: metadata as T, content };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter(file => path.extname(file) === '.mdx');
}

function readMDXFile<T extends BaseMetadata>(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter<T>(rawContent);
}

function getMDXData<T extends BaseMetadata>(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map(file => {
    const { metadata, content, ...rest } = readMDXFile<T>(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
      ...rest,
    };
  });
}

export function getJournalPosts<T extends BaseMetadata>() {
  return getMDXData<T>(path.join(process.cwd(), 'app', 'journal', 'posts'));
}

export function getWorkExperiences<T extends WorkExperience>() {
  return getMDXData<T>(path.join(process.cwd(), 'app', 'work', 'experiences')).sort((a, b) => {
    return new Date(b.metadata.startDate).getTime() - new Date(a.metadata.startDate).getTime();
  });
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date();
  if (!date.includes('T')) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = '';

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = 'Today';
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
