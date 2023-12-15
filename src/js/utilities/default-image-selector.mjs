const tagBasedOnDefaultImages = {
  'electronics, phone, tablet, pc, playstation, console':
    '/assets/images/hostaphoto-XFhny3yLA0c-unsplash.jpg',
  'flower, flowers': '/assets/images/flower.jpg',
  'clothing, clothes, dress, pants, sweather':
    '/assets/images/pexels-felipe-alves-3.jpg',
  'watch, watches': '/assets/images/watch.jpg',
  'food, pizza, hamburger, cake': '/assets/images/fastfood.jpg',
  'animals,animal, dog, cat, lion': '/assets/images/dogcat.jpg',
  'bøver, bølver, bever': '/assets/images/bever.jpg',
};

export function selectDefaultImage(tags, title, description) {
  const safeTitle = title ? title.toLowerCase() : '';
  const safeDescription = description ? description.toLowerCase() : '';
  const allText = [...tags, safeTitle, safeDescription].concat(
    tags.map((tag) => tag.toLowerCase())
  );

  for (const key in tagBasedOnDefaultImages) {
    const synonyms = key
      .split(',')
      .map((synonym) => synonym.trim().toLowerCase());
    if (
      allText.some((text) => synonyms.some((synonym) => text.includes(synonym)))
    ) {
      return tagBasedOnDefaultImages[key];
    }
  }
  return '/assets/images/hostaphoto-XFhny3yLA0c-unsplash.jpg';
}
