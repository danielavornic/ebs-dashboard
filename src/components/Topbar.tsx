import { AvatarInline, Layout } from 'ebs-design';

import useUserContext from 'hooks/useUserContext';

export const Topbar = () => {
  const { user } = useUserContext();
  const fullName = `${user?.name} ${user?.lastName}`;

  return (
    <Layout.Topbar fixed>
      <Layout.Topbar.Toggler />
      <Layout.Topbar.Title>Admin Panel</Layout.Topbar.Title>
      <Layout.Topbar.RightSide>
        <AvatarInline alt={fullName} reversed />
      </Layout.Topbar.RightSide>
    </Layout.Topbar>
  );
};
