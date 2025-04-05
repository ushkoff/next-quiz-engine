import { promises as fs } from 'fs';
import { join } from 'path';
import { QuizConfig } from '@/types/quiz';

export async function getQuizConfig(id: string): Promise<QuizConfig> {
  const filePath = join(process.cwd(), 'public', `quiz_${id}.json`);
  const fileContents = await fs.readFile(filePath, 'utf8');
  const config: QuizConfig = JSON.parse(fileContents);
  console.log('Loaded quiz config:', config);
  return config;
}

async function getQuizIds(): Promise<string[]> {
  const publicDir = join(process.cwd(), 'public');
  const files = await fs.readdir(publicDir);
  return files
    .filter(file => file.startsWith('quiz_') && file.endsWith('.json'))
    .map(file => file.replace('quiz_', '').replace('.json', ''));
}

export async function getAllQuizConfigs() {
  const quizIds = await getQuizIds();
  const configs = await Promise.all(
    quizIds.map(async (id) => {
      const config = await getQuizConfig(id);
      return { ...config, id };
    }),
  );
  return configs;
}

export async function generateQuizStaticParams() {
  const quizIds = await getQuizIds();
  return quizIds.map((id) => ({ id }));
}

export async function generateQuizScreenStaticParams() {
  const quizIds = await getQuizIds();
  const params = [];

  for (const quizId of quizIds) {
    const quizConfig = await getQuizConfig(quizId);
    for (const screen of quizConfig.screens) {
      params.push({
        id: quizId,
        screenId: screen.id,
      });
    }
  }

  return params;
}
