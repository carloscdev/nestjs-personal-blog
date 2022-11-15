export const generateSlug = (title: string) =>
  title.toLowerCase().replaceAll(/\W+/g, '-');
