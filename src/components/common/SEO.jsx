import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function SEO({ 
  title, 
  description, 
  keywords, 
  ogTitle, 
  ogDescription, 
  ogImage, 
  type = 'website',
  schema 
}) {
  const location = useLocation();
  const currentUrl = `https://bytebytetech.com${location.pathname}${location.search}`;

  useEffect(() => {
    // 1. Title
    const formattedTitle = title ? `${title} | ByteByteTech` : 'ByteByteTech - Interactive Developer Roadmaps';
    document.title = formattedTitle;

    // Helper function to update meta tags
    const updateMetaTag = (attributeName, attributeValue, contentValue) => {
      if (!contentValue) return;
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (element) {
        element.setAttribute('content', contentValue);
      } else {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        element.setAttribute('content', contentValue);
        document.head.appendChild(element);
      }
    };

    // 2. Primary Meta Tags
    updateMetaTag('name', 'title', formattedTitle);
    updateMetaTag('name', 'description', description || 'Master real-world tech engineering with interactive developer roadmaps, real-world case studies, and practical system design guides. Learn system design, backend patterns, and frontend architecture.');
    if (keywords) {
      updateMetaTag('name', 'keywords', keywords);
    }

    // 3. Open Graph / Facebook
    updateMetaTag('property', 'og:title', ogTitle || formattedTitle);
    updateMetaTag('property', 'og:description', ogDescription || description);
    updateMetaTag('property', 'og:url', currentUrl);
    updateMetaTag('property', 'og:type', type);
    if (ogImage) {
      updateMetaTag('property', 'og:image', ogImage);
    }

    // 4. Twitter
    updateMetaTag('property', 'twitter:title', ogTitle || formattedTitle);
    updateMetaTag('property', 'twitter:description', ogDescription || description);
    updateMetaTag('property', 'twitter:url', currentUrl);
    if (ogImage) {
      updateMetaTag('property', 'twitter:image', ogImage);
    }

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', currentUrl);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', currentUrl);
      document.head.appendChild(canonicalLink);
    }

    // 6. JSON-LD Structured Data Schema
    let schemaScript = document.getElementById('json-ld-schema');
    if (schemaScript) {
      schemaScript.remove();
    }

    if (schema) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'json-ld-schema';
      schemaScript.type = 'application/ld+json';
      schemaScript.innerHTML = JSON.stringify(schema);
      document.head.appendChild(schemaScript);
    }

    return () => {
      // Cleanup schema script on unmount
      const existingScript = document.getElementById('json-ld-schema');
      if (existingScript) existingScript.remove();
    };
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, type, currentUrl, schema]);

  return null;
}
