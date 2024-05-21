import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/shared/api/firebaseConfig";
export const getProductDetails = async (id) => {
  /* Этот блок кода запрашивает документ в базе данных Firestore для получения данных модели. */
  const modelDocRef = doc(db, "models", id);
  const modelDoc = await getDoc(modelDocRef, id);
  const modelData = modelDoc.data();

  /* Этот блок кода запрашивает коллекцию в базе данных Firestore для получения данных всех спецификаций. */
  const specsCollectionRef = collection(db, "specifications");
  const specsQuery = query(specsCollectionRef);
  const specs = await getDocs(specsQuery);
  const specsData = specs.docs.map((doc) => doc.id);

  /* Этот блок кода запрашивает коллекцию в базе данных Firestore для получения данных всех спецификаций модели. */
  const modelSpecsCollectionRef = collection(db, "models-specifications");
  const modelSpecQuery = query(
    modelSpecsCollectionRef,
    where("modelId", "==", id),
    where("specificationId", "in", specsData)
  );
  const modelSpecs = await getDocs(modelSpecQuery);
  const modelSpecsData = modelSpecs.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  /* Этот блок кода объединяет данные модели и данные спецификаций. */
  const finalmodelSpecsData = modelSpecsData.map((modelSpec) => {
    const spec = specs.docs.find(
      (spec) => spec.id === modelSpec.specificationId
    );
    return {
      id: modelSpec.id,
      content: modelSpec.title,
      specification: spec.data().title,
    };
  });

  return {
    id: modelDoc.id,
    ...modelData,
    specifications: finalmodelSpecsData,
  };
};
