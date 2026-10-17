export type SlugToNameArgs = {
  slug: string;
};

// "full_name", "full-name" and "fullName" all become "Full name".
export const slugToName = ({ slug }: SlugToNameArgs) => {
  const words = slug
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(/[\s_-]+/)
    .filter((word) => {
      return word.length > 0;
    })
    .join(' ')
    .toLowerCase();

  return `${words.charAt(0).toUpperCase()}${words.slice(1)}`;
};
