import { PostInterface } from 'types/post';
import { UserInterface } from 'types/user';

import { PostCountPerDate } from 'features/dashboard/pages/Dashboard';

export const getPostCountPerUser = (
  users: UserInterface[],
  posts: PostInterface[]
) =>
  users.map((user: UserInterface) => {
    const postsCount = posts.filter(
      (post: PostInterface) => post.authorId === user.id
    ).length;
    return { name: `${user.name} ${user.lastName}`, postsCount };
  });

export const getPostCountPerDate = (posts: PostCountPerDate[]) => {
  const postsPerDate: PostCountPerDate[] = [];

  posts.forEach((post) => {
    const existingPost = postsPerDate.find((p) => p.date === post.date);
    if (existingPost) {
      existingPost.count += 1;
    } else {
      postsPerDate.push({
        date: post.date,
        count: 1,
      });
    }
  });

  return postsPerDate;
};
