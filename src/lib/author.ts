import { imageCatalog } from "@/lib/images";

export const siteAuthor = {
  name: "Camila Escobar Vera",
  role: "Editora financiera",
  location: "Santiago, Chile",
  image: imageCatalog.authorPortrait.src,
  imageAlt: imageCatalog.authorPortrait.alt,
  imageTitle: imageCatalog.authorPortrait.title,
  imageDescription: imageCatalog.authorPortrait.description,
  shortBio:
    "Especialista en divulgación sobre la Unidad de Fomento, contratos indexados y finanzas cotidianas para familias y profesionales en Chile.",
} as const;
