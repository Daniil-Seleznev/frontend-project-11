export default (xml) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'application/xml');
  
    const error = doc.querySelector('parsererror');
    if (error) {
      throw new Error('errors.parse');
    }
  
    const title = doc.querySelector('channel > title')?.textContent;
    const description = doc.querySelector('channel > description')?.textContent;
  
    const items = doc.querySelectorAll('item');
  
    const posts = Array.from(items).map((item) => ({
      title: item.querySelector('title')?.textContent,
      link: item.querySelector('link')?.textContent,
    }));
  
    return {
      feed: { title, description },
      posts,
    };
  };
  