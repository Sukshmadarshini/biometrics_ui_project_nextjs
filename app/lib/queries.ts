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

      // ── Services (hero feature cards) ──────────────────────────────────────
      services[]{
        _key,
        title,
        description,
        icon{ asset->{ url }, ...}
      },

      // ── Workshops section ───────────────────────────────────────────────────
      workshopsSection{
        badge,
        heading,
        subheading,
        ctaLabel,
        ctaHref
      },
 
      // ── Contact section ─────────────────────────────────────────────────────
      contactSection{
        badge,
        heading,
        subheading,
        email,
        phone,
        location
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

export async function getCollaborations() {
  return sanity.fetch(
    `*[_type == "collaborations"][0]{
      collaborationsPage{
        badge,
        heading,
        subheading
      },
      collaborations[]{
        _key,
        title,
        collaboratedWith,
        dateFrom,
        dateTo,
        duration,
        description,
        photos[]{ asset->{ url }, ... }
      }
    }`,
    {},
    { next: { revalidate: 30 } }
  );
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

export async function getBlogsAndTestimonies() {
  return sanity.fetch(
    `*[_type == "blogsAndTestimonies"][0]{
      badge,
      heading,
      subheading
    }`,
    {},
    { next: { revalidate: 30 } }
  );
}

// export async function getBlogsAndTestimonies() {
//   return sanity.fetch(
//     `*[_type == "blogsAndTestimonies"][0]{
//       badge,
//       heading,
//       subheading,

//       blogs[status == "published"] | order(date desc) {
//         "id": id.current,
//         title,
//         excerpt,
//         content,
//         author,
//         date,
//         readTime,
//         likes,
//         comments,
//         submitterEmail,
//         thumbnail{
//           asset->{url},
//           alt
//         }
//       },

//       testimonies[] | order(order asc) {
//         quote,
//         name,
//         role,
//         organization
//       }
//     }`,
//     {},
//     { next: { revalidate: 30 } }
//   );
// }

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

export async function getEmailTemplate(templateKey: string) {
  return sanity.fetch(
    `
      *[
        _type == "emailTemplate" &&
        templateKey == $templateKey
      ][0]
    `,
    { templateKey }
  );
}