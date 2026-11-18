import { normalizeType, typeToPath } from './library';

export const formatDoneDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
};

export const formatIngredient = ({ name, measure }) => (measure ? `${measure} ${name}` : name);

export const recipeSubtitle = (recipe) => {
  if (!recipe) return '';
  const parts = normalizeType(recipe.type) === 'meal'
    ? [recipe.area, recipe.category]
    : [recipe.alcoholic, recipe.category];
  return parts.filter(Boolean).join(' · ');
};

export const shareUrl = (type, id) => {
  const { origin } = window.location;
  return `${origin}/${typeToPath(type)}/${id}`;
};

export const youtubeEmbedUrl = (videoId) => (videoId
  ? `https://www.youtube-nocookie.com/embed/${videoId}`
  : '');

export const pluralize = (count, singular, plural = `${singular}s`) => (
  `${count} ${count === 1 ? singular : plural}`
);
