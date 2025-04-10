export interface GithubContent {
  name: string;
  path: string;
  content?: string;
  type: string;
}

export interface Problem {
  id: string;
  difficulty: string;
  name: string;
  path: string;
}
