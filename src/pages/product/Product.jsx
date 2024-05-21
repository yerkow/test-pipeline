import { getProductDetails } from "@/widgets";
import { ModelDetails } from "@/widgets/model-details";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true);
    getProductDetails(id).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <ModelDetails model={product} />;
};
