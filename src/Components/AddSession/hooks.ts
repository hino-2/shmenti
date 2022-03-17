import { useState, useCallback, ChangeEvent } from "react";
import { addSession } from "../../Api/Session";
import { ISession } from "../../Api/Session/interfaces";
import { calcNewSessionId } from "../../helpers";

export const useAddSession = (
  setSessions: React.Dispatch<React.SetStateAction<ISession[] | undefined>>
) => {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState<Date | null>(null);

  const handleClickOpen = useCallback(() => {
    setDialogOpened(true);
    setName("");
    setDate(null);
    setLoading(false);
  }, []);

  const handleClose = useCallback(() => {
    setDialogOpened(false);
  }, []);

  const handleAddSession = useCallback(() => {
    if (name && date) {
      setLoading(true);

      addSession({
        name,
        date: new Date(date).toDateString(),
      }).then(() => {
        setSessions((prev) => {
          if (prev) {
            const sessions = [...prev];

            sessions.unshift({
              id: calcNewSessionId(sessions),
              name,
              date: new Date(date).toDateString(),
            });

            return sessions;
          } else {
            return prev;
          }
        });

        setDialogOpened(false);
      });
    }
  }, [date, name, setSessions]);

  const handleDatePick = useCallback((newDate: Date | null) => {
    setDate(newDate);
  }, []);

  const handleNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setName(e.target.value);
    },
    []
  );

  return {
    date,
    name,
    dialogOpened,
    loading,
    handleClickOpen,
    handleClose,
    handleAddSession,
    handleDatePick,
    handleNameChange,
  };
};
