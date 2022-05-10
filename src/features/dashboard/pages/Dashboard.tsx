import { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from 'recharts';

import { fetchPosts } from 'api/posts';
import { fetchUsers } from 'api/users';
import { getPostCountPerDate, getPostCountPerUser } from 'utils/charts';

import { Grid, PageTitleBar } from 'components';
import ChartContainer from '../components/ChartContainer';

interface PostCountPerUser {
  name: string;
  postsCount: number;
}

export interface PostCountPerDate {
  date: string;
  count: number;
}

const Dashboard = () => {
  const [postsPerUserData, setPostsPerUserData] = useState<PostCountPerUser[]>(
    []
  );
  const [postsPerDateData, setPostsPerDateData] = useState<PostCountPerDate[]>(
    []
  );

  const getData = async () => {
    const users = await fetchUsers();
    const posts = await fetchPosts();

    setPostsPerUserData(getPostCountPerUser(users, posts));
    setPostsPerDateData(getPostCountPerDate(posts));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <PageTitleBar title='Dashboard' />
      <Grid spacing={1} cols={2}>
        <ChartContainer title='Posts per user'>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={postsPerUserData}>
              <XAxis dataKey='name' />
              <YAxis allowDecimals={false} />
              <Bar dataKey='postsCount' radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        <ChartContainer title='Posts over time'>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={postsPerDateData}>
              <XAxis dataKey='date' />
              <YAxis allowDecimals={false} />
              <Line dataKey='count' type='monotone' />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Grid>
    </>
  );
};

export default Dashboard;
