// src/api/fake-program.ts
import { Course } from '../store/course/course.model';

export const FAKE_MATHS_PROGRAM: Course = {
  id: "maths_6_prog",
  title: "Nombres et calculs",
  subjectId: "maths",
  progress: 0,
  chapters: [
    {
      id: "ch1",
      title: "Les nombres entiers",
      order: 1,
      lessons: [
        {
          id: "l1",
          title: "Écrire et lire les entiers",
          status: "in-progress",
          learning_objectives: ["Distinguer chiffre et nombre", "Connaître les unités de numération"],
          boundaries: "Pas de puissances de 10. Limité aux milliards.",
          success_criteria: ["Savoir écrire cent-vingt-mille"]
        },
        {
          id: "l2",
          title: "Comparer et ranger",
          status: "locked",
          learning_objectives: ["Utiliser les symboles < > ="],
          boundaries: "Comparaison terme à terme uniquement.",
          success_criteria: ["Ranger 5 nombres dans l'ordre croissant"]
        }
      ]
    },
    {
      id: "ch2",
      title: "Fractions simples",
      order: 2,
      lessons: [
        {
          id: "l3",
          title: "Découvrir les fractions",
          status: "locked",
          learning_objectives: ["Comprendre le partage d'unité"],
          boundaries: "Fractions avec dénominateur simple (2, 4, 10, 100).",
          success_criteria: ["Représenter 1/2 et 3/4 sur un dessin"]
        }
      ]
    }
  ]
};