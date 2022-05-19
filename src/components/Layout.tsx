import { ReactNode } from 'react';
import { Layout } from 'ebs-design';

import { Menu, Topbar } from 'components';

export const PanelLayout = ({ children }: { children: ReactNode }) => (
  <Layout>
    <Topbar />
    <Menu />
    <Layout.Content>{children}</Layout.Content>
  </Layout>
);
