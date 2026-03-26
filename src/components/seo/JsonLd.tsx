import React from 'react';

const JsonLd = () => {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Crochet Nook by Dharita",
    "image": "https://crochetnookbydharita.co.in/logo.jpg",
    "@id": "https://crochetnookbydharita.co.in",
    "url": "https://crochetnookbydharita.co.in",
    "telephone": "+91-XXXXXXXXXX", // Placeholder, user should update
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Vadodara",
      "addressLocality": "Vadodara",
      "addressRegion": "Gujarat",
      "postalCode": "390001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 22.3072,
      "longitude": 73.1812
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "10:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.instagram.com/crochetnookbydharita",
      "https://youtube.com/@crochetnookdharita"
    ]
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Beginner Crochet Workshop",
    "description": "Learn the basics of crochet, from holding a hook to creating your first amigurumi toy. Hands-on training in Vadodara.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Crochet Nook by Dharita",
      "sameAs": "https://crochetnookbydharita.co.in"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
    </>
  );
};

export default JsonLd;
