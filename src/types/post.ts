export interface PostInterface {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  authorId: number;
  image: string;
}

export enum PostActions {
  Create = 'create',
  View = 'view',
  Edit = 'edit',
  Delete = 'delete',
}
