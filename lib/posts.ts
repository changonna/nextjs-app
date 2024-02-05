import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

// posts 폴더
const postDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // /posts 파일 이름 잡아주기
  const fileNames = fs.readdirSync(postDirectory);
  // fileNames ['pre-rendering.md', 'ssg-ssr.md']

  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    // gray-matter를 이용하여 parse the post metadata section
    const matterResults = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResults.data as { date: string; title: string}
    }
  });

    // Sort posts by date
  return allPostsData.sort((a, b) => {
    if(a.date < b.date) {
      return 1
    } else {
      return -1
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postDirectory);
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');

  const matterResult = matter(fileContents);

  // markdown -> html : (npm install remark remakr-html --save)
  const processedContent = await remark().use(remarkHtml).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as {data: string; title: string})
  }
}