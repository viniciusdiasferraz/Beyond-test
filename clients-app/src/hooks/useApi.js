import { useCallback } from "react";
import {
  getCandidates,
  saveCandidate,
  deleteCandidate,
  editCandidate,
} from "../service/allFetch";
import { useApiContext } from "../context/context";

const useApi = () => {
  const {
    users,
    name,
    experience,
    skills,
    selectedUser,
    apis,
    selectedName,
    selectedExperience,
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
    setIsFormValid,
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
    setName,
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

  const handleEdit = useCallback(async () => {
    const editedUser = {
      id: selectedUser?.id,
      name: selectedName,
      experience: selectedExperience,
      skills,
      apis,
      versionControl,
      testingTools,
    };

    setLoading(true);
    setError(null);

    try {
      await editCandidate(editedUser);
      setUsers((prevUsers) =>
        prevUsers?.map((user) =>
          user?.id === editedUser?.id ? editedUser : user
        )
      );

      clear();
      handleClose();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [
    selectedUser?.id,
    selectedName,
    selectedExperience,
    skills,
    apis,
    versionControl,
    testingTools,
    setLoading,
    setError,
    setUsers,
    clear,
    handleClose,
  ]);

  const handleFormValidation = () => {
    const isNameValid = name !== "";
    const isExperienceValid = experience !== "";
    setIsFormValid(isNameValid && isExperienceValid);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    handleFormValidation();
  };

  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
    handleFormValidation();
  };

  return {
    handleSubmit,
    handleDelete,
    handleClose,
    handleClickOpen,
    handleCheckboxChange,
    allCandidates,
    handleEdit,
    handleNameChange,
    handleExperienceChange,
  };
};

export default useApi;
