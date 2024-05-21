import React, { useEffect, useState } from "react";
import { BaseModels } from "@/widgets/base-models";
import { crossoversModelAPi } from "../api/crossoversModelAPi";
export const CrossoverModels = () => {
  const [models, setModels] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    crossoversModelAPi().then((data) => {
      setModels(data);
      setLoading(false);
    });
  }, []);

  console.log(models);
  if (loading) {
    return <div>Loading...</div>;
  }

  return <BaseModels items={models} />;
};
