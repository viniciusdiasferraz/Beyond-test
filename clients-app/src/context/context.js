import React, { createContext, useContext, useMemo, useState } from "react";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState([]);
  const [apis, setApis] = useState([]);
  const [versionControl, setVersionControl] = useState([]);
  const [testingTools, setTestingTools] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectUser, setSelectUser] = useState({});
  const [error, setError] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedApis, setSelectedApis] = useState([]);
  const [selectedSersionControl, setSelectedVersionControl] = useState([]);
  const [selectedTestingTools, setSelectedTestingTools] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  const objectMemo = useMemo(() => {
    return {
      users,
      name,
      experience,
      skills,
      apis,
      versionControl,
      testingTools,
      open,
      selectUser,
      loading,
      error,
      selectedName,
      selectedExperience,
      selectedSkills,
      selectedApis,
      selectedSersionControl,
      selectedTestingTools,
      isFormValid,
      setIsFormValid,
      setSelectedName,
      setSelectedExperience,
      setSelectedSkills,
      setSelectedApis,
      setSelectedVersionControl,
      setSelectedTestingTools,
      setUsers,
      setName,
      setExperience,
      setSkills,
      setApis,
      setVersionControl,
      setTestingTools,
      setOpen,
      setSelectUser,
      setLoading,
      setError,
    };
  }, [
    apis,
    error,
    experience,
    isFormValid,
    loading,
    name,
    open,
    selectUser,
    selectedApis,
    selectedExperience,
    selectedName,
    selectedSersionControl,
    selectedSkills,
    selectedTestingTools,
    skills,
    testingTools,
    users,
    versionControl,
  ]);

  return (
    <ApiContext.Provider value={objectMemo}>{children}</ApiContext.Provider>
  );
};

export const useApiContext = () => useContext(ApiContext);
