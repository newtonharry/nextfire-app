import { User } from "firebase/auth";
import { createContext } from "react";
import { ObservableStatus } from "reactfire";

export const UserContext = createContext<{
  user: ObservableStatus<User | null> | null;
  username: string | null;
}>({
  user: null,
  username: null,
});
