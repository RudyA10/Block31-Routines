import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { deleteRoutine, getRoutine } from "../api/routines";
import { useAuth } from "../auth/AuthContext";

export default function ActivityDetails() {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [routine, setRoutine] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const syncRoutine = async () => {
      const data = await getRoutine(id);
      setRoutine(data);
    };
    syncRoutine();
  }, [id]);

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteRoutine(token, routine.id);
      navigate("/routines");
    } catch (e) {
      setError(e.message);
    }
  };

  if (!routine) return <p>Loading...</p>;

  return (
    <article>
      <h1>{routine.name}</h1>
      <p>by {routine.creatorName}</p>
      <p>Goal: {routine.goal}</p>
      <p># of Sets: {routine.sets}</p>
      {token && <button onClick={tryDelete}>Delete</button>}
      {error && <p role="alert">{error}</p>}
    </article>
  );
}
