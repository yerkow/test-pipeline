import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../shared/api/firebaseConfig"; // Убедись, что путь к файлу firebaseConfig правильный

export const crossoversModelAPi = async () => {
  const modelCollectionRef = collection(db, "models"); // Исправлено название переменной

  const modelDocs = await getDocs(modelCollectionRef);

  const models = modelDocs.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return models;
};
