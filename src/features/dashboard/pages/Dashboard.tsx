import { useQuery } from 'react-query';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from 'recharts';
import { Col, Loader, Row } from 'ebs-design';

import { fetchPosts } from 'api/posts';
import { fetchUsers } from 'api/users';
import { getPostCountPerDate, getPostCountPerUser } from 'utils/charts';

import { PageTitleBar } from 'components';
import ChartContainer from '../components/ChartContainer';

export interface PostCountPerDate {
  date: string;
  count: number;
}

const Dashboard = () => {
  const { data: posts, isLoading: arePostsLoading } = useQuery(
    'posts',
    fetchPosts
  );
  const { data: users, isLoading: areUsersLoading } = useQuery(
    'users',
    fetchUsers
  );

  return (
    <>
      <PageTitleBar title='Dashboard' />
      {arePostsLoading || areUsersLoading ? (
        <Loader loading />
      ) : (
        <Row>
          <Col size={6}>
            <ChartContainer title='Posts per user'>
              <ResponsiveContainer width='100%' height={300}>
                <BarChart data={getPostCountPerUser(users, posts)}>
                  <XAxis dataKey='name' />
                  <YAxis allowDecimals={false} />
                  <Bar dataKey='postsCount' radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Col>
          <Col size={6}>
            <ChartContainer title='Posts over time'>
              <ResponsiveContainer width='100%' height={300}>
                <LineChart data={getPostCountPerDate(posts)}>
                  <XAxis dataKey='date' />
                  <YAxis allowDecimals={false} />
                  <Line dataKey='count' type='monotone' />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Dashboard;
