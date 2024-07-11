import { useEffect, useCallback } from "react";
import {
  getCandidates,
  saveCandidate,
  deleteCandidate,
} from "../service/allFetch";
import { useApiContext } from "../context/context";

const useApi = () => {
  const {
    users,
    name,
    experience,
    skills,
    apis,
    versionControl,
    testingTools,
    setUsers,
    setOpen,
    setSelectUser,
    setLoading,
    setError,
    setExperience,
    setSkills,
    setApis,
    setVersionControl,
    setTestingTools,
    setName,
  } = useApiContext();

  const clear = useCallback(() => {
    setExperience([]);
    setSkills([]);
    setApis([]);
    setVersionControl([]);
    setTestingTools([]);
    setSelectUser({});
    setName("");
  }, [
    setApis,
    setExperience,
    setSelectUser,
    setSkills,
    setTestingTools,
    setVersionControl,
  ]);

  const handleClickOpen = useCallback(
    (user) => {
      setSelectUser(user);
      setOpen(true);
    },
    [setOpen, setSelectUser]
  );
  const handleClose = useCallback(() => {
    setOpen(false);
    clear();
  }, [setOpen, setSelectUser]);

  const allCandidates = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCandidates();
      setUsers(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (selectUser) => {
    setLoading(true);
    setError(null);
    try {
      await deleteCandidate(selectUser);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== selectUser.id)
      );
      clear();
      handleClose();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (users && users.length === 0) {
      allCandidates();
    }
  }, [users]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const newUser = {
        id: users.length + 1,
        name,
        experience,
        skills,
        apis,
        versionControl,
        testingTools,
      };

      setLoading(true);
      setError(null);
      try {
        await saveCandidate(newUser);
        setUsers((prevUsers) => [...prevUsers, newUser]);
        clear();
        handleClose();
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [
      users,
      name,
      experience,
      skills,
      apis,
      versionControl,
      testingTools,
      setLoading,
      setError,
      setUsers,
      handleClose,
    ]
  );

  const handleCheckboxChange = (event, setter, state) => {
    const { value, checked } = event.target;
    if (checked) {
      setter([...state, value]);
    } else {
      setter(state.filter((item) => item !== value));
    }
  };

  return {
    handleSubmit,
    handleDelete,
    handleClose,
    handleClickOpen,
    handleCheckboxChange,
  };
};

export default useApi;
