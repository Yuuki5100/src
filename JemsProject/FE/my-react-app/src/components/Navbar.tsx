const { user } = useAppSelector(state => state.auth);

{user?.isAdmin && (
  <Link to="/admin">管理者ダッシュボード</Link>
)}
