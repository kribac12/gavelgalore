const tagBasedOnDefaultImages = {
  electronics: '/assets/images/hostaphoto-XFhny3yLA0c-unsplash.jpg',
  flower: '/assets/images/flower.jpg',
  flowers: '/assets/images/flower.jpg',
  clothing: '/assets/images/pexels-felipe-alves-3.jpg',
  clothes: '/assets/images/pexels-felipe-alves-3.jpg',
  watch: '/assets/images/watch.jpg',
};

export function selectDefaultImage(tags, title, description) {
  const allKeyWords = [...tags, title.toLowerCase(), description.toLowerCase()];
  for (const keyword of allKeyWords) {
    if (tagBasedOnDefaultImages[keyword]) {
      return tagBasedOnDefaultImages[keyword];
    }
  }
  return '/assets/images/hostaphoto-XFhny3yLA0c-unsplash.jpg';
}
