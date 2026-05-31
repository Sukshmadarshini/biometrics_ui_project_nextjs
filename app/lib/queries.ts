// import { sanity } from "./sanity";


// export async function getHomepage() {
//   return sanity.fetch(`
//     *[_type == "homepage"][0]{
//       heroTitle,
//       heroCtaLabel,
//       heroTagline,
//       heroImage{
//         asset->{url}
//       },
//       heroImageMobile{
//         asset->{url}
//       },

//       aboutTitle,
//       aboutSubtitle1,
//       aboutBody1,
//       aboutSubtitle2,
//       aboutBody2,

//       leadershipName,
//       leadershipTitle,
//       leadershipSubtitle,
//       leadershipBio1,
//       leadershipBio2,
//       leadershipPhoto{
//         asset->{url}
//       }
//     }
//   `);
// }

// export async function getServices() {
//   return sanity.fetch(`
//     {
//       "complementaryLectures": *[_type == "complementaryLecture"]{
//         _id,
//         title,
//         description,
//         date,
//         category,
//         duration,
//         mode,
//         instructor,
//         idealFor,
//         content,
//         includes,
//         thumbnail{
//           asset->{url}
//         }
//       },
//       "lectures": *[_type == "lecture"]{
//         _id,
//         title,
//         duration,
//         description,
//         mode,
//         date,
//         category,
//         priceNote,
//         originalPrice,
//         priceLabel,
//         discountPercent,
//         instructor,
//         idealFor,
//         content,
//         includes,
//         thumbnail{
//           asset->{url}
//         }
//       },

//       "workshops": *[_type == "workshop"]{
//         _id,
//         title,
//         duration,
//         description,
//         mode,
//         category,
//         priceNote,
//         originalPrice,
//         discountedPrice,
//         discountPercent,
//         instructor,
//         idealFor,
//         content,
//         includes,
//         thumbnail{
//           asset->{url}
//         }
//       },

//       "consultations": *[_type == "consultation"]{
//         _id,
//         title,
//         duration,
//         mode,
//         audience,
//         description,
//         priceLabel,
//         cta,
//         includes,
//         thumbnail{
//           asset->{url}
//         }
//       }
//     }
//   `);
// }

// export async function getCareersPage() {
//   return sanity.fetch(`
//     *[_type == "careers"][0]{
//       SectionTitle,
//       SectionDescription,
//       SectionTag,
//       SectionIcon{
//         asset->{url}
//       },

//       careersSections[]{
//         title,
//         tag,
//         description,
//         points[],
//         icon{
//           asset->{url}
//         },
//         jobs[]{
//           title,
//           department,
//           type,
//           location,
//           description,
//           responsibilities,
//           requirements,
//           compensation
//         }
//       },

//       application{
//         email,
//         note
//       }
//     }
//   `);
// }

// export async function getPastAchievements() {
//   return sanity.fetch(`
//     *[_type == "pastAchievements"][0]{
//       sectionTitle,
//       sectionSubtitle,

//       subsections[]{
//         title,
//         subtitle,
//         description,
//         icon{
//           asset->{url}
//         },
//         links[]{
//           label,
//           url
//         }
//       },

//       talksHeading,
//       talks[]{
//         year,
//         title,
//         description,
//         image{
//           asset->{url}
//         },
//         links[]{
//           label,
//           url
//         }
//       }
//     }
//   `);
// }

// export async function getPrivacyPolicy() {
//   return sanity.fetch(`
//     *[_type == "privacy"][0]{
//       SectionIcon{
//         asset->{url}
//       },
//       SectionTag,
//       SectionTitle,
//       SectionDescription,
//       SectionDate,

//       privacyPolicy[]{
//         title,
//         description,
//         descriptionPoints,
//         icon{
//           asset->{url}
//         }
//       }
//     }
//   `);
// }

// export async function getTermsOfService() {
//   return sanity.fetch(`
//     *[_type == "termsOfService"][0]{
//       SectionIcon{
//         asset->{url}
//       },
//       SectionTag,
//       SectionTitle,
//       SectionDescription,
//       SectionDate,

//       terms[]{
//         title,
//         description,
//         descriptionPoints,
//         icon{
//           asset->{url}
//         }
//       }
//     }
//   `);
// }

// export async function getTeamSection() {
//   return sanity.fetch(`
//     *[_type == "teamSection"][0]{
//       founder{
//         name,
//         role,
//         bio,
//         initials,
//         image{
//           asset->{url}
//         }
//       },

//       members[]{
//         name,
//         role,
//         bio,
//         initials,
//         iconName,
//         image{
//           asset->{url}
//         }
//       }
//     }
//   `);
// }
// export async function getCollaborations() {
//   return sanity.fetch(`
//     *[_type == "collaborations"][0].collaborations[]{
//       title,
//       collaboratedWith,
//       dateFrom,
//       dateTo,
//       duration,
//       description,
//       photos[]{
//         asset->{url}
//       }
//     }
//   `);
// }

// export async function getBlogs() {
//   return sanity.fetch(`
//     *[_type == "blog"] | order(date desc){
//       "id": id.current,
//       title,
//       excerpt,
//       content,
//       author,
//       date,
//       readTime,
//       likes,
//       thumbnail{
//         asset->{url}
//       }
//     }
//   `);
// }

// export async function getTestimonies() {
//   return sanity.fetch(`
//     *[_type == "testimony"] | order(order asc){
//       quote,
//       name,
//       role,
//       organization
//     }
//   `);
// }

