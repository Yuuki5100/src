import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks";

const { user } = useAppSelector((state: { auth: any; }) => state.auth);

{user?.isAdmin && (
  <Link to="/admin">管理者ダッシュボード</Link>
)}
