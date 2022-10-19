import { Unsubscribe } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useFirestore, useUser } from "reactfire";

export function useUserData() {
  const user = useUser();
  const firestore = useFirestore();
  const [username, setUsername] = useState<string | null>(null);
  const unsubscribeRef = useRef<Unsubscribe>();

  useEffect(() => {
    if (user.data) {
      unsubscribeRef.current = onSnapshot(
        doc(firestore, "users", user.data.uid),
        (doc) => {
          setUsername(doc.data()?.username);
        }
      );
    } else {
      setUsername(null);
    }

    return () => {
      unsubscribeRef.current?.();
    };
  }, [user]);

  return { user, username };
}