// export type PastIntern = {
//   name: string;
//   role: string;
//   university: string;
//   year: number;
// };

// export async function getPastInterns() {
//   return sanity.fetch<PastIntern[]>(
//     `*[_type == "pastIntern"] | order(year desc, university asc) {
//       name,
//       role,
//       university,
//       year
//     }`,
//     {},
//     { next: { revalidate: 30 } }
//   );
// }

import { sanity } from "./sanity";


export async function getHomepage() {
  return sanity.fetch(`
    *[_type == "homepage"][0]{
      heroTitle,
      heroCtaLabel,
      heroTagline,
      heroImage{
        asset->{url}
      },
      heroImageMobile{
        asset->{url}
      },

      aboutTitle,
      aboutSubtitle1,
      aboutBody1,
      aboutSubtitle2,
      aboutBody2,

      leadershipName,
      leadershipTitle,
      leadershipSubtitle,
      leadershipBio1,
      leadershipBio2,
      leadershipPhoto{
        asset->{url}
      }
    }
  `);
}

export async function getServices() {
  return sanity.fetch(`
    {
      "complementaryLectures": *[_type == "complementaryLecture"]{
        _id,
        title,
        description,
        date,
        category,
        duration,
        mode,
        instructor,
        idealFor,
        content,
        includes,
        thumbnail{
          asset->{url}
        }
      },
      "lectures": *[_type == "lecture"]{
        _id,
        title,
        duration,
        description,
        mode,
        date,
        category,
        priceNote,
        originalPrice,
        priceLabel,
        discountPercent,
        instructor,
        idealFor,
        content,
        includes,
        thumbnail{
          asset->{url}
        }
      },

      "workshops": *[_type == "workshop"]{
        _id,
        title,
        duration,
        description,
        mode,
        category,
        priceNote,
        originalPrice,
        discountedPrice,
        discountPercent,
        instructor,
        idealFor,
        content,
        includes,
        thumbnail{
          asset->{url}
        }
      },

      "consultations": *[_type == "consultation"]{
        _id,
        title,
        duration,
        mode,
        audience,
        description,
        priceLabel,
        cta,
        includes,
        thumbnail{
          asset->{url}
        }
      }
    }
  `);
}

export async function getCareersPage() {
  return sanity.fetch(`
    *[_type == "careers"][0]{
      SectionTitle,
      SectionDescription,
      SectionTag,
      SectionIcon{
        asset->{url}
      },

      careersSections[]{
        title,
        tag,
        description,
        points[],
        icon{
          asset->{url}
        },
        jobs[]{
          title,
          department,
          type,
          location,
          description,
          responsibilities,
          requirements,
          compensation
        }
      },

      application{
        email,
        note
      }
    }
  `);
}

export async function getPastAchievements() {
  return sanity.fetch(`
    *[_type == "pastAchievements"][0]{
      sectionTitle,
      sectionSubtitle,

      subsections[]{
        title,
        subtitle,
        description,
        icon{
          asset->{url}
        },
        links[]{
          label,
          url
        }
      },

      talksHeading,
      talks[]{
        year,
        title,
        description,
        image{
          asset->{url}
        },
        links[]{
          label,
          url
        }
      }
    }
  `);
}

export async function getPrivacyPolicy() {
  return sanity.fetch(`
    *[_type == "privacy"][0]{
      SectionIcon{
        asset->{url}
      },
      SectionTag,
      SectionTitle,
      SectionDescription,
      SectionDate,

      privacyPolicy[]{
        title,
        description,
        descriptionPoints,
        icon{
          asset->{url}
        }
      }
    }
  `);
}

export async function getTermsOfService() {
  return sanity.fetch(`
    *[_type == "termsOfService"][0]{
      SectionIcon{
        asset->{url}
      },
      SectionTag,
      SectionTitle,
      SectionDescription,
      SectionDate,

      terms[]{
        title,
        description,
        descriptionPoints,
        icon{
          asset->{url}
        }
      }
    }
  `);
}

export async function getTeamSection() {
  return sanity.fetch(`
    *[_type == "teamSection"][0]{
      founder{
        name,
        role,
        bio,
        initials,
        image{
          asset->{url}
        }
      },

      members[]{
        name,
        role,
        bio,
        initials,
        iconName,
        image{
          asset->{url}
        }
      }
    }
  `);
}

export async function getCollaborations() {
  return sanity.fetch(`
    *[_type == "collaborations"][0].collaborations[]{
      title,
      collaboratedWith,
      dateFrom,
      dateTo,
      duration,
      description,
      photos[]{
        asset->{url}
      }
    }
  `);
}

export async function getBlogs() {
  return sanity.fetch(`
    *[_type == "blog" && status == "published"] | order(date desc){
      "id": id.current,
      title,
      excerpt,
      content,
      author,
      date,
      readTime,
      likes,
      thumbnail{
        asset->{url}
      }
    }
  `);
}

export async function getTestimonies() {
  return sanity.fetch(`
    *[_type == "testimony"] | order(order asc){
      quote,
      name,
      role,
      organization
    }
  `);
}

export type PastIntern = {
  name: string;
  role: string;
  university: string;
  year: number;
};

export async function getPastInterns() {
  return sanity.fetch<PastIntern[]>(
    `*[_type == "pastIntern"] | order(year desc, university asc) {
      name,
      role,
      university,
      year
    }`,
    {},
    { next: { revalidate: 30 } }
  );
}