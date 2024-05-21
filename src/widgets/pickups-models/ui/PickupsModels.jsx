import React from "react";
import { BaseModels } from "@/widgets/base-models";
export const PickupsModels = () => {
  const items = {
    title: "Пикапы",
    models: [
      {
        title: "Model 1",
        price: 1000,
        image: "https://via.placeholder.com/150",
      },
      {
        title: "Model 2",
        price: 1000,
        image: "https://via.placeholder.com/150",
      },
      {
        title: "Model 3",
        price: 1000,
        image: "https://via.placeholder.com/150",
      },
      {
        title: "Model 4",
        price: 1000,
        image: "https://via.placeholder.com/150",
      },
    ],
  };

  return <BaseModels items={items} />;
};
