import { NotFound } from "../NotFound/NotFound";
import { UserPage } from "./user-page";

export const UserPageOrNotFound: React.FC = () => {
  if (window.__USER__ === null) {
    return <NotFound />;
  }

  return <UserPage user={window.__USER__} />;
};
